import React, { useEffect, useRef, useState } from "react";
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
  ColorValue,
  View,
} from "react-native";
import { DownloadOptions } from "expo-file-system";
import CacheManager from "./cache-manager";
import Box, { BoxProps } from "../../atoms/box/box";
import { BlurView } from "expo-blur";
import Spinner from "../../atoms/spinner/spinner";
import { MoleculeComponentProps } from "../../../theme/src/types";
import { pearl } from "../../../pearl";
import Center from "../../atoms/center/center";

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
    previewColor?: ColorValue;
    /** Download configuration when fetching the remote image */
    imageDownloadOptions?: DownloadOptions;
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

const CustomImage = React.forwardRef(
  ({ atoms }: MoleculeComponentProps<"Image", BaseImageProps>, ref: any) => {
    const {
      source,
      onError,
      testID,
      fallbackSource,
      fallbackComponent,
      previewSource,
      previewColor,
      imageDownloadOptions,
      isCached = true,
      loaderType = "spinner",
      tint = "dark",
      overlayTransitionDuration = 300,
      ...restImageProps
    } = atoms.image;

    const isMounted = useRef(true);
    const isRemoteImage = typeof source === "object";
    const shouldCache = isRemoteImage && isCached;
    const [uri, setUri] = useState<string | undefined>(undefined);
    const [error, setError] = useState(false);
    const previousUri = usePrevious(uri);

    // The image should be ready by default if it's a local image
    const isImageReady = isRemoteImage ? !!uri : true;

    const finalSource: ImageSourcePropType = isRemoteImage
      ? { ...(source as object), uri: uri }
      : source;

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

    // A handler function for catching errors while loading the image
    const onErrorHandler = (
      error: NativeSyntheticEvent<ImageErrorEventData>
    ) => {
      setError(true);

      if (onError) onError(error);
    };

    // Fetches and caches the remote image
    const loadRemoteImage = async (
      uri: string,
      options = {}
    ): Promise<void> => {
      // Use CacheManager if the image is supposed to be cached
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
      }
      // Else load the remote image directly
      else {
        setUri(uri);
      }
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

        return null;
      }

      return null;
    };

    const renderFinalImage = () => {
      if (isImageReady) {
        return (
          <PearlRNImage
            {...restImageProps}
            {...borderRadiiStyles}
            ref={ref}
            onError={onErrorHandler}
            testID={testID}
            source={finalSource}
            zIndex={3}
            width="100%"
            height="100%"
            style={StyleSheet.absoluteFill}
          />
        );
      }

      return null;
    };

    const renderPreview = () => {
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
      // Reload the network image when the URI updates
      if (isRemoteImage) {
        loadRemoteImage(
          (source as ImageURISource).uri as string,
          imageDownloadOptions
        );

        // Start animating the overlay opacity as soon as the URI becomes available
        if (uri && !previousUri) {
          Animated.timing(intensity, {
            toValue: 0,
            duration: overlayTransitionDuration,
            useNativeDriver: Platform.OS === "android",
          }).start();
        }
      }

      return () => {
        isMounted.current = false;
      };
    }, [uri]);

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
);

/** The Image component is used to display images. */
const Image = pearl<BaseImageProps, "molecule">(
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
