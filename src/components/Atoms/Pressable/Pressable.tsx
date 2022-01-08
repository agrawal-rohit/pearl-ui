import React from "react";
import Box, { BoxProps } from "../Box/Box";
import {
  Pressable as RNPressable,
  PressableAndroidRippleConfig,
  PressableProps as RNPressableProps,
} from "react-native";
import { useStyledProps } from "../../../hooks/useStyledProps";
import {
  boxStyleFunctions,
  colorStyleFunction,
  createStyleFunction,
  transformColorValue,
} from "../../../theme/src/styleFunctions";
import {
  ColorModeColor,
  FinalPearlTheme,
  PaletteColors,
  ResponsiveValue,
} from "../../../theme/src/types";

export type PressableProps = BoxProps &
  Omit<
    RNPressableProps,
    | "android_ripple"
    | "android_disableSound"
    | "unstable_pressDelay"
    | "disabled"
  > & {
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
    /** The opacity of the element when it is pressed */
    activeOpacity?: number;
    /** The background color of the element when it is pressed */
    activeBackgroundColor?: ResponsiveValue<PaletteColors>;
  };

const defaultRippleConfig: PressableAndroidRippleConfig = {
  color: "#E4E9F2",
  borderless: false,
};

const activeBackgroundColorStyleFunction = createStyleFunction({
  property: "activeBackgroundColor",
  styleProperty: "activeBackgroundColor",
  themeKey: "palette",
  transform: transformColorValue,
});

const pressableStyleFunctions = [
  ...boxStyleFunctions,
  activeBackgroundColorStyleFunction,
];

/** A wrapper around the React Native Pressable component which allows you use Pearl style props */
const Pressable = React.forwardRef(
  (
    {
      children,
      androidRippleConfig,
      onPressInDelay = 100,
      activeOpacity = 1,
      isDisabledAndroidSound = false,
      isDisabled = false,
      isDisabledAndroidRipple = false,
      accessibilityLabel = "Press me!",
      actionDescription = "",
      accessibilityState = undefined,
      onPress = null,
      onPressIn = null,
      onPressOut = null,
      onLongPress = null,
      ...rest
    }: PressableProps,
    ref: any
  ) => {
    const props = useStyledProps(rest, pressableStyleFunctions);

    const androidRippleProps = androidRippleConfig
      ? useStyledProps({ color: androidRippleConfig?.color }, [
          colorStyleFunction,
        ]).style
      : defaultRippleConfig;

    const { style, ...nativeProps } = props;
    const {
      margin,
      marginTop,
      marginRight,
      marginBottom,
      marginLeft,
      marginHorizontal,
      marginVertical,
      marginStart,
      marginEnd,
      position,
      top,
      right,
      bottom,
      left,
      start,
      end,
      borderBottomWidth,
      borderLeftWidth,
      borderRightWidth,
      borderStyle,
      borderTopWidth,
      borderStartWidth,
      borderEndWidth,
      borderWidth,
      borderColor,
      borderTopColor,
      borderRightColor,
      borderLeftColor,
      borderBottomColor,
      borderStartColor,
      borderEndColor,
      shadowOpacity,
      shadowOffset,
      shadowRadius,
      shadowColor,
      elevation,
      alignSelf,
      ...otherPropStyles
    } = style;

    return (
      <Box
        accessible={true}
        accessibilityLabel={accessibilityLabel}
        accessibilityHint={actionDescription}
        accessibilityRole="button"
        accessibilityState={
          accessibilityState ? accessibilityState : { disabled: isDisabled }
        }
        style={{
          margin,
          marginTop,
          marginRight,
          marginBottom,
          marginLeft,
          marginHorizontal,
          marginVertical,
          marginStart,
          marginEnd,
          position,
          top,
          right,
          bottom,
          left,
          start,
          end,
          shadowOpacity,
          shadowOffset,
          shadowRadius,
          shadowColor,
          elevation,
          alignSelf,
        }}
      >
        <Box
          borderRadius={rest.borderRadius}
          borderTopEndRadius={rest.borderTopEndRadius}
          borderTopLeftRadius={rest.borderTopLeftRadius}
          borderTopRightRadius={rest.borderTopRightRadius}
          borderTopStartRadius={rest.borderTopStartRadius}
          borderBottomEndRadius={rest.borderBottomEndRadius}
          borderBottomLeftRadius={rest.borderBottomLeftRadius}
          borderBottomRightRadius={rest.borderBottomRightRadius}
          borderBottomStartRadius={rest.borderBottomStartRadius}
          style={{
            overflow: "hidden",
          }}
        >
          <RNPressable
            ref={ref}
            android_ripple={!isDisabledAndroidRipple ? androidRippleProps : {}}
            onPress={!isDisabled ? onPress : null}
            onPressIn={!isDisabled ? onPressIn : null}
            onPressOut={!isDisabled ? onPressOut : null}
            onLongPress={!isDisabled ? onLongPress : null}
            disabled={isDisabled}
            android_disableSound={isDisabledAndroidSound}
            {...nativeProps}
            style={({ pressed }) => [
              otherPropStyles,
              {
                opacity: pressed ? activeOpacity : otherPropStyles.opacity,
                backgroundColor: pressed
                  ? otherPropStyles.activeBackgroundColor
                    ? otherPropStyles.activeBackgroundColor
                    : otherPropStyles.backgroundColor
                  : otherPropStyles.backgroundColor,
                borderBottomWidth,
                borderLeftWidth,
                borderRightWidth,
                borderStyle,
                borderTopWidth,
                borderStartWidth,
                borderEndWidth,
                borderWidth,
                borderColor,
                borderTopColor,
                borderRightColor,
                borderLeftColor,
                borderBottomColor,
                borderStartColor,
                borderEndColor,
              },
            ]}
          >
            {children}
          </RNPressable>
        </Box>
      </Box>
    );
  }
);

export default Pressable;
