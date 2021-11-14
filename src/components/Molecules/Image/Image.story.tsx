import React from "react";
import { storiesOf } from "@storybook/react-native";
import Image from "./Image";
import Icon from "../../Atoms/Icon/Icon";
import Text from "../../Atoms/Text/Text";
import { Image as RNImage } from "react-native";
import Screen from "../../Atoms/Screen/Screen";
import Stack from "../../Atoms/Stack/Stack";
import Box from "../../Atoms/Box/Box";

storiesOf("Image", module)
  .addDecorator((getStory) => <Screen>{getStory()}</Screen>)
  .add("Local Image", () => (
    <Image
      width="100%"
      aspectRatio={16 / 9}
      boxShadow="4xl"
      source={require("./testLocalImage.jpeg")}
      previewSource={{
        uri: "https://www.logolynx.com/images/logolynx/43/430c07f27af3fda19373042528edbe3d.jpeg",
      }}
    />
  ))
  .add("Remote Image", () => (
    <>
      <Text variant="t2" mb="xs">
        Progressive Loader
      </Text>
      <Stack direction="vertical" spacing="m">
        <Box>
          <Text variant="st2">Cached</Text>
          <Image
            mt="m"
            width={100}
            height={100}
            loaderType="progressive"
            isCached={true}
            source={{
              uri: "https://wallpaperaccess.com/full/1713248.jpg",
            }}
            previewSource={{
              uri: "https://www.logolynx.com/images/logolynx/43/430c07f27af3fda19373042528edbe3d.jpeg",
            }}
          />
        </Box>

        <Box>
          <Text variant="st2">Non-cached</Text>
          <Image
            mt="m"
            width={100}
            height={100}
            loaderType="progressive"
            isCached={false}
            source={{
              uri: "https://wallpaperaccess.com/full/1713248.jpg",
            }}
            previewSource={{
              uri: "https://www.logolynx.com/images/logolynx/43/430c07f27af3fda19373042528edbe3d.jpeg",
            }}
          />
        </Box>
      </Stack>

      <Text variant="t2" mb="xs" mt="l">
        Spinner Loader
      </Text>
      <Stack direction="vertical" spacing="m">
        <Box>
          <Text variant="st2">Cached</Text>
          <Image
            mt="m"
            width={100}
            height={100}
            loaderType="spinner"
            isCached={true}
            source={{
              uri: "https://wallpaperaccess.com/full/1713248.jpg",
            }}
          />
        </Box>

        <Box>
          <Text variant="st2">Non-cached</Text>
          <Image
            mt="m"
            width={100}
            height={100}
            loaderType="spinner"
            isCached={false}
            source={{
              uri: "https://wallpaperaccess.com/full/1713248.jpg",
            }}
          />
        </Box>
      </Stack>
    </>
  ))
  .add("Loading indicators", () => (
    <>
      <Stack direction="vertical" spacing="m">
        <Box>
          <Text variant="st2">Progressive Loading + Preview Color</Text>
          <Image
            mt="m"
            width={100}
            height={100}
            isCached={false}
            loaderType="progressive"
            previewColor="#934a9a"
            source={{
              uri: "https://www.pixel4k.com/wp-content/uploads/2020/08/the-valley-minimal-4k_1596932776.jpg",
            }}
          />
        </Box>

        <Box>
          <Text variant="st2">Progressive Loading + Preview Image</Text>
          <Image
            mt="m"
            width={100}
            height={100}
            isCached={false}
            loaderType="progressive"
            source={{
              uri: "https://www.pixel4k.com/wp-content/uploads/2020/08/the-valley-minimal-4k_1596932776.jpg",
            }}
            previewSource={require("./testPreviewImage.jpeg")}
          />
        </Box>

        <Box>
          <Text variant="st2">Spinner Loading</Text>
          <Image
            mt="m"
            width={100}
            height={100}
            isCached={false}
            loaderType="spinner"
            source={{
              uri: "https://wallpaperaccess.com/full/1713248.jpg",
            }}
          />
        </Box>
      </Stack>
    </>
  ))
  .add("Image Fallback", () => (
    <>
      <Text variant="t2" mb="xs">
        Image Fallback
      </Text>
      <Stack direction="vertical" spacing="m">
        <Box>
          <Text variant="st2">Progressive Loader + Error</Text>
          <Image
            mt="m"
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
        </Box>

        <Box>
          <Text variant="st2">Spinner Loader + Error</Text>
          <Image
            mt="m"
            width={100}
            height={100}
            fallbackSource={{
              uri: "https://cdn.segmentnext.com/wp-content/themes/segmentnext/images/no-image-available.jpg",
            }}
            source={{
              uri: "https://4kwallpapers.com/imas/wallpapers/macos-big-sur-apple-layers-fluidic-colorful-wwdc-stock-2560x1440-1455.jpg",
            }}
          />
        </Box>
      </Stack>

      <Text variant="t2" mb="xs" mt="m">
        Custom fallback component
      </Text>
      <Stack direction="vertical" spacing="m">
        <Box>
          <Text variant="st2">Progressive Loader + Error</Text>
          <Image
            mt="m"
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
        </Box>

        <Box>
          <Text variant="st2">Spinner Loader + Error</Text>
          <Image
            mt="m"
            width={100}
            height={100}
            fallbackComponent={
              <Icon
                iconFamily="MaterialIcons"
                iconName="error-outline"
                size="l"
                color="neutral.400"
              />
            }
            source={{
              uri: "https://4kwallpapers.com/imas/wallpapers/macos-big-sur-apple-layers-fluidic-colorful-wwdc-stock-2560x1440-1455.jpg",
            }}
          />
        </Box>
      </Stack>
    </>
  ));
