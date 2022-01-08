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
} from "../../../theme/src/styleFunctions";
import { useAtomicComponentConfig } from "../../../hooks/useAtomicComponentConfig";
import SpinnerConfig from "./Spinner.config";
import {
  ColorScheme,
  ComponentSizes,
  ComponentVariants,
  ResponsiveValue,
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

const indicatorStyleFunctions = [
  colorStyleFunction,
  spacingStyleFunction,
  layoutStyleFunction,
  positionStyleFunction,
] as StyleFunctionContainer[];

type ViewProps = React.ComponentProps<typeof View>;

type SpinnerStyleProps = ColorProps &
  SpacingProps &
  LayoutProps &
  PositionProps;

export type SpinnerProps = SpinnerStyleProps &
  Omit<ViewProps, keyof SpinnerStyleProps> & {
    /** Size of the spinner. */
    size?: ResponsiveValue<ComponentSizes<"Spinner">>;
    /** Type of the spinner. */
    variant?: ResponsiveValue<ComponentVariants<"Spinner">>;
    /** The loading status of the `Spinner`. If `false`, the `Spinner` component is removed from the DOM. */
    isLoading?: boolean;
    /** Whether the Spinner spans the parent container and centers the spinner within. */
    isExpanded?: boolean;
    /** Animation duration in ms.  */
    animationDuration?: number;
    /** Active color palette of the spinner */
    colorScheme?: ColorScheme;
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

  const variantForCurrentScreenSize = useResponsiveProp(rest.variant);

  return React.createElement(
    IndicatorTypeToComponentMap[
      variantForCurrentScreenSize as keyof typeof IndicatorTypeToComponentMap
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
