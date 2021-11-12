import React, { useEffect, useRef, useState } from "react";
import { border } from "../../../theme/src/styleFunctions";
import {
  Animated,
  ImageErrorEventData,
  ImageProps,
  ImageSourcePropType,
  NativeSyntheticEvent,
  Image as RNImage,
  Platform,
  StyleSheet,
  ImageURISource,
} from "react-native";
import { DownloadOptions } from "expo-file-system";
import CacheManager from "./CacheManager";
import Box, { BoxProps } from "../../Atoms/Box/Box";
import { BlurView } from "expo-blur";
import { useMolecularComponentConfig } from "../../../hooks/useMolecularComponentConfig";
import Spinner from "../../Atoms/Spinner/Spinner";
import { useStyledProps } from "../../../hooks/useStyledProps";

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

// custom hook for getting previous value
function usePrevious(value: any) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

type PearlImageProps = BoxProps &
  Omit<
    ImageProps,
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
    size?: string;
    /** The variant of the image */
    variant?: string;
    /** Whether a remote image should be cached */
    cache?: boolean;
    /** Source of the image to show while the remote image is being fetched */
    previewSource?: ImageSourcePropType;
    /** Download configuration when fetching the remote image */
    imageDownloadOptions?: DownloadOptions;
    /** Duration (in ms) it takes for the blurred to become clear */
    transitionDuration?: number;
    /** Tint of the image while it is being loaded */
    tint?: "dark" | "light" | "default";
    /** The type of loading to use until the image has loaded */
    loaderType?: "progressive" | "spinner";
    /** A component to show if an error occurs while loading the image */
    errorComponent?: React.ReactElement;
  };

/** The Image component is used to display images. */
const Image: React.FC<PearlImageProps> = ({
  children,
  source,
  onError = () => {},
  ...rest
}) => {
  const molecularProps = useMolecularComponentConfig("Image", rest, {
    size: rest.size,
    variant: rest.variant,
  });

  const isMounted = useRef(true);
  const isRemoteImage = typeof source === "object";
  const shouldCache = isRemoteImage && molecularProps.root.cache;
  const [uri, setUri] = useState<string | undefined>(undefined);
  const [error, setError] = useState(false);
  const previousUri = usePrevious(uri);

  // The image should be ready by default if it's a local image
  const isImageReady = isRemoteImage ? !!uri : true;

  const [intensity, setIntensity] = useState<Animated.Value>(
    new Animated.Value(100)
  );
  const opacity = intensity.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 0.5],
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

  console.log(borderRadiiStyles);

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

  const renderFinalImage = () => {
    if (isImageReady && !error) {
      return (
        <RNImage
          {...molecularProps.root}
          source={finalSource as ImageSourcePropType}
          style={{
            width: "100%",
            height: "100%",
            ...borderRadiiStyles.style,
          }}
        />
      );
    }

    return null;
  };

  const renderImageLoader = () => {
    if (!isImageReady) {
      if (
        molecularProps.root.loaderType === "progressive" &&
        !!molecularProps.root.previewSource
      ) {
        return (
          <Box
            width="100%"
            height="100%"
            overflow="hidden"
            style={borderRadiiStyles.style}
          >
            <RNImage
              source={molecularProps.root.previewSource}
              blurRadius={Platform.OS === "android" ? 0.5 : 0}
              style={{
                width: "100%",
                height: "100%",
                ...borderRadiiStyles.style,
              }}
            />

            {/* Render a blur overlay over the preview image */}
            {Platform.OS === "ios" && (
              <AnimatedBlurView
                intensity={intensity}
                tint={molecularProps.root.tint}
                style={[
                  StyleSheet.absoluteFill,
                  {
                    alignItems: "center",
                    justifyContent: "center",
                  },
                ]}
              >
                {/* Render the errorComponent inside the overlay if an error is encountered */}
                {error &&
                  !!molecularProps.root.errorComponent &&
                  React.cloneElement(molecularProps.root.errorComponent)}
              </AnimatedBlurView>
            )}

            {/* Render a static overlay over the preview image */}
            {Platform.OS === "android" && (
              <Animated.View
                style={[
                  StyleSheet.absoluteFill,
                  {
                    backgroundColor:
                      molecularProps.root.tint === "dark" ? "black" : "white",
                    alignItems: "center",
                    justifyContent: "center",

                    opacity,
                  },
                ]}
              >
                {/* Render the errorComponent inside the overlay if an error is encountered */}
                {error &&
                  !!molecularProps.root.errorComponent &&
                  React.cloneElement(molecularProps.root.errorComponent)}
              </Animated.View>
            )}
          </Box>
        );
      }

      //   Render the errorComponent as it is for "spinner" loaderType
      if (error && molecularProps.root.errorComponent)
        return React.cloneElement(molecularProps.root.errorComponent);

      // Load the spinner component
      return <Spinner {...molecularProps.spinner} />;
    }

    return null;
  };

  useEffect(() => {
    // Reload the network image when the URI updates
    if (isRemoteImage)
      loadRemoteImage(
        (source as ImageURISource).uri as string,
        molecularProps.root.imageDownloadOptions
      );

    // Start animating the overlay opacity as soon as the URI becomes available
    if (uri && molecularProps.root.previewSource && previousUri === undefined) {
      Animated.timing(intensity, {
        duration: molecularProps.root.transitionDuration,
        toValue: 0,
        useNativeDriver: Platform.OS === "android",
      }).start();
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
    >
      {renderFinalImage()}
      {renderImageLoader()}
    </Box>
  );
};

export default Image;
