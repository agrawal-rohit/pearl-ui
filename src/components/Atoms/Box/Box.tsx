import React from "react";
import { View } from "react-native";
import useStyledProps from "../../../hooks/useStyledProps";
import { baseTheme } from "../../../theme/src/basetheme";
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

export type BoxProps = BackgroundColorProps &
  OpacityProps &
  VisibleProps &
  LayoutProps &
  SpacingProps &
  BorderProps &
  ShadowProps &
  PositionProps;

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
type ComponentProps = BoxProps & Omit<ViewProps, keyof BoxProps>;

const createBox = () => {
  const StyledBox = React.forwardRef((props: ComponentProps, ref: any) => {
    const passedProps = useStyledProps(boxStyleFunctions, props);

    return <View ref={ref} {...passedProps} />;
  });

  type StyledBoxComponentType = typeof StyledBox;
  return StyledBox as StyledBoxComponentType & {
    defaultProps?: Partial<React.ComponentProps<StyledBoxComponentType>>;
  };
};

const Box = createBox();

export default Box;
