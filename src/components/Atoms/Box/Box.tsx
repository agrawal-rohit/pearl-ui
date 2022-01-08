import React, { useState } from "react";
import {
  LayoutChangeEvent,
  View,
  ViewPropTypes,
  ViewStyle,
} from "react-native";
import { usePercentageBorderRadius } from "../../../hooks/usePercentageBorderRadius";
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
import {
  MotiWithPearlStyleProps,
  StyleFunctionContainer,
} from "../../../theme/src/types";
import {
  StyleValueWithReplacedTransforms,
  StyleValueWithSequenceArrays,
  View as MotiView,
} from "moti";
import { useStyledPropsWithMoti } from "../../../hooks/useStyledPropsWithMoti";

export const boxStyleFunctions = [
  backgroundColor,
  opacity,
  visible,
  layout,
  spacing,
  border,
  shadow,
  position,
] as StyleFunctionContainer[];

/**
 * Box is the most abstract component on top of which all other Pearl UI components are built. By default, it renders a <View> element.
 */
type ViewProps = React.ComponentProps<typeof MotiView>;

type BoxStyleProps = BackgroundColorProps &
  OpacityProps &
  VisibleProps &
  LayoutProps &
  SpacingProps &
  BorderProps &
  ShadowProps &
  PositionProps;

type BoxStylePropsWithMoti = BoxStyleProps &
  MotiWithPearlStyleProps<ViewStyle, BoxStyleProps>;

export type BoxProps = BoxStylePropsWithMoti &
  Omit<ViewProps, keyof BoxStylePropsWithMoti>;

const Box = React.forwardRef((rest: BoxProps, ref: any) => {
  const { children, ...props } = rest;
  const passedProps = useStyledPropsWithMoti(props, boxStyleFunctions);

  // Filter out the borderRadius property to set dynamically
  const { borderRadius, ...otherPropStyles } = passedProps.style;
  const { computedBorderRadius, onLayoutChange } =
    usePercentageBorderRadius(borderRadius);

  return (
    <MotiView
      ref={ref}
      onLayout={onLayoutChange}
      {...passedProps}
      style={{
        ...otherPropStyles,
        borderRadius: computedBorderRadius,
      }}
    >
      {children}
    </MotiView>
  );
});

export default Box;
