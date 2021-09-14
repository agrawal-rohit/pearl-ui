import React from "react";
import { Text as RNText } from "react-native";
import useStyledProps from "../../../hooks/useStyledProps";
import { baseLightTheme } from "../../../theme/src/basetheme";
import {
  color,
  ColorProps,
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
import createVariant, { VariantProps } from "../../../theme/src/styleVariants";
import { IBasePearlTheme } from "../../../theme/src/types";

export type TextProps<Theme extends IBasePearlTheme> = ColorProps<Theme> &
  OpacityProps &
  VisibleProps &
  TypographyProps &
  SpacingProps<Theme> &
  TextShadowProps<Theme> &
  VariantProps<Theme, "typography">;

export const textStyleFunctions = [
  color,
  opacity,
  visible,
  typography,
  spacing,
  textShadow,
  createVariant({ themeKey: "typography" }),
];

/**
 * Text is the most abstract  text component.
 */
const createText = <
  Theme extends IBasePearlTheme,
  Props = React.ComponentProps<typeof RNText> & {
    children?: React.ReactNode;
  }
>() => {
  const StyledText = React.forwardRef(
    (
      props: TextProps<Theme> & Omit<Props, keyof TextProps<Theme>>,
      ref: any
    ) => {
      const passedProps = useStyledProps(textStyleFunctions, props);

      return <RNText ref={ref} {...passedProps} />;
    }
  );

  type StyledTextComponentType = typeof StyledText;
  return StyledText as StyledTextComponentType & {
    defaultProps?: Partial<React.ComponentProps<StyledTextComponentType>>;
  };
};

const Text = createText<typeof baseLightTheme>();

export default Text;
