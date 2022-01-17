import React from "react";
import Box, { BoxProps } from "../Box/Box";
import { boxStyleFunctions } from "../../../theme/src/styleFunctions";
import { BasicComponentProps } from "../../../theme/src/types";
import {
  MotiPressable,
  MotiPressableProps,
  mergeAnimateProp,
} from "moti/interactions";
import { useStyledProps } from "../../../hooks/useStyledProps";
import { useMotiWithStyleProps } from "../../../hooks/useMotiWithStyleProps";
import _ from "lodash";

export type BasePressableProps = Omit<BoxProps, keyof MotiPressableProps> &
  Omit<MotiPressableProps, "unstable_pressDelay" | "disabled"> & {
    /** Duration (in milliseconds) to wait after press down before calling onPressIn. */
    onPressInDelay?: number;
    /** Whether the press behavior is disabled. */
    isDisabled?: boolean;
    /** A short description of the action that occurs when this element is interacted with (Used for accessibility) */
    actionDescription?: string;
    /** The opacity of the element when it is pressed */
    activeOpacity?: number;
  };

/** A wrapper around the React Native Pressable component which allows you use Pearl style props */
const Pressable = React.forwardRef(
  (
    {
      children,
      onPressInDelay = 100,
      activeOpacity = 1,
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
        accessibilityLabel={accessibilityLabel}
        actionDescription={actionDescription}
        onPress={!isDisabled ? onPress : undefined}
        onPressIn={!isDisabled ? onPressIn : undefined}
        onPressOut={!isDisabled ? onPressOut : undefined}
        onLongPress={!isDisabled ? onLongPress : undefined}
        disabled={isDisabled}
        {...props}
        accessibilityRole="button"
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
