import React from "react";
import { View } from "react-native";
import useStyleProps from "../../../hooks/useStyleProps";
import { useTheme } from "../../../hooks/useTheme";
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
import {
  IBasePearlTheme,
  RestyleFunctionContainer,
} from "../../../theme/src/types";

type BoxProps<Theme extends IBasePearlTheme> = BackgroundColorProps<Theme> &
  OpacityProps &
  VisibleProps &
  LayoutProps &
  SpacingProps<Theme> &
  BorderProps<Theme> &
  ShadowProps<Theme> &
  PositionProps<Theme>;

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
// const Box1 = <
//   Theme extends IBasePearlTheme,
//   Props = React.ComponentProps<typeof View> & { children?: React.ReactNode }
// >() => {
//   const RestyleComponent = React.forwardRef((props: Props, ref: any) => {
//     const passedProps = useStyleProps(
//       boxRestyleFunctions as RestyleFunctionContainer<BoxProps<Theme>, Theme>[],
//       props
//     );
//     return <View ref={ref} {...passedProps} />;
//   });
//   type RestyleComponentType = typeof RestyleComponent;
//   return RestyleComponent as RestyleComponentType & {
//     defaultProps?: Partial<React.ComponentProps<RestyleComponentType>>;
//   };
// };
type ViewProps = React.ComponentProps<typeof View> & {
  children?: React.ReactNode;
};
type ComponentProps<Theme extends IBasePearlTheme> = BoxProps<Theme> &
  Omit<ViewProps, keyof BoxProps<Theme>>;

const Box = React.forwardRef(
  (props: ComponentProps<IBasePearlTheme>, ref: any) => {
    const { theme } = useTheme();
    type Theme = typeof theme;

    const passedProps = useStyleProps(
      boxRestyleFunctions as RestyleFunctionContainer<BoxProps<Theme>, Theme>[],
      props
    );

    console.log(passedProps);

    return <View ref={ref} {...passedProps} />;
  }
);

export default Box;
