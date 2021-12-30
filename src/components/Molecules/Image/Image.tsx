import React, { useEffect, useRef, useState } from "react";
import { border } from "../../../theme/src/styleFunctions";
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

/** The Image component is used to display images. */
const Image: React.FC<ImageProps> = ({
  children,
  source,
  fallbackComponent = undefined,
  onError = () => {},
  ...rest
}) => {
  const molecularProps = useMolecularComponentConfig("Image", rest, {
    size: rest.size,
    variant: rest.variant,
  });

  const isMounted = useRef(true);
  const isRemoteImage = typeof source === "object";
  const shouldCache = isRemoteImage && molecularProps.root.isCached;
  const [uri, setUri] = useState<string | undefined>(undefined);
  const [error, setError] = useState(false);
  const previousUri = usePrevious(uri);

  // The image should be ready by default if it's a local image
  const isImageReady = isRemoteImage ? !!uri : true;

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
    if (shouldCache) {
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
  } = molecularProps.root;

  // Compute border props so that they can be used by the native Image element
  let borderRadiiStyles = useStyledProps(
    {
      borderRadius,
      borderBottomLeftRadius,
      borderBottomRightRadius,
      borderTopLeftRadius,
      borderTopRightRadius,
    },
    border
  );

  borderRadiiStyles = {
    style: {
      borderRadius:
        molecularProps.root.style.borderRadius ||
        borderRadiiStyles.style.borderRadius,
      borderBottomLeftRadius:
        molecularProps.root.style.borderBottomLeftRadius ||
        borderRadiiStyles.style.borderBottomLeftRadius,
      borderBottomRightRadius:
        molecularProps.root.style.borderBottomRightRadius ||
        borderRadiiStyles.style.borderBottomRightRadius,
      borderTopLeftRadius:
        molecularProps.root.style.borderTopLeftRadius ||
        borderRadiiStyles.style.borderTopLeftRadius,
      borderTopRightRadius:
        molecularProps.root.style.borderTopRightRadius ||
        borderRadiiStyles.style.borderTopRightRadius,
    },
  };

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

      if (!!molecularProps.root.fallbackSource) {
        return (
          <RNImage
            source={molecularProps.root.fallbackSource}
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
        <RNImage
          {...molecularProps.root}
          onError={errorHandler}
          testID={testID}
          source={finalSource as ImageSourcePropType}
          style={[
            StyleSheet.absoluteFill,
            {
              width: "100%",
              height: "100%",
              ...borderRadiiStyles.style,
              zIndex: 2,
            },
          ]}
        />
      );
    }

    if (error) return renderFallback();

    return null;
  };

  const renderPreview = () => {
    if (!!molecularProps.root.previewSource) {
      return (
        <RNImage
          source={molecularProps.root.previewSource}
          blurRadius={
            Platform.OS === "android" || Platform.OS === "web" ? 0.5 : 0
          }
          style={[
            StyleSheet.absoluteFill,
            {
              width: "100%",
              height: "100%",
              ...borderRadiiStyles.style,
              zIndex: 1,
            },
          ]}
        />
      );
    }
  };

  const renderImageLoader = () => {
    if (molecularProps.root.loaderType === "progressive") {
      if (!!molecularProps.root.previewSource) {
        // Render a blur overlay over the preview image
        if (Platform.OS === "ios") {
          return (
            <AnimatedBlurView
              tint={molecularProps.root.tint}
              style={[
                StyleSheet.absoluteFill,
                {
                  alignItems: "center",
                  justifyContent: "center",
                  ...borderRadiiStyles.style,
                  zIndex: 3,
                  overflow: "hidden",
                },
              ]}
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
              style={[
                StyleSheet.absoluteFill,
                {
                  backgroundColor:
                    molecularProps.root.tint === "dark" ? "black" : "white",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: previewSourceOverlayOpacity,
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

      if (!!molecularProps.root.previewColor) {
        return (
          <Animated.View
            style={[
              StyleSheet.absoluteFill,
              {
                backgroundColor: molecularProps.root.previewColor,
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

    if (molecularProps.root.loaderType === "spinner" && !error && !uri) {
      // Load the spinner component
      return (
        <Box style={StyleSheet.absoluteFill} width="100%" height="100%">
          <Spinner {...molecularProps.spinner} isExpanded />
        </Box>
      );
    }
  };

  useEffect(() => {
    // Reload the network image when the URI updates
    if (isRemoteImage) {
      loadRemoteImage(
        (source as ImageURISource).uri as string,
        molecularProps.root.imageDownloadOptions
      );

      // Start animating the overlay opacity as soon as the URI becomes available
      if (uri && !previousUri) {
        Animated.timing(intensity, {
          duration: molecularProps.root.transitionDuration,
          toValue: 0,
          useNativeDriver: Platform.OS === "android" || Platform.OS !== "web",
        }).start();
      }
    }

    return () => {
      isMounted.current = false;
    };
  }, [uri]);

  const finalSource = isRemoteImage
    ? { ...(source as object), uri: uri }
    : source;

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

export default Image;
