import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
import { VideoAtoms } from "./video.config";

const PearlRNImage = pearl<RNImageProps, "basic">(RNImage, {
  componentName: "",
  type: "basic",
  animatable: true,
});

export type PearlRNImageProps = React.ComponentProps<typeof PearlRNImage>;

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
    /** Source of the image to show while the remote video is being fetched */
    previewSource?: ImageSourcePropType;
    /** Color of the image container while the remote video is being fetched */
    previewColor?: ColorValue;
    /**
     * Duration (in ms) it takes for progressive loading overlay to fade away after the video has loaded.
     *
     * @default 300
     */
    overlayTransitionDuration?: number;
    /**
     * Delay (in ms) before the source video starts loading. This can be useful when you want to display a placeholder for a certain amount of time before starting to load the video.
     *
     * @default 0
     */
    sourceDelay?: number;
    /**
     * Tint of the progressive loading overlay.
     *
     * @default "dark"
     */

    tint?: "dark" | "light" | "default" | "none";
    /**
     * The type of loading to use until the video has loaded.
     *
     * @default "spinner"
     */
    loaderType?: "progressive" | "spinner";
    /** A custom component to show if an error occurs while loading the video */
    fallbackComponent?: React.ReactElement;
    /** Source of the image to show if an error occurs while loading the video */
    fallbackSource?: ImageSourcePropType;
  };

const BaseVideo = React.memo(
  React.forwardRef(
    (
      { atoms }: MoleculeComponentProps<"Video", BaseVideoProps, VideoAtoms>,
      ref: any
    ) => {
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
        sourceDelay = 0,
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
      const finalImageOpacity = intensity.interpolate({
        inputRange: [0, 100],
        outputRange: [1, 0.75],
      });
      const backwardCompatibleTintOverlayOpacity = intensity.interpolate({
        inputRange: [0, 100],
        outputRange: [0, 0.5],
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
      const borderRadiiStyles = useMemo(
        () => ({
          borderRadius,
          borderBottomLeftRadius,
          borderBottomRightRadius,
          borderTopLeftRadius,
          borderTopRightRadius,
        }),
        [
          borderRadius,
          borderBottomLeftRadius,
          borderBottomRightRadius,
          borderTopLeftRadius,
          borderTopRightRadius,
        ]
      );

      // A handler function for catching errors while loading the video
      const onErrorHandler = (error: string) => {
        setError(true);
        if (onError) onError(error);
      };

      const renderFallback = useCallback(() => {
        if (error) {
          if (!!fallbackComponent) {
            return (
              <Box
                overflow="hidden"
                {...borderRadiiStyles}
                style={{ zIndex: 4 }}
              >
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
      }, [
        error,
        fallbackComponent,
        fallbackSource,
        borderRadiiStyles,
        atoms.fallbackImage,
      ]);

      const renderVideo = useCallback(() => {
        return (
          <AnimatedView
            style={[
              StyleSheet.absoluteFill,
              {
                zIndex: 3,
                width: "100%",
                height: "100%",
                opacity: finalImageOpacity,
              },
            ]}
          >
            <View
              style={{
                width: "100%",
                height: "100%",
                display: !hasVideoLoaded ? "none" : undefined,
              }}
            >
              <PearlExpoVideo
                {...restVideoProps}
                {...borderRadiiStyles}
                ref={ref}
                onLoad={async (status) => {
                  await new Promise((resolve) =>
                    setTimeout(resolve, sourceDelay)
                  );

                  if (onLoad) onLoad(status);

                  if (Platform.OS === "web" || status.isLoaded)
                    Animated.timing(intensity, {
                      toValue: 0,
                      duration: overlayTransitionDuration,
                      useNativeDriver: Platform.OS === "android",
                    }).start();

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
                videoStyle={{
                  width: "100%",
                  height: "100%",
                }}
                width="100%"
                height="100%"
              />
            </View>
          </AnimatedView>
        );
      }, [
        restVideoProps,
        borderRadiiStyles,
        ref,
        hasVideoLoaded,
        onLoad,
        isRemoteVideo,
        intensity,
        overlayTransitionDuration,
        onLoadStart,
        onErrorHandler,
        testID,
        source,
      ]);

      const renderPreview = useCallback(() => {
        if ((intensity as any)._value === 0) return null;

        if (!!previewSource) {
          return (
            <AnimatedView
              style={{
                width: "100%",
                height: "100%",
                opacity: previewSourceOverlayOpacity,
              }}
            >
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
            </AnimatedView>
          );
        }
      }, [intensity, previewSource, borderRadiiStyles, atoms.previewImage]);

      const renderImageLoader = useCallback(() => {
        if (hasVideoLoaded) return null;

        if (loaderType === "progressive") {
          if (!!previewSource) {
            if (Platform.OS === "ios" && tint !== "none") {
              return (
                <PearlAnimatedBlurView
                  tint={tint}
                  {...borderRadiiStyles}
                  zIndex={3}
                  overflow="hidden"
                  alignItems="center"
                  justifyContent="center"
                  intensity={blurIntensity}
                  style={[StyleSheet.absoluteFill]}
                >
                  {renderFallback()}
                </PearlAnimatedBlurView>
              );
            } else {
              return (
                <AnimatedView
                  style={[
                    StyleSheet.absoluteFill,
                    {
                      zIndex: 3,
                      width: "100%",
                      height: "100%",
                      opacity: backwardCompatibleTintOverlayOpacity,
                    },
                  ]}
                >
                  <Box
                    {...borderRadiiStyles}
                    w="100%"
                    h="100%"
                    overflow="hidden"
                    alignItems="center"
                    justifyContent="center"
                    bgColor={
                      tint === "none"
                        ? undefined
                        : tint === "light"
                          ? "white"
                          : "black"
                    }
                  >
                    {renderFallback()}
                  </Box>
                </AnimatedView>
              );
            }
          }

          if (!!previewColor) {
            return (
              <AnimatedView
                style={{
                  zIndex: 3,
                  width: "100%",
                  height: "100%",
                  opacity: previewColorOverlayOpacity,
                }}
              >
                <Box
                  {...borderRadiiStyles}
                  w="100%"
                  h="100%"
                  overflow="hidden"
                  alignItems="center"
                  justifyContent="center"
                  bgColor={previewColor}
                >
                  {renderFallback()}
                </Box>
              </AnimatedView>
            );
          }
        }

        if (loaderType === "spinner") {
          if (!error)
            return (
              <Box width="100%" height="100%" style={StyleSheet.absoluteFill}>
                <Spinner {...atoms.spinner} isExpanded />
              </Box>
            );

          return renderFallback();
        }
      }, [
        intensity,
        loaderType,
        previewSource,
        borderRadiiStyles,
        tint,
        blurIntensity,
        previewSourceOverlayOpacity,
        renderFallback,
        previewColor,
        previewColorOverlayOpacity,
        error,
        atoms.spinner,
      ]);

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
  )
);

/**
 * Video is the most abstract component on top of which all other Pearl UI components are built.
 */
const Video = pearl<BaseVideoProps, "molecule", VideoAtoms>(
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
