import React from "react";
import { BoxProps } from "../box/box";
import {
  boxStyleFunctions,
  BoxStyleProps,
} from "../../../theme/src/style-functions";
import { BasicComponentProps, StateProps } from "../../../theme/src/types";
import {
  MotiPressable,
  MotiPressableProps,
  mergeAnimateProp,
} from "moti/interactions";
import _ from "lodash";
import { usePressedState } from "../../../hooks/state/usePressedState";
import { useDisabledState } from "../../../hooks/state/useDisabledState";
import { pearlify } from "../../../hooks/pearlify";

export type BasePressableProps = Omit<BoxProps, keyof MotiPressableProps> &
  Omit<MotiPressableProps, "unstable_pressDelay" | "disabled"> &
  StateProps<"_pressed" | "_disabled"> & {
    /** Duration (in milliseconds) to wait after press down before calling onPressIn. */
    onPressInDelay?: number;
    /** Whether the press behavior is disabled. */
    isDisabled?: boolean;
  };

const CustomPressable = React.forwardRef(
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
      ...props
    }: BasicComponentProps<BasePressableProps>,
    ref: any
  ) => {
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

/** A component which allows you to capture pressed events */
const Pressable = pearlify<BasePressableProps, "basic", BoxStyleProps, false>(
  CustomPressable,
  {
    componentName: "None",
    type: "basic",
    animatable: false,
  }
);

export type PressableProps = React.ComponentProps<typeof Pressable>;

export default Pressable;
