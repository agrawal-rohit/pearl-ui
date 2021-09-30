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
import { useComponentConfig } from "../../../hooks/useComponentConfig";
import SpinnerConfig from "./Spinner.config";
import { RNStyle, StyleFunctionContainer } from "../../../theme/src/types";

const indicatorStyleFunctions = [
  color,
  spacing,
  layout,
] as StyleFunctionContainer[];

type SpinnerProps = ColorProps &
  SpacingProps &
  LayoutProps & {
    size?: keyof typeof SpinnerConfig["sizes"];
    variant?: keyof typeof SpinnerConfig["variants"];
    isLoading?: boolean;
    isFullScreen?: boolean;
    animationDuration?: number;
    animating?: boolean;
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

/** A spinner component which can be used to display a loading status to the user */
const Spinner: React.FC<SpinnerProps> = ({
  isLoading = true,
  isFullScreen = false,
  animationDuration = 3600,
  animating = true,
  variant = "spinner",
  ...props
}) => {
  if (!isLoading) return null;

  const componentSpecificProps = useComponentConfig(
    "Spinner",
    props,
    {
      size: props["size"],
      variant: variant,
    },
    indicatorStyleFunctions
  );

  return React.createElement(
    IndicatorTypeToComponentMap[
      variant as keyof typeof SpinnerConfig["variants"]
    ],
    {
      ...componentSpecificProps,
      color: componentSpecificProps.style.color
        ? componentSpecificProps.style.color
        : componentSpecificProps.style.color,
      size: componentSpecificProps.sizeMultiplier
        ? componentSpecificProps.sizeMultiplier * componentSpecificProps.size
        : componentSpecificProps.size,
      style: { flex: isFullScreen ? 1 : 0, ...componentSpecificProps.style },
    }
  );
};

export default Spinner;
