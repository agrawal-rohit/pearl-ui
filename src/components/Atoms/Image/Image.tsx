import React, { useEffect, useRef, useState } from "react";
import {
  backgroundColor,
  opacity,
  layout,
  spacing,
  position,
  border,
} from "../../../theme/src/styleFunctions";
import {
  BackgroundColorProps,
  OpacityProps,
  VisibleProps,
  LayoutProps,
  SpacingProps,
  PositionProps,
  visible,
} from "../../../theme/src/styleFunctions";
import { StyleFunctionContainer } from "../../../theme/src/types";
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
import Box from "../Box/Box";
import { BlurView } from "expo-blur";
import { useMolecularComponentConfig } from "../../../hooks/useMolecularComponentConfig";
import Spinner from "../../Atoms/Spinner/Spinner";
import { useStyledProps } from "../../../hooks/useStyledProps";

export type ImageStyleProps = BackgroundColorProps &
  OpacityProps &
  VisibleProps &
  LayoutProps &
  SpacingProps &
  PositionProps;

export const boxStyleFunctions = [
  backgroundColor,
  opacity,
  visible,
  layout,
  spacing,
  position,
] as StyleFunctionContainer[];

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

// custom hook for getting previous value
function usePrevious(value: any) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

type PearlImageProps = ImageStyleProps &
  Omit<ImageProps, "width" | "height" | "loadingIndicatorSource"> & {
    /** The size of the image */
    size?: string;
    /** The variant of the image */
    variant?: string;
    /** Source of the image to show while the remote image is being fetched */
    loadingIndicatorSource?: ImageSourcePropType;
    /** Download configuration when fetching the remote image */
    imageDownloadOptions?: DownloadOptions;
    /** Duration (in ms) it takes for the blurred to become clear */
    transitionDuration?: number;
    /** Tint of the image while it is being loaded */
    tint?: "dark" | "light" | "default";
    /** The type of loading to use until the image has loaded */
    loaderType?: "progressive" | "spinner";
  };

// TODO Pass native image props to the underlying image
//

/** Divider is used to visually separate content in a list or group. */
const Image: React.FC<PearlImageProps> = ({
  children,
  source = undefined,
  loadingIndicatorSource = undefined,
  transitionDuration = 300,
  tint = "dark",
  imageDownloadOptions = {},
  onError = () => {},
  ...rest
}) => {
  const molecularProps = useMolecularComponentConfig("Image", rest, {
    size: rest.size,
    variant: rest.size,
  });

  const isMounted = useRef(true);
  const [uri, setUri] = useState<string | undefined>(undefined);
  const previousUri = usePrevious(uri);
  const [intensity, setIntensity] = useState<Animated.Value>(
    new Animated.Value(100)
  );

  const isRemoteImage = typeof source === "object";

  // The image should be ready if it's a local image
  const isImageReady = isRemoteImage ? !!uri : true;
  const opacity = intensity.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 0.5],
  });

  const errorHandler = (error: NativeSyntheticEvent<ImageErrorEventData>) => {};

  const load = async (uri: string, options = {}): Promise<void> => {
    if (uri) {
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
  const borderRadiiStyles = useStyledProps(
    {
      borderRadius,
      borderBottomLeftRadius,
      borderBottomRightRadius,
      borderTopLeftRadius,
      borderTopRightRadius,
    },
    border
  );

  const renderDefaultImage = () => {
    if (!!rest.defaultSource && !isImageReady) {
      return (
        <RNImage
          {...molecularProps.root}
          source={rest.defaultSource}
          style={{
            width: "100%",
            height: "100%",
            ...borderRadiiStyles.style,
          }}
        />
      );
    }
  };

  const renderFinalImage = () => {
    if (isImageReady) {
      return (
        <RNImage
          source={finalSource as ImageSourcePropType}
          style={{
            width: "100%",
            height: "100%",
            ...borderRadiiStyles.style,
          }}
        />
      );
    }
  };

  const renderImageLoader = () => {
    if (!isImageReady) {
      if (
        molecularProps.root.loaderType === "progressive" &&
        !!loadingIndicatorSource
      ) {
        return (
          <Box
            width="100%"
            height="100%"
            overflow="hidden"
            style={borderRadiiStyles.style}
          >
            <RNImage
              source={loadingIndicatorSource}
              blurRadius={Platform.OS === "android" ? 0.5 : 0}
              style={{
                width: "100%",
                height: "100%",
              }}
            />

            {Platform.OS === "ios" && (
              <AnimatedBlurView
                intensity={intensity}
                tint={tint}
                style={StyleSheet.absoluteFill}
              />
            )}

            {Platform.OS === "android" && (
              <Animated.View
                style={[
                  StyleSheet.absoluteFill,
                  {
                    backgroundColor: tint === "dark" ? "black" : "white",
                    opacity,
                  },
                ]}
              />
            )}
          </Box>
        );
      }
      return <Spinner {...molecularProps.spinner} />;
    }

    return null;
  };

  useEffect(() => {
    if (isRemoteImage)
      load((source as ImageURISource).uri as string, imageDownloadOptions);

    if (uri && loadingIndicatorSource && previousUri === undefined) {
      Animated.timing(intensity, {
        duration: transitionDuration,
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
      style={{
        alignItems: "center",
        justifyContent: "center",
        ...borderRadiiStyles,
        ...finalRootProps.style,
      }}
    >
      {renderDefaultImage()}
      {renderFinalImage()}
      {renderImageLoader()}
    </Box>
  );
};

export default Image;
