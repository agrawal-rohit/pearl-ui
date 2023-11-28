import React from "react";
import { BoxProps } from "../box/box";
import { boxStyleFunctions } from "../../../theme/src/style-functions";
import { BasicComponentProps, StateProps } from "../../../theme/src/types";
import {
  MotiPressable,
  MotiPressableProps,
  mergeAnimateProp,
} from "moti/interactions";
import _ from "lodash";
import { usePressedState } from "../../../hooks/state/usePressedState";
import { useDisabledState } from "../../../hooks/state/useDisabledState";
import { useStyleProps } from "../../../hooks/useStyleProps";
import { useMotiWithStyleProps } from "../../../hooks/useMotiWithStyleProps";

// Define the properties for the BasePressable component
export type PressableProps = Omit<BoxProps, keyof MotiPressableProps> &
  Omit<MotiPressableProps, "unstable_pressDelay" | "disabled"> &
  StateProps<"_pressed" | "_disabled"> & {
    /**
     * Duration (in milliseconds) to wait after press down before calling onPressIn.
     *
     * @default 100
     */
    onPressInDelay?: number;
    /**
     * Whether the press behavior is disabled.
     *
     * @default false
     */
    isDisabled?: boolean;
  };

/**
 * CustomPressable is a functional component that returns a MotiPressable component with specific styles based on the props.
 * It uses the usePressedState and useDisabledState hooks to update the component's styles based on its state.
 * @param children The children to render inside the MotiPressable
 * @param onPressInDelay Duration (in milliseconds) to wait after press down before calling onPressIn.
 * @param isDisabled Whether the press behavior is disabled.
 * @param accessibilityLabel A label for the pressable component that is used by screen readers.
 * @param accessibilityState Additional accessibility state information for the pressable component.
 * @param onPress A function to be called when the pressable component is pressed.
 * @param onPressIn A function to be called when the pressable component is pressed and held down.
 * @param onPressOut A function to be called when the pressable component is released.
 * @param onLongPress A function to be called when the pressable component is pressed and held down for a long time.
 * @returns A MotiPressable component with updated props and styles.
 */
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
      ...props
    }: BasicComponentProps<PressableProps>,
    ref: any
  ) => {
    props = useStyleProps(props, boxStyleFunctions);
    props = useMotiWithStyleProps(props, boxStyleFunctions);

    // Use State for dynamic styles
    const { setPressed, propsWithPressedStyles } = usePressedState(
      props,
      boxStyleFunctions
    );
    // Update props with pressed styles
    props = propsWithPressedStyles;

    // Use State for disabled styles
    const { propsWithDisabledStyles } = useDisabledState(
      props,
      boxStyleFunctions,
      "basic",
      true,
      isDisabled
    );
    // Update props with disabled styles
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
        transition={{
          duration: 50,
        }}
        {...props}
        accessibilityRole="button"
        animate={(interaction) => {
          "worklet";

          // Merge the interaction and animate props
          return mergeAnimateProp(interaction, props.animate);
        }}
      >
        {children}
      </MotiPressable>
    );
  }
);

Pressable.displayName = "Pressable";

export default Pressable;
