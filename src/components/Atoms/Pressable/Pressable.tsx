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
    /** Function to call when the component is pressed. */
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
    /** A short description of the action that occurs when this element is interacted with (Used for accessibility) */
    actionDescription?: string;
  };

const defaultRippleConfig: PressableAndroidRippleConfig = {
  color: "#E4E9F2",
  borderless: false,
};

/** A wrapper around the React Native Pressable component which allows you use Pearl style props */
const Pressable: React.FC<PressableProps> = ({
  children,
  androidRippleConfig,
  onPressInDelay = 100,
  isDisabledAndroidSound = false,
  isDisabled = false,
  isDisabledAndroidRipple = false,
  accessibilityLabel = "Press me!",
  actionDescription = "",
  accessibilityState = null,
  onPress,
  onPressIn = null,
  onPressOut = null,
  onLongPress = null,
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
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onLongPress={onLongPress}
      disabled={isDisabled}
      android_disableSound={isDisabledAndroidSound}
      accessible={true}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={actionDescription}
      accessibilityRole="button"
      accessibilityState={
        accessibilityState ? accessibilityState : { disabled: isDisabled }
      }
      {...pressableStyles}
    >
      {children}
    </RNPressable>
  );
};

export default Pressable;