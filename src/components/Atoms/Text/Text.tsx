import React from "react";
import { Text as RNText } from "react-native";
import responsiveSize from "../../../utils/responsiveSize";
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
import {
  ComponentSizes,
  ComponentVariants,
  ResponsiveValue,
  StyleFunctionContainer,
} from "../../../theme/src/types";
import { useTheme } from "../../../hooks/useTheme";

type TextStyleProps = ColorProps &
  BackgroundColorProps &
  OpacityProps &
  VisibleProps &
  LayoutProps &
  TypographyProps &
  SpacingProps &
  TextShadowProps & {
    /** The size of the text */
    size?: ResponsiveValue<ComponentSizes<"Text">>;
    /** The variant of the text */
    variant?: ResponsiveValue<ComponentVariants<"Text">>;
    /** Whether to slightly scale the font size based on the screen dimensions */
    scaleFontSize?: boolean;
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

type RNTextProps = React.ComponentProps<typeof RNText>;

export type TextProps = TextStyleProps &
  Omit<RNTextProps, keyof TextStyleProps>;

export const buildFontConfig = (
  textStyle: any,
  allowFontScaling: boolean
): object => {
  const fontWeight = textStyle.fontWeight;
  const fontStyle = textStyle.fontStyle || "normal";

  let fontSize = textStyle.fontSize;
  let lineHeight = textStyle.lineHeight;

  if (allowFontScaling) {
    fontSize = responsiveSize(fontSize);
    lineHeight = responsiveSize(lineHeight);
  }

  const initialFontFamily = textStyle.fontFamily;
  const { theme } = useTheme();

  const finalFontFamily =
    theme.fontConfig[initialFontFamily][fontWeight][fontStyle];

  return {
    fontSize,
    fontWeight,
    fontFamily: finalFontFamily,
    fontStyle,
  };
};

/**
 * Text is the component which controls the typography across your app. By default, it renders a <Text /> component
 */
const Text = React.forwardRef((rest: TextProps, ref: any) => {
  const props = useAtomicComponentConfig(
    "Text",
    rest,
    {
      size: rest.size,
      variant: rest.variant,
    },
    "primary",
    textStyleFunctions
  );

  const memoizedBuildFontConfig = React.useCallback(
    () => buildFontConfig(props.style, props.scaleFontSize),
    [props.style, props.scaleFontSize]
  );

  props.style = {
    includeFontPadding: false,
    ...props.style,
    ...memoizedBuildFontConfig(),
  };

  return (
    <RNText
      ref={ref}
      accessible={true}
      accessibilityRole="text"
      allowFontScaling
      {...props}
    >
      {props.children}
    </RNText>
  );
});

export default Text;
