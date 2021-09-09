import {
  layout,
  LayoutProps,
  spacing,
  SpacingProps,
  useTheme,
  useRestyle,
} from "@shopify/restyle";
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
import { Theme } from "../../../theme";

const restyleFunctions = [spacing, layout];
type IActivityIndicatorProps = SpacingProps<Theme> &
  LayoutProps<Theme> & {
    color?: string;
    size?: "s" | "m" | "l" | "xl";
    variant?:
      | "ball"
      | "bar"
      | "dot"
      | "spinner"
      | "pacman"
      | "pulse"
      | "skype"
      | "activity"
      | "wave";
    loading?: boolean;
  };

const ActivityIndicator: React.FC<IActivityIndicatorProps> = ({
  color = undefined,
  size = "m",
  variant = "spinner",
  loading = true,
  ...rest
}) => {
  if (!loading) return null;

  const theme = useTheme<Theme>();
  const props = useRestyle(restyleFunctions, rest);

  const { primary500 } = theme.colors;

  if (variant === "ball")
    return (
      <BallIndicator
        color={color ? color : primary500}
        size={theme.activityIndicatorSize[size].size}
        {...props}
      />
    );
  if (variant === "bar")
    return (
      <BarIndicator
        color={color ? color : primary500}
        size={theme.activityIndicatorSize[size].size}
        {...props}
      />
    );
  if (variant === "dot")
    return (
      <DotIndicator
        color={color ? color : primary500}
        size={theme.activityIndicatorSize[size].size}
        {...props}
      />
    );
  if (variant === "pacman")
    return (
      <PacmanIndicator
        color={color ? color : primary500}
        size={theme.activityIndicatorSize[size].size}
        {...props}
      />
    );
  if (variant === "pulse")
    return (
      <PulseIndicator
        color={color ? color : primary500}
        size={theme.activityIndicatorSize[size].size}
        {...props}
      />
    );
  if (variant === "skype")
    return (
      <SkypeIndicator
        color={color ? color : primary500}
        size={theme.activityIndicatorSize[size].size}
        {...props}
      />
    );
  if (variant === "activity")
    return (
      <UIActivityIndicator
        color={color ? color : primary500}
        size={theme.activityIndicatorSize[size].size}
        {...props}
      />
    );
  if (variant === "wave")
    return (
      <WaveIndicator
        color={color ? color : primary500}
        size={theme.activityIndicatorSize[size].size}
        {...props}
      />
    );

  return (
    <MaterialIndicator
      color={color ? color : primary500}
      size={theme.activityIndicatorSize[size].size}
      {...props}
    />
  );
};

export default ActivityIndicator;
