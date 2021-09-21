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
import { baseTheme } from "../../../theme/src/basetheme";
import { useStyledProps } from "../../../hooks/useStyledProps";
import { useComponentConfig } from "../../../hooks/useComponentConfig";

const indicatorStyleFunctions = [color, spacing, layout];
type IActivityIndicatorProps = ColorProps &
  SpacingProps &
  LayoutProps & {
    size?: keyof typeof baseTheme["components"]["ActivityIndicator"]["sizes"];
    variant?: keyof typeof baseTheme["components"]["ActivityIndicator"]["variants"];
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

  const finalStyle = {
    ...componentSpecificProps.style,
    ...receivedStyledProps.style,
  };

  return React.createElement(
    IndicatorTypeToComponentMap[
      variant as keyof typeof baseTheme["components"]["ActivityIndicator"]["variants"]
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

export default ActivityIndicator;
