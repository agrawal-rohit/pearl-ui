import React, { useEffect, useRef, useState } from "react";
import { Video as ExpoVideo, VideoProps as ExpoVideoProps } from "expo-av";
import { pearl } from "../../../pearl";
import {
  Animated,
  ColorValue,
  ImageSourcePropType,
  Platform,
  Image as RNImage,
  ImageProps as RNImageProps,
} from "react-native";
import { View, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";
import Box, { BoxProps } from "../../atoms/box/box";
import { MoleculeComponentProps } from "../../../theme/src/types";
import Spinner from "../../atoms/spinner/spinner";
import Center from "../../atoms/center/center";

const PearlRNImage = pearl<RNImageProps, "basic">(RNImage, {
  componentName: "",
  type: "basic",
  animatable: true,
});

const PearlExpoVideo = pearl<ExpoVideoProps>(ExpoVideo, {
  componentName: "Video",
  type: "basic",
  animatable: true,
});

const AnimatedView = Animated.createAnimatedComponent(View);
const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

const PearlAnimatedBlurView = pearl<
  React.ComponentProps<typeof AnimatedBlurView>,
  "basic"
>(AnimatedBlurView, {
  componentName: "",
  type: "basic",
  animatable: true,
});

const PearlAnimatedView = pearl<
  React.ComponentProps<typeof AnimatedView>,
  "basic"
>(AnimatedView, {
  componentName: "",
  type: "basic",
  animatable: true,
});

export type BaseVideoProps = BoxProps &
  ExpoVideoProps & {
    /** Source of the image to show while the remote image is being fetched */
    previewSource?: ImageSourcePropType;
    /** Color of the image container while the remote image is being fetched */
    previewColor?: ColorValue;
    /**
     * Duration (in ms) it takes for progressive loading overlay to fade away after the image has loaded.
     *
     * @default 300
     */
    overlayTransitionDuration?: number;
    /**
     * Tint of the progressive loading overlay.
     *
     * @default "dark"
     */
    tint?: "dark" | "light" | "default";
    /**
     * The type of loading to use until the image has loaded.
     *
     * @default "spinner"
     */
    loaderType?: "progressive" | "spinner";
    /** A custom component to show if an error occurs while loading the image */
    fallbackComponent?: React.ReactElement;
    /** Source of the image to show if an error occurs while loading the image */
    fallbackSource?: ImageSourcePropType;
  };

const BaseVideo = React.forwardRef(
  ({ atoms }: MoleculeComponentProps<"Video", BaseVideoProps>, ref: any) => {
    const {
      source,
      onError,
      testID,
      previewSource,
      fallbackSource,
      fallbackComponent,
      previewColor,
      tint = "dark",
      loaderType = "spinner",
      overlayTransitionDuration = 300,
      onLoad,
      onLoadStart,
      ...restVideoProps
    } = atoms.video;

    const isRemoteVideo = typeof source === "object";
    const [error, setError] = useState(false);
    const [hasVideoLoaded, setHasVideoLoaded] = useState(false);
    const intensity = useRef(new Animated.Value(100)).current;

    const previewSourceOverlayOpacity = intensity.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
    });
    const blurIntensity = intensity.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 50],
    });
    const previewColorOverlayOpacity = intensity.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
    });

    // Separate out border radius properties
    const {
      borderRadius,
      borderBottomLeftRadius,
      borderBottomRightRadius,
      borderTopLeftRadius,
      borderTopRightRadius,
      ...finalContainerProps
    } = atoms.container;
    const borderRadiiStyles = {
      borderRadius,
      borderBottomLeftRadius,
      borderBottomRightRadius,
      borderTopLeftRadius,
      borderTopRightRadius,
    };

    // A handler function for catching errors while loading the video
    const onErrorHandler = (error: string) => {
      setError(true);
      if (onError) onError(error);
    };

    const renderFallback = () => {
      if (error) {
        if (!!fallbackComponent) {
          return (
            <Box overflow="hidden" {...borderRadiiStyles} style={{ zIndex: 4 }}>
              {React.cloneElement(fallbackComponent)}
            </Box>
          );
        }

        if (!!fallbackSource) {
          return (
            <PearlRNImage
              {...atoms.fallbackImage}
              {...borderRadiiStyles}
              zIndex={3}
              width="100%"
              height="100%"
              source={fallbackSource}
              style={StyleSheet.absoluteFill}
            />
          );
        }
      }

      return null;
    };

    const renderVideo = () => {
      return (
        <PearlExpoVideo
          {...restVideoProps}
          {...borderRadiiStyles}
          ref={ref}
          visible={hasVideoLoaded}
          onLoad={(status) => {
            if (onLoad) onLoad(status);

            if (isRemoteVideo && status.isLoaded) {
              // Start animating the overlay opacity as soon as the URI becomes available
              Animated.timing(intensity, {
                toValue: 0,
                duration: overlayTransitionDuration,
                useNativeDriver: Platform.OS === "android",
              }).start();
            }
            setHasVideoLoaded(true);
          }}
          onLoadStart={() => {
            if (Platform.OS === "ios") {
              setTimeout(() => {
                if (!hasVideoLoaded) {
                  setError(true);
                }
              }, 1000);
            }
            if (onLoadStart) onLoadStart();
          }}
          onError={onErrorHandler}
          testID={testID}
          source={source}
          zIndex={3}
          width="100%"
          height="100%"
          style={StyleSheet.absoluteFill}
        />
      );
    };

    const renderPreview = () => {
      if ((intensity as any)._value === 0) return null;

      if (!!previewSource) {
        return (
          <PearlRNImage
            {...atoms.previewImage}
            {...borderRadiiStyles}
            source={previewSource}
            zIndex={1}
            width="100%"
            height="100%"
            style={StyleSheet.absoluteFill}
            blurRadius={
              Platform.OS === "android" || Platform.OS === "web" ? 0.5 : 0
            }
          />
        );
      }
    };

    const renderImageLoader = () => {
      if ((intensity as any)._value === 0) return null;

      if (loaderType === "progressive") {
        if (!!previewSource) {
          // Render a blur overlay over the preview image
          if (Platform.OS === "ios") {
            return (
              <PearlAnimatedBlurView
                tint={tint}
                {...borderRadiiStyles}
                zIndex={3}
                overflow="hidden"
                alignItems="center"
                justifyContent="center"
                intensity={blurIntensity}
                style={StyleSheet.absoluteFill}
              >
                {renderFallback()}
              </PearlAnimatedBlurView>
            );
          }

          // Render a static overlay over the preview image
          if (Platform.OS === "android" || Platform.OS === "web") {
            return (
              <PearlAnimatedView
                {...borderRadiiStyles}
                w="100%"
                h="100%"
                zIndex={3}
                overflow="hidden"
                alignItems="center"
                justifyContent="center"
                bgColor={tint === "dark" ? "black" : "white"}
                style={{
                  opacity: previewSourceOverlayOpacity,
                }}
              >
                {renderFallback()}
              </PearlAnimatedView>
            );
          }
        }

        if (!!previewColor) {
          return (
            <PearlAnimatedView
              {...borderRadiiStyles}
              w="100%"
              h="100%"
              zIndex={3}
              overflow="hidden"
              alignItems="center"
              justifyContent="center"
              bgColor={previewColor}
              style={{
                opacity: previewColorOverlayOpacity,
              }}
            >
              {renderFallback()}
            </PearlAnimatedView>
          );
        }
      }

      if (loaderType === "spinner" && !error) {
        return (
          <Box width="100%" height="100%" style={StyleSheet.absoluteFill}>
            <Spinner {...atoms.spinner} isExpanded />
          </Box>
        );
      }
    };

    useEffect(() => {
      setHasVideoLoaded(false);
      intensity.setValue(100);
    }, [JSON.stringify(source)]);

    return (
      <Center
        {...finalContainerProps}
        {...borderRadiiStyles}
        accessible={true}
        accessibilityRole="image"
      >
        {renderVideo()}
        {renderPreview()}
        {renderImageLoader()}
      </Center>
    );
  }
);

/**
 * Video is the most abstract component on top of which all other Pearl UI components are built.
 */
const Video = pearl<BaseVideoProps, "molecule">(
  BaseVideo,
  {
    componentName: "Video",
    type: "molecule",
    animatable: true,
  },
  undefined,
  {
    partForOverridenStyleProps: "container",
    partForOverridenNativeProps: "video",
    partForOverridenAnimationProps: "container",
  }
);

export type VideoProps = React.ComponentProps<typeof Video>;

Video.displayName = "Video";

export default Video;
