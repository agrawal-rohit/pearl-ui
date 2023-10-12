import * as _ from "lodash";
import * as FileSystem from "expo-file-system";
import SHA1 from "crypto-js/sha1";

export interface DownloadOptions {
  md5?: boolean;
  headers?: { [name: string]: string };
}

const BASE_DIR = `${FileSystem.cacheDirectory}`;

export class CacheEntry {
  uri: string;

  options: DownloadOptions;

  constructor(uri: string, options: DownloadOptions) {
    this.uri = uri;
    this.options = options;
  }

  /**
   * Get the path of the cached image, if it exists.
   * If the image is not cached, download it and cache it.
   * @returns {Promise<string | undefined>} The path of the cached image, or undefined if the download failed.
   */
  async getPath(): Promise<string | undefined> {
    // Get the URI and options of the cache entry
    const { uri, options } = this;
    // Get the paths of the cached image and its temporary download location
    const { path, exists, tmpPath } = await getCacheEntry(uri);
    // If the image is already cached, return its path
    if (exists) {
      return path;
    }
    // Download the image and cache it
    const result = await FileSystem.createDownloadResumable(
      uri,
      tmpPath,
      options
    ).downloadAsync();
    // If the image download failed, we don't cache anything
    if (result && result.status !== 200) {
      return undefined;
    }
    await FileSystem.moveAsync({ from: tmpPath, to: path });
    return path;
  }
}

/**
 * CacheManager is a class that manages the caching of images.
 */
export default class CacheManager {
  static entries: { [uri: string]: CacheEntry } = {};

  /**
   * Returns a CacheEntry object for the given uri and options.
   * If the entry does not exist, it is created.
   * @param {string} uri - The uri of the image to cache.
   * @param {DownloadOptions} options - The options for downloading the image.
   * @returns {CacheEntry} The CacheEntry object for the given uri and options.
   */
  static get(uri: string, options: DownloadOptions): CacheEntry {
    if (!CacheManager.entries[uri]) {
      CacheManager.entries[uri] = new CacheEntry(uri, options);
    }
    return CacheManager.entries[uri];
  }

  /**
   * Clears the cache directory.
   * @returns {Promise<void>} A promise that resolves when the cache is cleared.
   */
  static async clearCache(): Promise<void> {
    await FileSystem.deleteAsync(BASE_DIR, { idempotent: true });
    await FileSystem.makeDirectoryAsync(BASE_DIR);
  }

  /**
   * Gets the size of the cache directory.
   * @returns {Promise<number>} A promise that resolves with the size of the cache directory.
   * @throws {Error} If the cache directory is not found.
   */
  static async getCacheSize(): Promise<number> {
    const result = await FileSystem.getInfoAsync(BASE_DIR);
    if (!result.exists) {
      throw new Error(`${BASE_DIR} not found`);
    }
    return result.size;
  }
}

/**
 * Returns an object containing information about the cache entry for the given uri.
 * @param {string} uri - The uri of the image to cache.
 * @returns {Promise<{ exists: boolean; path: string; tmpPath: string }>} An object containing information about the cache entry.
 */
const getCacheEntry = async (
  uri: string
): Promise<{ exists: boolean; path: string; tmpPath: string }> => {
  // Extract filename and extension from uri
  const filename = uri.substring(
    uri.lastIndexOf("/"),
    uri.indexOf("?") === -1 ? uri.length : uri.indexOf("?")
  );
  const ext =
    filename.indexOf(".") === -1
      ? ".jpg"
      : filename.substring(filename.lastIndexOf("."));
  // Set path and tmpPath
  const path = `${BASE_DIR}${SHA1(uri)}${ext}`;
  const tmpPath = `${BASE_DIR}${SHA1(uri)}-${_.uniqueId()}${ext}`;

  try {
    await FileSystem.makeDirectoryAsync(BASE_DIR);
  } catch (e) {
    // If directory already exists, do nothing
  }
  // Check if file exists
  const info = await FileSystem.getInfoAsync(path);
  const { exists } = info;
  return { exists, path, tmpPath };
};
