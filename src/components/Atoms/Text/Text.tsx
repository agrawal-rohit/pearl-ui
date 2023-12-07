import React from "react";
import { Text as RNText, TextStyle } from "react-native";
import responsiveSize from "../../../utils/responsive-size";
import {
  textStyleFunctions,
  TextStyleProps,
} from "../../../theme/src/style-functions";
import { AtomComponentProps, FinalPearlTheme } from "../../../theme/src/types";
import { useTheme } from "../../../hooks/useTheme";
import { pearl } from "../../../pearl";

type BaseTextProps = React.ComponentProps<typeof RNText> & {
  /**
   * Whether to slightly scale the font size based on the screen dimensions
   *
   * @default true
   */
  scaleFontSize?: boolean;
};

/**
 * Builds a font configuration object based on the provided text style and whether font scaling is allowed.
 *
 * @param textStyle - The text style to build the font configuration from.
 * @param allowFontScaling - Whether font scaling is allowed.
 * @returns A font configuration object.
 */
export const buildFontConfig = (
  textStyle: TextStyle,
  allowFontScaling: boolean,
  theme: FinalPearlTheme
): object => {
  let fontWeight: string | number = textStyle.fontWeight ?? "400";
  if (!!theme.fontWeights[fontWeight])
    fontWeight = theme.fontWeights[fontWeight];

  const fontStyle = textStyle.fontStyle ?? "normal";

  let fontSize = textStyle.fontSize;
  let lineHeight = textStyle.lineHeight;

  if (allowFontScaling) {
    fontSize = responsiveSize(fontSize);
    lineHeight = responsiveSize(lineHeight);
  }

  const initialFontFamily = textStyle.fontFamily;

  if (!initialFontFamily || !theme.fontConfig[initialFontFamily]) {
    throw new Error(
      `Font family "${initialFontFamily}" does not exist in the theme.fontConfig`
    );
  }

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
 * CustomText is a forwardRef component that applies a font configuration to the provided text style.
 *
 * @param scaleFontSize - Whether to slightly scale the font size based on the screen dimensions.
 * @param props - The props to apply the font configuration to.
 * @param ref - The ref to forward.
 * @returns A <RNText /> component with the font configuration applied.
 */
const CustomText = React.forwardRef(
  (
    {
      scaleFontSize = true,
      ...props
    }: AtomComponentProps<"Text", BaseTextProps, TextStyleProps>,
    ref: any
  ) => {
    const { theme } = useTheme();

    // Apply the font configuration to the provided text style.
    props.style = React.useMemo(() => {
      return {
        includeFontPadding: false,
        ...(props.style as any),
        ...buildFontConfig(props.style as TextStyle, scaleFontSize, theme),
      };
    }, [props.style, scaleFontSize, theme]);

    return (
      <RNText
        ref={ref}
        accessible={true}
        accessibilityRole="text"
        allowFontScaling={scaleFontSize}
        {...props}
      >
        {props.children}
      </RNText>
    );
  }
);

/**
 * Text is the component which controls the typography across your app. By default, it renders a <Text /> component
 */
const Text = pearl<BaseTextProps, "atom", TextStyleProps>(
  CustomText,
  {
    componentName: "Text",
    type: "atom",
    animatable: true,
  },
  textStyleFunctions
);

export type TextProps = React.ComponentProps<typeof Text>;

Text.displayName = "Text";

export default Text;
