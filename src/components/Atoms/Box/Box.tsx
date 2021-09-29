import React from "react";
import { View } from "react-native";
import { useStyledProps } from "../../../hooks/useStyledProps";
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

const Box = React.forwardRef((props: ComponentProps, ref: any) => {
  const passedProps = useStyledProps(props, boxStyleFunctions);

  return (
    <View ref={ref} {...passedProps}>
      {props.children}
    </View>
  );
});

export default Box;
