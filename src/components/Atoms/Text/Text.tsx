import React from "react";
import { Text as RNText } from "react-native";
import { useAtomicComponentConfig } from "../../../hooks/useAtomicComponentConfig";
import {
  backgroundColor,
  BackgroundColorProps,
  color,
  ColorProps,
  layout,
  LayoutProps,
  opacity,
  OpacityProps,
  spacing,
  SpacingProps,
  textShadow,
  TextShadowProps,
  typography,
  TypographyProps,
  visible,
  VisibleProps,
} from "../../../theme/src/styleFunctions";
import { StyleFunctionContainer } from "../../../theme/src/types";

export type TextProps = ColorProps &
  BackgroundColorProps &
  OpacityProps &
  VisibleProps &
  LayoutProps &
  TypographyProps &
  SpacingProps &
  TextShadowProps & {
    /** The size of the text */
    size?: string;
    /** The variant of the text */
    variant?: string;
  };

export const textStyleFunctions = [
  color,
  backgroundColor,
  opacity,
  visible,
  layout,
  typography,
  spacing,
  textShadow,
] as StyleFunctionContainer[];

type RNTextProps = React.ComponentProps<typeof RNText> & {
  children?: React.ReactNode;
};

type ComponentProps = TextProps & Omit<RNTextProps, keyof TextProps>;

/**
 * Text is the component which controls the typography across your app. By default, it renders a <Text /> component
 */
const Text = React.forwardRef((props: ComponentProps, ref: any) => {
  const componentSpecificProps = useAtomicComponentConfig(
    "Text",
    props,
    {
      size: props.size,
      variant: props.variant,
    },
    "primary",
    textStyleFunctions
  );

  return (
    <RNText
      ref={ref}
      accessible={true}
      accessibilityRole="text"
      allowFontScaling
      {...componentSpecificProps}
    >
      {props.children}
    </RNText>
  );
});

export default Text;
