import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  ImageErrorEventData,
  ImageProps as RNImageProps,
  ImageSourcePropType,
  NativeSyntheticEvent,
  Image as RNImage,
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

// custom hook for getting previous value
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
     * @default 600
     */
    transitionDuration?: number;
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
    const { source, onError, isCached, fallbackComponent, ...restImageProps } =
      atoms.image;

    const isMounted = useRef(true);
    const isRemoteImage = typeof source === "object";
    const shouldCache = isRemoteImage && isCached;
    const [uri, setUri] = useState<string | undefined>(undefined);
    const [error, setError] = useState(false);
    const previousUri = usePrevious(uri);

    // The image should be ready by default if it's a local image
    const isImageReady = isRemoteImage ? !!uri : true;

    const finalSource = isRemoteImage
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

    // A handler function for catching errors while loading the image
    const errorHandler = (error: NativeSyntheticEvent<ImageErrorEventData>) => {
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
              errorHandler({
                nativeEvent: { error: new Error("Could not load image") },
              } as NativeSyntheticEvent<ImageErrorEventData>);
            }
          }
        } catch (error) {
          errorHandler({
            nativeEvent: { error },
          } as NativeSyntheticEvent<ImageErrorEventData>);
        }
      }
      // Else load the remote image directly
      else {
        setUri(uri);
      }
    };

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

    const renderFallback = () => {
      if (error) {
        if (!!fallbackComponent) {
          return (
            <Box overflow="hidden" {...borderRadiiStyles} style={{ zIndex: 4 }}>
              {React.cloneElement(fallbackComponent)}
            </Box>
          );
        }

        if (!!atoms.image.fallbackSource) {
          return (
            <PearlRNImage
              {...atoms.fallbackImage}
              {...borderRadiiStyles}
              source={atoms.image.fallbackSource}
              style={[
                StyleSheet.absoluteFill,
                {
                  width: "100%",
                  height: "100%",
                  zIndex: 3,
                },
              ]}
            />
          );
        }

        return null;
      }

      return null;
    };

    const renderFinalImage = () => {
      if (isImageReady && !error) {
        return (
          <PearlRNImage
            {...atoms.image}
            {...borderRadiiStyles}
            onError={errorHandler}
            testID={atoms.image.testID}
            source={finalSource as ImageSourcePropType}
            style={{
              ...(StyleSheet.absoluteFill as any),
              width: "100%",
              height: "100%",
              zIndex: 2,
            }}
          />
        );
      }

      if (error) return renderFallback();

      return null;
    };

    const renderPreview = () => {
      if (!!restImageProps.previewSource) {
        return (
          <PearlRNImage
            {...atoms.previewImage}
            {...borderRadiiStyles}
            source={restImageProps.previewSource}
            blurRadius={
              Platform.OS === "android" || Platform.OS === "web" ? 0.5 : 0
            }
            style={{
              ...(StyleSheet.absoluteFill as any),
              width: "100%",
              height: "100%",
              zIndex: 1,
            }}
          />
        );
      }
    };

    const renderImageLoader = () => {
      if (restImageProps.loaderType === "progressive") {
        if (!!restImageProps.previewSource) {
          // Render a blur overlay over the preview image
          if (Platform.OS === "ios") {
            return (
              <PearlAnimatedBlurView
                tint={restImageProps.tint}
                {...borderRadiiStyles}
                style={{
                  ...(StyleSheet.absoluteFill as any),
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 3,
                  overflow: "hidden",
                }}
                intensity={blurIntensity}
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
                bgColor={restImageProps.tint === "dark" ? "black" : "white"}
                alignItems="center"
                justifyContent="center"
                overflow="hidden"
                zIndex={3}
                style={{
                  opacity: previewSourceOverlayOpacity,
                }}
              >
                {renderFallback()}
              </PearlAnimatedView>
            );
          }
        }

        if (!!restImageProps.previewColor) {
          return (
            <PearlAnimatedView
              {...borderRadiiStyles}
              w="100%"
              h="100%"
              bgColor={restImageProps.previewColor}
              alignItems="center"
              justifyContent="center"
              overflow="hidden"
              zIndex={3}
              style={{
                opacity: previewColorOverlayOpacity,
              }}
            >
              {renderFallback()}
            </PearlAnimatedView>
          );
        }
      }

      if (restImageProps.loaderType === "spinner" && !error) {
        return (
          <Box style={StyleSheet.absoluteFill} width="100%" height="100%">
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
          restImageProps.imageDownloadOptions
        );

        // Start animating the overlay opacity as soon as the URI becomes available
        if (uri && !previousUri) {
          Animated.timing(intensity, {
            duration: restImageProps.transitionDuration,
            toValue: 0,
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
        ref={ref}
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
