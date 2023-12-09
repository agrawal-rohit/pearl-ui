import React from "react";
import {
  colorStyleFunction,
  ColorProps,
  layoutStyleFunction,
  LayoutProps,
  positionStyleFunction,
  PositionProps,
  spacingStyleFunction,
  SpacingProps,
} from "../../../theme/src/style-functions";
import { useAtomicComponentConfig } from "../../../hooks/useAtomicComponentConfig";
import {
  AtomComponentProps,
  StyleFunctionContainer,
} from "../../../theme/src/types";
import { AccessibilityRoles } from "../../../hooks/utils/types";
import { StyleSheet, View } from "react-native";
import BallIndicator from "./indicators/ball";
import BarIndicator from "./indicators/bar";
import DotIndicator from "./indicators/dot";
import MaterialIndicator from "./indicators/material";
import PacmanIndicator from "./indicators/pacman";
import PulseIndicator from "./indicators/pulse";
import SkypeIndicator from "./indicators/skype";
import ActivityIndicator from "./indicators/activity";
import WaveIndicator from "./indicators/wave";
import { useResponsiveProp } from "../../../hooks/useResponsiveProp";
import { useMotiWithStyleProps } from "../../../hooks/useMotiWithStyleProps";

const indicatorStyleFunctions = [
  colorStyleFunction,
  spacingStyleFunction,
  layoutStyleFunction,
  positionStyleFunction,
] as StyleFunctionContainer[];

type BaseSpinnerProps = React.ComponentProps<typeof View> & {
  /**
   * The loading status of the `Spinner`. If `false`, the `Spinner` component is removed from the DOM.
   *
   * @default true
   */
  isLoading?: boolean;
  /**
   * Whether the Spinner spans the parent container and centers the spinner within.
   *
   * @default false
   */
  isExpanded?: boolean;
  /**
   * Animation duration (in milliseconds)
   *
   * @default 1200
   */
  animationDuration?: number;
  /**
   * The raw size of the spinner.
   *
   * @default 20
   */
  rawSize?: number;
  /**
   * The size multiplier of the spinner.
   *
   * @default 1
   */
  sizeMultiplier?: number;
};

type SpinnerStyleProps = ColorProps &
  SpacingProps &
  LayoutProps &
  PositionProps;

const IndicatorTypeToComponentMap = {
  ball: BallIndicator,
  bar: BarIndicator,
  dot: DotIndicator,
  spinner: MaterialIndicator,
  pacman: PacmanIndicator,
  pulse: PulseIndicator,
  skype: SkypeIndicator,
  activity: ActivityIndicator,
  wave: WaveIndicator,
};

/**
 * A component used to provide a visual cue that an action is either processing, awaiting a course of change or a result.
 */
const Spinner = React.memo(
  React.forwardRef(
    (
      {
        isLoading = true,
        isExpanded = false,
        animationDuration = 1200,
        colorScheme = "primary",
        ...rest
      }: AtomComponentProps<"Spinner", BaseSpinnerProps, SpinnerStyleProps>,
      ref: any
    ) => {
      // Set default variant to "spinner"
      rest.variant = rest.variant ?? "spinner";

      // Get props for the Spinner
      let props = useAtomicComponentConfig(
        "Spinner",
        rest,
        {
          size: rest.size,
          variant: rest.variant,
        },
        colorScheme,
        indicatorStyleFunctions
      );

      // Add style props to props using useMotiWithStyleProps
      props = useMotiWithStyleProps(props, indicatorStyleFunctions);

      // Get variant for current screen size
      const variantForCurrentScreenSize = useResponsiveProp(rest.variant);

      // If isLoading is false, return null
      if (!isLoading) return null;

      // Create and return the Spinner component
      return React.createElement(
        IndicatorTypeToComponentMap[
          variantForCurrentScreenSize as keyof typeof IndicatorTypeToComponentMap
        ],
        {
          ...props,
          color: props.style.color,
          size: props.sizeMultiplier
            ? props.sizeMultiplier * props.rawSize
            : props.rawSize,
          accessible: true,
          accessibilityLabel: rest.accessibilityLabel
            ? rest.accessibilityLabel
            : "Loading indicator",
          accessibilityRole: "progressbar" as AccessibilityRoles,
          style: [
            isExpanded ? StyleSheet.absoluteFill : { alignSelf: "flex-start" },
            {
              flex: 0,
              ...props.style,
            },
          ],
          ref: ref,
        }
      );
    }
  )
);

export type SpinnerProps = React.ComponentProps<typeof Spinner>;

Spinner.displayName = "Spinner";

export default Spinner;
