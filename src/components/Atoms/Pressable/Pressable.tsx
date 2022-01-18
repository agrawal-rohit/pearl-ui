import React from "react";
import Box, { BoxProps } from "../Box/Box";
import { boxStyleFunctions } from "../../../theme/src/styleFunctions";
import { BasicComponentProps, StateProps } from "../../../theme/src/types";
import {
  MotiPressable,
  MotiPressableProps,
  mergeAnimateProp,
} from "moti/interactions";
import { useStyleProps } from "../../../hooks/useStyleProps";
import { useMotiWithStyleProps } from "../../../hooks/useMotiWithStyleProps";
import _ from "lodash";
import { usePressedState } from "../../../hooks/stateHooks/usePressedState";
import { useDisabledState } from "../../../hooks/stateHooks/useDisabledState";

export type BasePressableProps = Omit<BoxProps, keyof MotiPressableProps> &
  Omit<MotiPressableProps, "unstable_pressDelay" | "disabled"> &
  StateProps<"_pressed" | "_disabled"> & {
    /** Duration (in milliseconds) to wait after press down before calling onPressIn. */
    onPressInDelay?: number;
    /** Whether the press behavior is disabled. */
    isDisabled?: boolean;
  };

/** A wrapper around the React Native Pressable component which allows you use Pearl style props */
const Pressable = React.forwardRef(
  (
    {
      children,
      onPressInDelay = 100,
      isDisabled = false,
      accessibilityLabel = "Press me!",
      accessibilityState = undefined,
      onPress = undefined,
      onPressIn = undefined,
      onPressOut = undefined,
      onLongPress = undefined,
      ...rest
    }: BasicComponentProps<BasePressableProps>,
    ref: any
  ) => {
    let props = useStyleProps(rest, boxStyleFunctions);
    props = useMotiWithStyleProps(props, boxStyleFunctions);

    // Use State for dynamic styles
    const { setPressed, propsWithPressedStyles } = usePressedState(
      props,
      boxStyleFunctions
    );
    props = propsWithPressedStyles;

    const { propsWithDisabledStyles } = useDisabledState(
      props,
      boxStyleFunctions,
      "basic",
      true,
      isDisabled
    );
    props = propsWithDisabledStyles;

    // Methods to handle local pressable state
    const onPressInHandler = () => {
      setPressed(true);
      if (onPressIn) onPressIn();
    };

    const onPressOutHandler = () => {
      setPressed(false);
      if (onPressOut) onPressOut();
    };

    return (
      <MotiPressable
        ref={ref}
        accessibilityLabel={accessibilityLabel}
        onPress={!isDisabled ? onPress : undefined}
        onPressIn={!isDisabled ? onPressInHandler : undefined}
        onPressOut={!isDisabled ? onPressOutHandler : undefined}
        onLongPress={!isDisabled ? onLongPress : undefined}
        disabled={isDisabled}
        {...props}
        accessibilityRole="button"
        animate={(interaction) => {
          "worklet";

          return mergeAnimateProp(interaction, props.animate);
        }}
      >
        {children}
      </MotiPressable>
    );
  }
);

export type PressableProps = React.ComponentProps<typeof Pressable>;

export default Pressable;
