import React from "react";
import Image from "./image";
import { render, act } from "@testing-library/react-native";
import { create } from "react-test-renderer";
import { ThemeProvider } from "../../../theme/src/theme-context";
import CacheManager from "./cache-manager";
import Icon from "../../atoms/icon/icon";

jest.useFakeTimers();

describe("Molecules/Image", () => {
  it("passes the snapshot test for basic setup", async () => {
    const tree = await render(
      <ThemeProvider>
        <Image
          width={200}
          height={200}
          source={require("./test-local-image.jpeg")}
        />

        <Image
          width={200}
          height={200}
          source={{
            uri: "https://wallpaperaccess.com/full/1713248.jpg",
          }}
          previewSource={{
            uri: "https://www.logolynx.com/images/logolynx/43/430c07f27af3fda19373042528edbe3d.jpeg",
          }}
        />
      </ThemeProvider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("loads uses the local url for local images", async () => {
    let comp;
    act(() => {
      comp = create(
        <ThemeProvider>
          <Image
            width={200}
            height={200}
            isCached={true}
            source={require("./test-local-image.jpeg")}
          />
        </ThemeProvider>
      );
    });

    const tree = (comp as any).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("passes the snapshot test for the various progressive loading indicators", async () => {
    const tree = await render(
      <ThemeProvider>
        <Image
          width={100}
          height={100}
          isCached={false}
          loaderType="progressive"
          previewColor="#934a9a"
          source={{
            uri: "https://www.pixel4k.com/wp-content/uploads/2020/08/the-valley-minimal-4k_1596932776.jpg",
          }}
        />

        <Image
          width={100}
          height={100}
          isCached={false}
          loaderType="progressive"
          source={{
            uri: "https://www.pixel4k.com/wp-content/uploads/2020/08/the-valley-minimal-4k_1596932776.jpg",
          }}
          previewSource={require("./test-preview-image.jpeg")}
        />

        <Image
          width={100}
          height={100}
          isCached={false}
          loaderType="spinner"
          source={{
            uri: "https://wallpaperaccess.com/full/1713248.jpg",
          }}
        />
      </ThemeProvider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("passes the snapshot test for the fallback methods if there is an error while fetching the image", async () => {
    const tree = await render(
      <ThemeProvider>
        <Image
          width={100}
          height={100}
          loaderType="progressive"
          fallbackSource={{
            uri: "https://cdn.segmentnext.com/wp-content/themes/segmentnext/images/no-image-available.jpg",
          }}
          source={{
            uri: "https://4kwallpapers.com/imas/wallpapers/macos-big-sur-apple-layers-fluidic-colorful-wwdc-stock-2560x1440-1455.jpg",
          }}
          previewSource={{
            uri: "https://www.wpbeginner.com/wp-content/uploads/2020/03/ultimate-small-business-resource-coronavirus.png",
          }}
        />

        <Image
          width={100}
          height={100}
          loaderType="progressive"
          fallbackComponent={
            <Icon
              iconFamily="MaterialIcons"
              iconName="error-outline"
              size="l"
              color="neutral.50"
            />
          }
          source={{
            uri: "https://4kwallpapers.com/imas/wallpapers/macos-big-sur-apple-layers-fluidic-colorful-wwdc-stock-2560x1440-1455.jpg",
          }}
          previewSource={{
            uri: "https://www.wpbeginner.com/wp-content/uploads/2020/03/ultimate-small-business-resource-coronavirus.png",
          }}
        />
      </ThemeProvider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("loads uses the target url for remote images without caching", async () => {
    let comp;
    act(() => {
      comp = create(
        <ThemeProvider>
          <Image
            width={200}
            height={200}
            isCached={false}
            source={{
              uri: "https://wallpaperaccess.com/full/1713248.jpg",
            }}
          />
        </ThemeProvider>
      );
    });

    const tree = (comp as any).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("triggers onError to be triggered and final image to be hidden in when an error occurs while fetching a remote image", () => {
    const onError = jest.fn();

    const main = render(
      <ThemeProvider>
        <Image
          width={200}
          height={200}
          isCached={true}
          testID="mainImage"
          onError={onError}
          source={{
            uri: "https://4kwallpapers.com/imas/wallpapers/macos-big-sur-apple-layers-fluidic-colorful-wwdc-stock-2560x1440-1455.jpg",
          }}
        />
      </ThemeProvider>
    );

    const tree = main.toJSON();
    expect(tree).toMatchSnapshot();
    expect(() => main.getByTestId("mainImage")).toThrowError();

    // TODO Mock Filesystem download to invoke the error correctly
    // expect(onError).toHaveBeenCalledTimes(1);
  });

  it("makes sure that the CacheManager works as expected", async () => {
    await act(async () => {
      await CacheManager.clearCache();
      const finalPath = await CacheManager.get(
        "https://wallpaperaccess.com/full/1713248.jpg",
        {}
      ).getPath();

      expect(finalPath?.includes(".jpg")).toBeTruthy();
    });
  });

  it("loads uses the filesystem url for remote images with caching", () => {
    // TODO: Add cache tests
    const tree = render(
      <ThemeProvider>
        <Image
          width={200}
          height={200}
          isCached={true}
          testID="mainImage"
          source={{
            uri: "https://wallpaperaccess.com/full/1713248.jpg",
          }}
          previewSource={{
            uri: "https://www.logolynx.com/images/logolynx/43/430c07f27af3fda19373042528edbe3d.jpeg",
          }}
        />
      </ThemeProvider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
