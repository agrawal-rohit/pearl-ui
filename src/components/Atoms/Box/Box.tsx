import React from "react";
import { View } from "react-native";
import useStyledProps from "../../../hooks/useStyledProps";
import { useTheme } from "../../../hooks/useTheme";
import { baseLightTheme } from "../../../theme/src/basetheme";
import {
  backgroundColor,
  BackgroundColorProps,
  border,
  BorderProps,
  layout,
  LayoutProps,
  opacity,
  OpacityProps,
  position,
  PositionProps,
  shadow,
  ShadowProps,
  spacing,
  SpacingProps,
  visible,
  VisibleProps,
} from "../../../theme/src/styleFunctions";
import { BasePearlTheme } from "../../../theme/src/types";

export type BoxProps<
  Theme extends BasePearlTheme
> = BackgroundColorProps<Theme> &
  OpacityProps &
  VisibleProps &
  LayoutProps &
  SpacingProps<Theme> &
  BorderProps<Theme> &
  ShadowProps<Theme> &
  PositionProps<Theme>;

export const boxStyleFunctions = [
  backgroundColor,
  opacity,
  visible,
  layout,
  spacing,
  border,
  shadow,
  position,
];

/**
 * Box is the most abstract component on top of which all other Pearl UI components are built. By default, it renders a <View> element.
 */
type ViewProps = React.ComponentProps<typeof View> & {
  children?: React.ReactNode;
};
type ComponentProps<Theme extends BasePearlTheme> = BoxProps<Theme> &
  Omit<ViewProps, keyof BoxProps<Theme>>;

const createBox = <Theme extends BasePearlTheme>() => {
  const StyledBox = React.forwardRef(
    (props: ComponentProps<Theme>, ref: any) => {
      const passedProps = useStyledProps(boxStyleFunctions, props);

      return <View ref={ref} {...passedProps} />;
    }
  );

  type StyledBoxComponentType = typeof StyledBox;
  return StyledBox as StyledBoxComponentType & {
    defaultProps?: Partial<React.ComponentProps<StyledBoxComponentType>>;
  };
};

const Box = createBox<typeof baseLightTheme>();

export default Box;
