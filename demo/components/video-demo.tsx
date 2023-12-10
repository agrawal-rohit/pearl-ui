import { useState } from "react";
import { VStack, Image, Icon, Button, Text, Center, Video } from "../../src";
import DemoSection from "./demo-section";
import { ResizeMode } from "expo-av";

const VideoDemo = () => {
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
        <Video
          w="100%"
          key={key}
          sourceDelay={1000}
          aspectRatio={16 / 9}
          loaderType="progressive"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          source={{
            uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
          }}
          previewSource={require("../assets/low-res-video-preview.jpeg")}
        />
      </DemoSection>

      <DemoSection label="Spinner Loading">
        <Video
          w="100%"
          key={key}
          sourceDelay={1000}
          aspectRatio={16 / 9}
          loaderType="spinner"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          source={{
            uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
          }}
        />
      </DemoSection>

      <DemoSection label="Preview Color Loading">
        <Video
          w="100%"
          key={key}
          sourceDelay={1000}
          aspectRatio={16 / 9}
          loaderType="progressive"
          resizeMode={ResizeMode.CONTAIN}
          previewColor="#9ebf3a"
          useNativeControls
          source={{
            uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
          }}
        />
      </DemoSection>

      <DemoSection label="Error fallback">
        <VStack spacing="3.5">
          <Text variant="p4" textDecorationLine="underline">
            Fallback image
          </Text>
          <Video
            w="100%"
            key={key}
            useNativeControls
            sourceDelay={1000}
            aspectRatio={16 / 9}
            loaderType="spinner"
            resizeMode={ResizeMode.CONTAIN}
            source={{
              uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_y.mp4",
            }}
            fallbackSource={{
              uri: "https://techcult.com/wp-content/uploads/2021/05/Fix-No-Video-with-Supported-Format-and-MIME-type-found.jpg",
            }}
          />
        </VStack>

        <VStack spacing="3.5">
          <Text variant="p4" textDecorationLine="underline">
            Fallback component
          </Text>
          <Video
            w="100%"
            key={key}
            useNativeControls
            sourceDelay={1000}
            aspectRatio={16 / 9}
            loaderType="spinner"
            resizeMode={ResizeMode.CONTAIN}
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
              uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_y.mp4",
            }}
          />
        </VStack>
      </DemoSection>
    </VStack>
  );
};

export default VideoDemo;
