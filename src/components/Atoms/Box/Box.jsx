import React from "react";
import { View } from "react-native";
import useStyledProps from "../../../hooks/useStyledProps";
import { useTheme } from "../../../hooks/useTheme";
import {
  backgroundColor,
  border,
  layout,
  opacity,
  position,
  shadow,
  spacing,
  visible,
} from "../../../theme/src/styleFunctions";
import {
  IBasePearlTheme,
  RestyleFunctionContainer,
} from "../../../theme/src/types";

// export type BoxProps<
//   Theme extends IBasePearlTheme
// > = BackgroundColorProps<Theme> &
//   OpacityProps &
//   VisibleProps &
//   LayoutProps &
//   SpacingProps<Theme> &
//   BorderProps<Theme> &
//   ShadowProps<Theme> &
//   PositionProps<Theme>;

export const boxRestyleFunctions = [
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
// type ViewProps = React.ComponentProps<typeof View> & {
//   children?: React.ReactNode;
// };
// type ComponentProps<Theme extends IBasePearlTheme> = BoxProps<Theme> &
//   Omit<ViewProps, keyof BoxProps<Theme>>;

const Box = React.forwardRef((props, ref) => {
  const passedProps = useStyledProps(boxRestyleFunctions, props);

  return <View ref={ref} {...passedProps} />;
});

export default Box;
