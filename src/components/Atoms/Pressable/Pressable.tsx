import React from "react";
import Box, { BoxProps, boxStyleFunctions } from "../Box/Box";
import {
  Pressable as RNPressable,
  PressableAndroidRippleConfig,
  PressableProps as RNPressableProps,
} from "react-native";
import { useStyledProps } from "../../../hooks/useStyledProps";
import { color } from "../../../theme/src/styleFunctions";

type PressableProps = BoxProps &
  Omit<
    RNPressableProps,
    | "android_ripple"
    | "android_disableSound"
    | "unstable_pressDelay"
    | "disabled"
  > & {
    /** Called after onPressOut. */
    onPress: () => void;
    /** Ripple effect configuration for the android_ripple property. */
    androidRippleConfig?: PressableAndroidRippleConfig;
    /** Duration (in milliseconds) to wait after press down before calling onPressIn. */
    onPressInDelay?: number;
    /** Whether the press behavior is disabled. */
    isDisabled?: boolean;
    /** If true, doesn't play Android system sound on press. */
    isDisabledAndroidSound?: boolean;
    /** Enables the Android ripple effect and configures its properties. */
    isDisabledAndroidRipple?: boolean;
  };

const defaultRippleConfig: PressableAndroidRippleConfig = {
  color: "#E4E9F2",
  borderless: false,
};

/** A wrapper around the React Native Pressable which allows you to use it with Style props */
const Pressable: React.FC<PressableProps> = ({
  children,
  androidRippleConfig,
  onPressInDelay = 100,
  isDisabledAndroidSound = false,
  isDisabled = false,
  isDisabledAndroidRipple = false,
  onPress,
  ...props
}) => {
  const pressableStyles = useStyledProps(props, boxStyleFunctions);

  const androidRippleProps = androidRippleConfig
    ? useStyledProps({ color: androidRippleConfig?.color }, [color]).style
    : defaultRippleConfig;

  return (
    <RNPressable
      android_ripple={!isDisabledAndroidRipple ? androidRippleProps : {}}
      onPress={onPress}
      disabled={isDisabled}
      android_disableSound={isDisabledAndroidSound}
      {...pressableStyles}
    >
      {children}
    </RNPressable>
  );
};

export default Pressable;
