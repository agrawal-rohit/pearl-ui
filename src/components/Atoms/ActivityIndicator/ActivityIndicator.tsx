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
import useStyledProps from "../../../hooks/useStyledProps";
import { useTheme } from "../../../hooks/useTheme";
import {
  color,
  layout,
  LayoutProps,
  spacing,
  SpacingProps,
} from "../../../theme/src/styleFunctions";
import { BasePearlTheme } from "../../../theme/src/types";
import { baseLightTheme } from "../../../theme/src/basetheme";
import useComponentConfig from "../../../hooks/useComponentConfig";

const indicatorStyleFunctions = [color, spacing, layout];
type IActivityIndicatorProps = SpacingProps<BasePearlTheme> &
  LayoutProps & {
    size?: keyof typeof baseLightTheme["components"]["ActivityIndicator"]["sizes"];
    variant?: keyof typeof baseLightTheme["components"]["ActivityIndicator"]["variants"];
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

const ActivityIndicator: React.FC<IActivityIndicatorProps> = ({
  loading = true,
  variant = "spinner",
  ...rest
}) => {
  if (!loading) return null;

  const receivedStyledProps = useStyledProps(indicatorStyleFunctions, rest);
  const componentSpecificProps = useComponentConfig(
    "ActivityIndicator",
    {
      size: rest["size"],
      variant: variant,
    },
    indicatorStyleFunctions
  );

  return React.createElement(
    IndicatorTypeToComponentMap[
      variant as keyof typeof baseLightTheme["components"]["ActivityIndicator"]["variants"]
    ],
    {
      color: componentSpecificProps.style[0].color,
      size: componentSpecificProps.sizeMultiplier
        ? componentSpecificProps.sizeMultiplier * componentSpecificProps.size
        : componentSpecificProps.size,
      style: {
        ...componentSpecificProps.style[0],
        ...receivedStyledProps.style[0],
      },
    }
  );
};

export default ActivityIndicator;
