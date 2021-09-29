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
import { useStyledProps } from "../../../hooks/useStyledProps";
import { useComponentConfig } from "../../../hooks/useComponentConfig";
import SpinnerConfig from "./Spinner.config";

const indicatorStyleFunctions = [color, spacing, layout];
type SpinnerProps = ColorProps &
  SpacingProps &
  LayoutProps & {
    size?: keyof typeof SpinnerConfig["sizes"];
    variant?: keyof typeof SpinnerConfig["variants"];
    loading?: boolean;
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
  loading = true,
  variant = "spinner",
  ...rest
}) => {
  if (!loading) return null;

  const receivedStyledProps = useStyledProps(indicatorStyleFunctions, rest);
  const componentSpecificProps = useComponentConfig(
    "Spinner",
    {
      size: rest["size"],
      variant: variant,
    },
    indicatorStyleFunctions
  );

  const finalStyle = {
    ...componentSpecificProps.style,
    ...receivedStyledProps.style,
  };

  return React.createElement(
    IndicatorTypeToComponentMap[
      variant as keyof typeof SpinnerConfig["variants"]
    ],
    {
      color: receivedStyledProps.style.color
        ? receivedStyledProps.style.color
        : componentSpecificProps.style.color,
      size: componentSpecificProps.sizeMultiplier
        ? componentSpecificProps.sizeMultiplier * componentSpecificProps.size
        : componentSpecificProps.size,
      style: finalStyle,
    }
  );
};

export default Spinner;
