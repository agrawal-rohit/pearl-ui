import React from "react";
import {
  color,
  ColorProps,
  layout,
  LayoutProps,
  position,
  PositionProps,
  spacing,
  SpacingProps,
} from "../../../theme/src/styleFunctions";
import { useAtomicComponentConfig } from "../../../hooks/useAtomicComponentConfig";
import SpinnerConfig from "./Spinner.config";
import { StyleFunctionContainer } from "../../../theme/src/types";
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

const indicatorStyleFunctions = [
  color,
  spacing,
  layout,
  position,
] as StyleFunctionContainer[];

type ViewProps = React.ComponentProps<typeof View>;

type SpinnerStyleProps = ColorProps &
  SpacingProps &
  LayoutProps &
  PositionProps;

export type SpinnerProps = SpinnerStyleProps &
  Omit<ViewProps, keyof SpinnerStyleProps> & {
    /** Size of the spinner. */
    size?: keyof typeof SpinnerConfig["sizes"];
    /** Type of the spinner. */
    variant?: keyof typeof SpinnerConfig["variants"];
    /** The loading status of the `Spinner`. If `false`, the `Spinner` component is removed from the DOM. */
    isLoading?: boolean;
    /** Whether the Spinner spans the parent container and centers the spinner within. */
    isExpanded?: boolean;
    /** Animation duration in ms.  */
    animationDuration?: number;
    /** Active color palette of the spinner */
    colorScheme?: string;
  };

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

/** A component used to provide a visual cue that an action is either processing, awaiting a course of change or a result. */
const Spinner: React.FC<SpinnerProps> = ({
  isLoading = true,
  isExpanded = false,
  animationDuration = 1200,
  colorScheme = "primary",
  ...rest
}) => {
  if (!isLoading) return null;

  rest.variant = rest.variant || "spinner";
  const props = useAtomicComponentConfig(
    "Spinner",
    rest,
    {
      size: rest.size,
      variant: rest.variant,
    },
    colorScheme,
    indicatorStyleFunctions
  );

  return React.createElement(
    IndicatorTypeToComponentMap[
      rest.variant as keyof typeof SpinnerConfig["variants"]
    ],
    {
      ...props,
      color: props.style.color ? props.style.color : props.style.color,
      size: props.sizeMultiplier
        ? props.sizeMultiplier * props.spinnerSize
        : props.spinnerSize,
      accessible: true,
      accessibilityLabel: rest.accessibilityLabel
        ? rest.accessibilityLabel
        : "Loading indicator",
      accessibilityRole: "progressbar" as AccessibilityRoles,
      style: [
        isExpanded && StyleSheet.absoluteFill,
        {
          flex: 0,
          ...props.style,
        },
      ],
    }
  );
};

export default Spinner;
