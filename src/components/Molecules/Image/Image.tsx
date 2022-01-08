import React, { useEffect, useRef, useState } from "react";
import { borderStyleFunction } from "../../../theme/src/styleFunctions";
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
} from "react-native";
import { DownloadOptions } from "expo-file-system";
import CacheManager from "./CacheManager";
import Box, { BoxProps } from "../../Atoms/Box/Box";
import { BlurView } from "expo-blur";
import { useMolecularComponentConfig } from "../../../hooks/useMolecularComponentConfig";
import Spinner from "../../Atoms/Spinner/Spinner";
import { useStyledProps } from "../../../hooks/useStyledProps";
import {
  ComponentSizes,
  ComponentVariants,
  ResponsiveValue,
} from "../../../theme/src/types";
import { pearlify } from "../../../hooks/pearlify";

// custom hook for getting previous value
function usePrevious(value: any) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export type ImageProps = BoxProps &
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
    /** The size of the image */
    size?: ResponsiveValue<ComponentSizes<"Image">>;
    /** The variant of the image */
    variant?: ResponsiveValue<ComponentVariants<"Image">>;
    /** Whether a remote image should be cached */
    isCached?: boolean;
    /** Source of the image to show while the remote image is being fetched */
    previewSource?: ImageSourcePropType;
    /** Color of the image container while the remote image is being fetched */
    previewColor?: ColorValue;
    /** Download configuration when fetching the remote image */
    imageDownloadOptions?: DownloadOptions;
    /** Duration (in ms) it takes for progressive loading overlay to fade away after the image has loaded */
    transitionDuration?: number;
    /** Tint of the progressive loading overlay */
    tint?: "dark" | "light" | "default";
    /** The type of loading to use until the image has loaded */
    loaderType?: "progressive" | "spinner";
    /** A custom component to show if an error occurs while loading the image */
    fallbackComponent?: React.ReactElement;
    /** Source of the image to show if an error occurs while loading the image */
    fallbackSource?: ImageSourcePropType;
  };

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

const StyledImage = pearlify(RNImage, {
  componentName: "Image",
  type: "basic",
});

/** The Image component is used to display images. */
const CustomImage: React.FC<ImageProps> = ({ children, ...props }) => {
  const { source, onError, isCached, fallbackComponent, ...rootProps } = (
    props as any
  ).root;

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
    outputRange: [0, 0.5],
  });
  const previewColorOverlayOpacity = intensity.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
  });

  // A handler function for catching errors while loading the image
  const errorHandler = (error: NativeSyntheticEvent<ImageErrorEventData>) => {
    setError(true);
    onError(error);
  };

  // Fetches and caches the remote image
  const loadRemoteImage = async (uri: string, options = {}): Promise<void> => {
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
    testID,
    ...finalRootProps
  } = rootProps;

  // Compute border props so that they can be used by the native Image element
  let borderRadiiStyles = useStyledProps(
    {
      borderRadius,
      borderBottomLeftRadius,
      borderBottomRightRadius,
      borderTopLeftRadius,
      borderTopRightRadius,
    },
    borderStyleFunction
  );

  const renderFallback = () => {
    if (error) {
      if (!!fallbackComponent) {
        return (
          <Box
            overflow="hidden"
            style={{ ...borderRadiiStyles.style, zIndex: 4 }}
          >
            {React.cloneElement(fallbackComponent)}
          </Box>
        );
      }

      if (!!rootProps.fallbackSource) {
        return (
          <RNImage
            source={rootProps.fallbackSource}
            style={[
              StyleSheet.absoluteFill,
              {
                width: "100%",
                height: "100%",
                ...borderRadiiStyles.style,
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
        <StyledImage
          onError={errorHandler}
          testID={testID}
          source={finalSource as ImageSourcePropType}
          style={{
            ...(StyleSheet.absoluteFill as any),
            width: "100%",
            height: "100%",
            ...borderRadiiStyles.style,
            zIndex: 2,
          }}
        />
      );
    }

    if (error) return renderFallback();

    return null;
  };

  const renderPreview = () => {
    if (!!rootProps.previewSource) {
      return (
        <StyledImage
          source={rootProps.previewSource}
          blurRadius={
            Platform.OS === "android" || Platform.OS === "web" ? 0.5 : 0
          }
          style={{
            ...(StyleSheet.absoluteFill as any),
            width: "100%",
            height: "100%",
            ...borderRadiiStyles.style,
            zIndex: 1,
          }}
        />
      );
    }
  };

  const renderImageLoader = () => {
    if (rootProps.loaderType === "progressive") {
      if (!!rootProps.previewSource) {
        // Render a blur overlay over the preview image
        if (Platform.OS === "ios") {
          return (
            <AnimatedBlurView
              tint={rootProps.tint}
              style={{
                ...(StyleSheet.absoluteFill as any),
                alignItems: "center",
                justifyContent: "center",
                ...borderRadiiStyles.style,
                zIndex: 3,
                overflow: "hidden",
              }}
              intensity={intensity}
            >
              {/* Render the fallbackComponent inside the overlay if an error is encountered */}
              {renderFallback()}
            </AnimatedBlurView>
          );
        }

        // Render a static overlay over the preview image
        if (Platform.OS === "android" || Platform.OS === "web") {
          return (
            <Animated.View
              style={{
                ...(StyleSheet.absoluteFill as any),
                backgroundColor: rootProps.tint === "dark" ? "black" : "white",
                alignItems: "center",
                justifyContent: "center",
                opacity: previewSourceOverlayOpacity,
                ...borderRadiiStyles.style,
                zIndex: 3,
                overflow: "hidden",
              }}
            >
              {/* Render the fallbackComponent inside the overlay if an error is encountered */}
              {renderFallback()}
            </Animated.View>
          );
        }
      }

      if (!!rootProps.previewColor) {
        return (
          <Animated.View
            style={[
              StyleSheet.absoluteFill,
              {
                backgroundColor: rootProps.previewColor,
                alignItems: "center",
                justifyContent: "center",
                opacity: previewColorOverlayOpacity,
                ...borderRadiiStyles.style,
                zIndex: 3,
                overflow: "hidden",
              },
            ]}
          >
            {/* Render the fallbackComponent inside the overlay if an error is encountered */}
            {renderFallback()}
          </Animated.View>
        );
      }
    }

    if (rootProps.loaderType === "spinner" && !error && !uri) {
      // Load the spinner component
      return (
        <Box style={StyleSheet.absoluteFill} width="100%" height="100%">
          <Spinner {...(props as any).spinner} isExpanded />
        </Box>
      );
    }
  };

  useEffect(() => {
    // Reload the network image when the URI updates
    if (isRemoteImage) {
      loadRemoteImage(
        (source as ImageURISource).uri as string,
        rootProps.imageDownloadOptions
      );

      // Start animating the overlay opacity as soon as the URI becomes available
      if (uri && !previousUri) {
        Animated.timing(intensity, {
          duration: rootProps.transitionDuration,
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
    <Box
      {...finalRootProps}
      style={{
        alignItems: "center",
        justifyContent: "center",
        ...borderRadiiStyles.style,
        ...finalRootProps.style,
      }}
      accessible={true}
      accessibilityRole="image"
    >
      {renderFinalImage()}
      {renderPreview()}
      {renderImageLoader()}
    </Box>
  );
};

const Image = pearlify(CustomImage, {
  componentName: "Image",
  type: "molecule",
});

export default Image;
