import React from "react";
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from "react-native-indicators";
import {
  color,
  ColorProps,
  layout,
  LayoutProps,
  spacing,
  SpacingProps,
} from "../../../theme/src/styleFunctions";
import { useAtomicComponentConfig } from "../../../hooks/useAtomicComponentConfig";
import SpinnerConfig from "./Spinner.config";
import { RNStyle, StyleFunctionContainer } from "../../../theme/src/types";
import { AccessibilityRoles } from "../../../hooks/utils/types";

const indicatorStyleFunctions = [
  color,
  spacing,
  layout,
] as StyleFunctionContainer[];

export type SpinnerProps = ColorProps &
  SpacingProps &
  LayoutProps & {
    /** Size of the spinner. */
    size?: keyof typeof SpinnerConfig["sizes"];
    /** Type of the spinner. */
    variant?: keyof typeof SpinnerConfig["variants"];
    /** The loading status of the `Spinner`. If `false`, the `Spinner` component is removed from the DOM. */
    isLoading?: boolean;
    /** Spinner container takes the entire screen size and centers the spinner within. */
    isFullScreen?: boolean;
    /** Animation duration in ms.  */
    animationDuration?: number;
    /** Toggles the animation status. */
    animating?: boolean;
    /** The accessibility label of the icon */
    accessibilityLabel?: string;
    style?: RNStyle;
  };

const IndicatorTypeToComponentMap = {
  ball: BallIndicator,
  bar: BarIndicator,
  dot: DotIndicator,
  spinner: MaterialIndicator,
  pacman: PacmanIndicator,
  pulse: PulseIndicator,
  skype: SkypeIndicator,
  activity: UIActivityIndicator,
  wave: WaveIndicator,
};

/** A component used to provide a visual cue that an action is either processing, awaiting a course of change or a result. */
const Spinner: React.FC<SpinnerProps> = ({
  isLoading = true,
  isFullScreen = false,
  animationDuration = 1200,
  animating = true,
  variant = "spinner",
  accessibilityLabel = null,
  ...rest
}) => {
  if (!isLoading) return null;

  const props = useAtomicComponentConfig(
    "Spinner",
    rest,
    {
      size: rest["size"],
      variant: variant,
    },
    indicatorStyleFunctions
  );

  return React.createElement(
    IndicatorTypeToComponentMap[
      variant as keyof typeof SpinnerConfig["variants"]
    ],
    {
      ...props,
      color: props.style.color ? props.style.color : props.style.color,
      size: props.sizeMultiplier
        ? props.sizeMultiplier * props.spinnerSize
        : props.spinnerSize,
      style: { flex: isFullScreen ? 1 : 0, ...props.style },
      accessible: true,
      accessibilityLabel: accessibilityLabel
        ? accessibilityLabel
        : "Loading indicator",
      accessibilityRole: "progressbar" as AccessibilityRoles,
    }
  );
};

export default Spinner;
