import { useState } from "react";
import { VStack, Image, Icon, Button, Text, Center } from "../../src";
import DemoSection from "./demo-section";

const ImageDemo = () => {
  const [key, setKey] = useState(() => Math.random());

  return (
    <VStack spacing="6">
      <Button
        size="s"
        alignSelf="flex-end"
        leftIcon={<Icon iconFamily="Ionicons" iconName="reload" />}
        onPress={() => setKey(Math.random())}
      >
        Reload
      </Button>

      <DemoSection label="Progressive Loading">
        <Image
          key={key}
          width="100%"
          height={100}
          sourceDelay={1000}
          loaderType="progressive"
          isCached={false}
          source={{
            uri: "https://wallpaperaccess.com/full/1713248.jpg",
          }}
          previewSource={require("../assets/low-res-image-preview.jpeg")}
        />
      </DemoSection>

      <DemoSection label="Spinner Loading">
        <Image
          key={key}
          width="100%"
          height={100}
          sourceDelay={1000}
          loaderType="spinner"
          isCached={false}
          source={{
            uri: "https://www.pixel4k.com/wp-content/uploads/2020/08/the-valley-minimal-4k_1596932776.jpg",
          }}
        />
      </DemoSection>

      <DemoSection label="Preview Color Loading">
        <Image
          key={key}
          width="100%"
          height={100}
          sourceDelay={1000}
          loaderType="progressive"
          previewColor="#0aa8f1"
          isCached={false}
          source={{
            uri: "https://c4.wallpaperflare.com/wallpaper/362/276/920/nature-4k-pc-full-hd-wallpaper-preview.jpg",
          }}
        />
      </DemoSection>

      <DemoSection label="Error fallback">
        <VStack spacing="3.5">
          <Text variant="p4" textDecorationLine="underline">
            Fallback image
          </Text>
          <Image
            key={key}
            width="100%"
            height={100}
            sourceDelay={1000}
            loaderType="spinner"
            source={{
              uri: "https://4kwallpapers.com/imas/wallpapers/macos-big-sur-apple-layers-fluidic-colorful-wwdc-stock-2560x1440-1455.jpg",
            }}
            fallbackSource={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/7/75/No_image_available.png",
            }}
          />
        </VStack>

        <VStack spacing="3.5">
          <Text variant="p4" textDecorationLine="underline">
            Fallback component
          </Text>
          <Image
            key={key}
            width="100%"
            height={100}
            sourceDelay={1000}
            loaderType="spinner"
            bgColor={{ light: "neutral.100", dark: "neutral.800" }}
            fallbackComponent={
              <Center w="100%" h="100%">
                <VStack alignItems="center">
                  <Icon
                    size="m"
                    iconFamily="MaterialIcons"
                    iconName="error-outline"
                    color="neutral.400"
                  />
                  <Text fontSize={10} fontWeight="400" color="neutral.500">
                    The image could not be loaded
                  </Text>
                </VStack>
              </Center>
            }
            source={{
              uri: "https://4kwallpapers.com/imas/wallpapers/macos-big-sur-apple-layers-fluidic-colorful-wwdc-stock-2560x1440-1455.jpg",
            }}
          />
        </VStack>
      </DemoSection>
    </VStack>
  );
};

export default ImageDemo;
