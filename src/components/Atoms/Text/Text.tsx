import React from "react";
import { Text as RNText } from "react-native";
import responsiveSize from "../../../utils/responsive-size";
import {
  textStyleFunctions,
  TextStyleProps,
} from "../../../theme/src/style-functions";
import {
  AtomComponentProps,
  ComponentSizes,
  ComponentVariants,
  PearlComponent,
  ResponsiveValue,
} from "../../../theme/src/types";
import { useTheme } from "../../../hooks/useTheme";
import { pearl } from "../../../pearl";

type BaseTextProps = React.ComponentProps<typeof RNText> & {
  /** The size of the text */
  size?: ResponsiveValue<ComponentSizes<"Text">>;
  /** The variant of the text */
  variant?: ResponsiveValue<ComponentVariants<"Text">>;
  /** Whether to slightly scale the font size based on the screen dimensions */
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
  textStyle: any,
  allowFontScaling: boolean
): object => {
  const fontWeight = textStyle.fontWeight;
  const fontStyle = textStyle.fontStyle ?? "normal";

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
    /**
     * Memoized function that builds the font configuration object.
     */
    const memoizedBuildFontConfig = React.useCallback(
      () => buildFontConfig(props.style, scaleFontSize),
      [props.style, scaleFontSize]
    );

    // Apply the font configuration to the provided text style.
    props.style = {
      includeFontPadding: false,
      ...(props.style as any),
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

export default Text;
