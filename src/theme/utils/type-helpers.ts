import { FinalPearlTheme } from "../src/types";

/**
 * Returns an array of keys of an object.
 * @param object - The object to get keys from.
 * @returns An array of keys of the object.
 */
export const getKeys = <T extends object>(object: T) =>
  Object.keys(object) as (keyof T)[];

/**
 * Returns a nested object given an object and an array of keys.
 * @param nestedObj - The object to get the nested object from.
 * @param pathArr - The array of keys to get the nested object.
 * @returns The nested object.
 */
export const getNestedObject = (nestedObj: object, pathArr: string[]) => {
  return pathArr.reduce(
    (obj: any, key) => (obj && obj[key] !== "undefined" ? obj[key] : undefined),
    nestedObj
  );
};

/**
 * Checks if a key is a valid key of a theme.
 * @param theme - The theme to check the key against.
 * @param K - The key to check.
 * @returns True if the key is a valid key of the theme, false otherwise.
 */
export function isThemeKey(
  theme: FinalPearlTheme,
  K: keyof FinalPearlTheme | undefined
): K is keyof FinalPearlTheme {
  return getKeys(theme).includes(K as keyof FinalPearlTheme);
}
