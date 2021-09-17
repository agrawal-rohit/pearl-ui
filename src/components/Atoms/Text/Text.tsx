import React from "react";
import { Text as RNText } from "react-native";
import useComponentConfig from "../../../hooks/useComponentConfig";
import useStyledProps from "../../../hooks/useStyledProps";
import { baseTheme } from "../../../theme/src/basetheme";
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
import { BasePearlTheme } from "../../../theme/src/types";

export type TextProps = ColorProps &
  OpacityProps &
  VisibleProps &
  TypographyProps &
  SpacingProps &
  TextShadowProps & {
    size?: string;
    variant?: string;
  };

export const textStyleFunctions = [
  color,
  opacity,
  visible,
  typography,
  spacing,
  textShadow,
];

/**
 * Text is the most abstract  text component.
 */
const createText = <
  Theme extends BasePearlTheme,
  Props = React.ComponentProps<typeof RNText> & {
    children?: React.ReactNode;
  }
>() => {
  const StyledText = React.forwardRef(
    (props: TextProps & Omit<Props, keyof TextProps>, ref: any) => {
      const passedProps = useStyledProps(textStyleFunctions, props);
      const componentSpecificProps = useComponentConfig(
        "Text",
        {
          variant: props.variant,
        },
        textStyleFunctions
      );

      return <RNText ref={ref} {...passedProps} {...componentSpecificProps} />;
    }
  );

  type StyledTextComponentType = typeof StyledText;
  return StyledText as StyledTextComponentType & {
    defaultProps?: Partial<React.ComponentProps<StyledTextComponentType>>;
  };
};

const Text = createText<typeof baseTheme>();

export default Text;
