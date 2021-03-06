import React, { useState } from "react";
import { LayoutChangeEvent, View } from "react-native";
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
import { StyleFunctionContainer } from "../../../theme/src/types";

type BoxStyleProps = BackgroundColorProps &
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
] as StyleFunctionContainer[];

/**
 * Box is the most abstract component on top of which all other Pearl UI components are built. By default, it renders a <View> element.
 */
type ViewProps = React.ComponentProps<typeof View>;

export type BoxProps = BoxStyleProps & Omit<ViewProps, keyof BoxStyleProps>;

const Box = React.forwardRef((props: BoxProps, ref: any) => {
  const passedProps = useStyledProps(props, boxStyleFunctions);

  // Filter out the borderRadius property to set dynamically
  const { borderRadius, ...otherPropStyles } = passedProps.style;
  const { computedBorderRadius, onLayoutChange } =
    usePercentageBorderRadius(borderRadius);

  return (
    <View
      ref={ref}
      onLayout={onLayoutChange}
      {...passedProps}
      style={{
        ...otherPropStyles,
        borderRadius: computedBorderRadius,
      }}
    >
      {props.children}
    </View>
  );
});

export default Box;
