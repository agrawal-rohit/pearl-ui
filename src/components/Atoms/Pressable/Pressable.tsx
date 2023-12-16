import React from "react";
import { BoxProps } from "../box/box";
import { boxStyleFunctions } from "../../../theme/src/style-functions";
import { BasicComponentProps, StateProps } from "../../../theme/src/types";
import { MotiPressableProps, mergeAnimateProp } from "moti/interactions";
import { PressableProps as RNPressableProps } from "react-native";
import { usePressedState } from "../../../hooks/state/usePressedState";
import { useDisabledState } from "../../../hooks/state/useDisabledState";
import { useStyleProps } from "../../../hooks/useStyleProps";
import { useMotiWithStyleProps } from "../../../hooks/useMotiWithStyleProps";
import { MotiPressable } from "./moti-pressable";
import _ from "lodash";

// Define the properties for the BasePressable component
export type PressableProps = Omit<BoxProps, keyof MotiPressableProps> &
  Omit<
    MotiPressableProps,
    | "unstable_pressDelay"
    | "disabled"
    | "animate"
    | "from"
    | "transition"
    | "delay"
    | "state"
    | "stylePriority"
    | "onDidAnimate"
    | "exit"
    | "exitTransition"
    | "animateInitialState"
  > &
  Pick<
    BoxProps,
    | "animate"
    | "from"
    | "transition"
    | "delay"
    | "state"
    | "stylePriority"
    | "onDidAnimate"
    | "exit"
    | "exitTransition"
    | "animateInitialState"
  > & { testID?: RNPressableProps["testID"] } & StateProps<
    "_pressed" | "_disabled"
  > & {
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

const STYLE_PROPS_FOR_CONTAINER = [
  "width",
  "height",
  "flex",
  "alignSelf",
  "position",
  "top",
  "right",
  "bottom",
  "left",
];

/**
 * Pressable is a functional component use to make interactive elements such as buttons, links, and more.
 * @returns A MotiPressable component with updated props and styles.
 */
const Pressable = React.memo(
  React.forwardRef(
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

      const containerStyles = {
        alignSelf: "flex-start",
        ..._.pick(props.style, STYLE_PROPS_FOR_CONTAINER),
      };
      const childStyles = _.omit(props.style || {}, STYLE_PROPS_FOR_CONTAINER);

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
          {...(props as any)}
          styles={childStyles}
          containerStyle={containerStyles}
          accessibilityRole="button"
          animate={(interaction) => {
            "worklet";

            // Merge the interaction and animate props
            return mergeAnimateProp(interaction, props.animate as any);
          }}
        >
          {children}
        </MotiPressable>
      );
    }
  )
);

Pressable.displayName = "Pressable";

export default Pressable;
