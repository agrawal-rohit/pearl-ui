import React from "react";
import { BoxProps } from "../Box/Box";
import {
  PressableAndroidRippleConfig,
  PressableProps as RNPressableProps,
} from "react-native";
import {
  boxStyleFunctions,
  BoxStyleProps,
  createStyleFunction,
  transformColorValue,
} from "../../../theme/src/styleFunctions";
import {
  BasicComponentProps,
  PaletteColors,
  ResponsiveValue,
} from "../../../theme/src/types";
import { pearlify } from "../../../hooks/pearlify";
import {
  MotiPressable,
  MotiPressableProps,
  mergeAnimateProp,
} from "moti/interactions";
import { useStyledProps } from "../../../hooks/useStyledProps";
import { useMotiWithStyleProps } from "../../../hooks/useMotiWithStyleProps";

export type BasePressableProps = Omit<BoxProps, keyof MotiPressableProps> &
  Omit<MotiPressableProps, "unstable_pressDelay" | "disabled"> & {
    /** Duration (in milliseconds) to wait after press down before calling onPressIn. */
    onPressInDelay?: number;
    /** Whether the press behavior is disabled. */
    isDisabled?: boolean;
    /** If true, doesn't play Android system sound on press. */
    isDisabledAndroidSound?: boolean;
    /** A short description of the action that occurs when this element is interacted with (Used for accessibility) */
    actionDescription?: string;
    /** The opacity of the element when it is pressed */
    activeOpacity?: number;
  };

const activeBackgroundColorStyleFunction = createStyleFunction({
  property: "activeBackgroundColor",
  styleProperty: "activeBackgroundColor",
  themeKey: "palette",
  transform: transformColorValue,
});

/** A wrapper around the React Native Pressable component which allows you use Pearl style props */
const Pressable = React.forwardRef(
  (
    {
      children,
      onPressInDelay = 100,
      activeOpacity = 1,
      isDisabledAndroidSound = false,
      isDisabled = false,
      accessibilityLabel = "Press me!",
      actionDescription = "",
      accessibilityState = undefined,
      onPress = undefined,
      onPressIn = undefined,
      onPressOut = undefined,
      onLongPress = undefined,
      ...rest
    }: BasicComponentProps<BasePressableProps>,
    ref: any
  ) => {
    let props = useStyledProps(rest, boxStyleFunctions);
    props = useMotiWithStyleProps(props, boxStyleFunctions);

    return (
      <MotiPressable
        ref={ref}
        onPress={!isDisabled ? onPress : undefined}
        onPressIn={!isDisabled ? onPressIn : undefined}
        onPressOut={!isDisabled ? onPressOut : undefined}
        onLongPress={!isDisabled ? onLongPress : undefined}
        disabled={isDisabled}
        {...props}
        animate={(interaction) => {
          "worklet";

          return mergeAnimateProp(interaction, props.animate, {
            opacity: interaction.pressed ? activeOpacity : 1,
          });
        }}
      >
        {children}
      </MotiPressable>
    );
  }
);

export type PressableProps = React.ComponentProps<typeof Pressable>;

export default Pressable;
