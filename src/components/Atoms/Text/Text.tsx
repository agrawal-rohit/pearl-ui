import React from "react";
import { Text as RNText } from "react-native";
import responsiveSize from "../../../utils/responsiveSize";
import { useAtomicComponentConfig } from "../../../hooks/useAtomicComponentConfig";
import {
  BackgroundColorProps,
  backgroundColorStyleFunction,
  ColorProps,
  colorStyleFunction,
  LayoutProps,
  layoutStyleFunction,
  OpacityProps,
  opacityStyleFunction,
  SpacingProps,
  spacingStyleFunction,
  TextShadowProps,
  textShadowStyleFunction,
  textStyleFunctions,
  TextStyleProps,
  TypographyProps,
  typographyStyleFunction,
  VisibleProps,
  visibleStyleFunction,
} from "../../../theme/src/styleFunctions";
import {
  ComponentSizes,
  ComponentVariants,
  ResponsiveValue,
  StyleFunctionContainer,
} from "../../../theme/src/types";
import { useTheme } from "../../../hooks/useTheme";
import { pearlify } from "../../../hooks/pearlify";

type RNTextProps = React.ComponentProps<typeof RNText>;

export type TextProps = TextStyleProps &
  Omit<RNTextProps, keyof TextStyleProps> & {
    /** The size of the text */
    size?: ResponsiveValue<ComponentSizes<"Text">>;
    /** The variant of the text */
    variant?: ResponsiveValue<ComponentVariants<"Text">>;
    /** Whether to slightly scale the font size based on the screen dimensions */
    scaleFontSize?: boolean;
  };

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

const CustomText: React.FC<TextProps> = ({
  scaleFontSize = true,
  ...props
}) => {
  const memoizedBuildFontConfig = React.useCallback(
    () => buildFontConfig(props.style, scaleFontSize),
    [props.style, scaleFontSize]
  );

  props.style = {
    includeFontPadding: false,
    ...(props.style as any),
    ...memoizedBuildFontConfig(),
  };

  return (
    <RNText
      accessible={true}
      accessibilityRole="text"
      allowFontScaling
      {...props}
    >
      {props.children}
    </RNText>
  );
};

/**
 * Text is the component which controls the typography across your app. By default, it renders a <Text /> component
 */
const Text = pearlify(
  CustomText,
  {
    componentName: "Text",
    type: "atom",
  },
  textStyleFunctions
);

export default Text;
