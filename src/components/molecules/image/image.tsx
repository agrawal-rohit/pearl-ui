import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Animated,
  ImageErrorEventData,
  Image as RNImage,
  ImageProps as RNImageProps,
  ImageSourcePropType,
  NativeSyntheticEvent,
  Platform,
  StyleSheet,
  ImageURISource,
  View,
} from "react-native";
import { DownloadOptions } from "expo-file-system";
import CacheManager from "./cache-manager";
import Box, { BoxProps } from "../../atoms/box/box";
import { BlurView } from "expo-blur";
import Spinner from "../../atoms/spinner/spinner";
import {
  MoleculeComponentProps,
  PaletteColors,
  ResponsiveValue,
} from "../../../theme/src/types";
import { pearl } from "../../../pearl";
import Center from "../../atoms/center/center";
import { ImageAtoms } from "./image.config";
import {
  createStyleFunction,
  transformColorValue,
} from "../../../theme/src/style-functions";
import { useStyleProps } from "../../../hooks";

function usePrevious(value: any) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const PearlRNImage = pearl<RNImageProps, "basic">(RNImage, {
  componentName: "",
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

export type BaseImageProps = BoxProps &
  Omit<
    RNImageProps,
    | "width"
    | "height"
    | "loadingIndicatorSource"
    | "defaultSource"
    | "borderRadius"
    | "borderBottomLeftRadius"
    | "borderBottomRightRadius"
    | "borderTopLeftRadius"
    | "borderTopRightRadius"
  > & {
    /**
     * Whether a remote image should be cached.
     *
     * @default true
     */
    isCached?: boolean;
    /** Source of the image to show while the remote image is being fetched */
    previewSource?: ImageSourcePropType;
    /** Color of the image container while the remote image is being fetched */
    previewColor?: ResponsiveValue<PaletteColors>;
    /** Download configuration when fetching the remote image */
    imageDownloadOptions?: DownloadOptions;
    /**
     * Duration (in ms) it takes for progressive loading overlay to fade away after the image has loaded.
     *
     * @default 300
     */
    overlayTransitionDuration?: number;
    /**
     * Delay (in ms) before the source image starts loading. This can be useful when you want to display a placeholder for a certain amount of time before starting to load the image.
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

const previewColorStyleFunction = createStyleFunction({
  property: "previewColor",
  styleProperty: "previewColor",
  themeKey: "palette",
  transform: transformColorValue,
});

const CustomImage = React.memo(
  React.forwardRef(
    (
      { atoms }: MoleculeComponentProps<"Image", BaseImageProps, ImageAtoms>,
      ref: any
    ) => {
      const {
        source,
        onError,
        testID,
        fallbackSource,
        fallbackComponent,
        previewSource,
        imageDownloadOptions,
        isCached = true,
        loaderType = "spinner",
        tint = "dark",
        sourceDelay = 0,
        overlayTransitionDuration = 300,
        ...restImageProps
      } = atoms.image;

      const isRemoteImage = typeof source === "object";
      const shouldCache = isRemoteImage && isCached;

      const isMounted = useRef(true);
      const [uri, setUri] = useState<string | undefined>(undefined);
      const [error, setError] = useState(false);
      const previousUri = usePrevious(uri);

      const imageProps = useStyleProps(atoms.image, [
        previewColorStyleFunction,
      ]);
      const { previewColor } = imageProps.style;

      const isImageReady = useMemo(
        () => (isRemoteImage ? !!uri : true),
        [isRemoteImage, uri]
      );

      const finalSource: ImageSourcePropType = useMemo(
        () => (isRemoteImage ? { ...(source as object), uri: uri } : source),
        [isRemoteImage, source, uri]
      );

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

      const onErrorHandler = (
        error: NativeSyntheticEvent<ImageErrorEventData>
      ) => {
        setError(true);

        if (onError) onError(error);
      };

      const loadRemoteImage = async (
        uri: string,
        options = {}
      ): Promise<void> => {
        await new Promise((resolve) => setTimeout(resolve, sourceDelay));

        if (shouldCache && Platform.OS !== "web") {
          try {
            const path = await CacheManager.get(uri, options).getPath();
            if (isMounted.current) {
              if (path) {
                setUri(path);
              } else {
                onErrorHandler({
                  nativeEvent: { error: new Error("Could not load image") },
                } as NativeSyntheticEvent<ImageErrorEventData>);
              }
            }
          } catch (error) {
            onErrorHandler({
              nativeEvent: { error },
            } as NativeSyntheticEvent<ImageErrorEventData>);
          }
        } else {
          setUri(uri);
        }
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

          return null;
        }

        return null;
      }, [error, fallbackComponent, fallbackSource, borderRadiiStyles]);

      const renderFinalImage = useCallback(() => {
        if (isImageReady) {
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
              <PearlRNImage
                {...restImageProps}
                {...borderRadiiStyles}
                ref={ref}
                onError={onErrorHandler}
                testID={testID}
                source={finalSource}
                width="100%"
                height="100%"
              />
            </AnimatedView>
          );
        }

        return null;
      }, [
        ref,
        isImageReady,
        restImageProps,
        borderRadiiStyles,
        onErrorHandler,
        testID,
        finalSource,
      ]);

      const renderPreview = useCallback(() => {
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
      }, [previewSource, borderRadiiStyles]);

      const renderImageLoader = () => {
        if (typeof finalSource === "number") return null;

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
      };

      useEffect(() => {
        let reduceIntensity = false;
        if (isRemoteImage) {
          loadRemoteImage(
            (source as ImageURISource).uri as string,
            imageDownloadOptions
          );

          if (uri && !previousUri) reduceIntensity = true;
        } else reduceIntensity = true;

        if (reduceIntensity)
          Animated.timing(intensity, {
            toValue: 0,
            duration: overlayTransitionDuration,
            useNativeDriver: Platform.OS === "android",
          }).start();

        return () => {
          isMounted.current = false;
        };
      }, [
        uri,
        isRemoteImage,
        loadRemoteImage,
        source,
        imageDownloadOptions,
        overlayTransitionDuration,
      ]);

      return (
        <Center
          {...finalContainerProps}
          {...borderRadiiStyles}
          accessible={true}
          accessibilityRole="image"
        >
          {renderFinalImage()}
          {renderPreview()}
          {renderImageLoader()}
        </Center>
      );
    }
  )
);

/** The Image component is used to display images. */
const Image = pearl<BaseImageProps, "molecule", ImageAtoms>(
  CustomImage,
  {
    componentName: "Image",
    type: "molecule",
    animatable: true,
  },
  undefined,
  {
    partForOverridenStyleProps: "container",
    partForOverridenNativeProps: "image",
    partForOverridenAnimationProps: "container",
  }
);

export type ImageProps = React.ComponentProps<typeof Image>;

Image.displayName = "Image";

export default Image;
