import React from "react";
import { Text as RNText } from "react-native";
import { useStyledProps } from "../../../hooks/useStyledProps";
import { useComponentConfig } from "../../../hooks/useComponentConfig";
import {
  backgroundColor,
  BackgroundColorProps,
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
import responsiveSize from "./responsiveSize";

export type TextProps = ColorProps &
  BackgroundColorProps &
  OpacityProps &
  VisibleProps &
  TypographyProps &
  SpacingProps &
  TextShadowProps & {
    variant?: string;
  };

export const textStyleFunctions = [
  color,
  backgroundColor,
  opacity,
  visible,
  typography,
  spacing,
  textShadow,
];

type RNTextProps = React.ComponentProps<typeof RNText> & {
  children?: React.ReactNode;
};

type ComponentProps = TextProps & Omit<RNTextProps, keyof TextProps>;

/**
 * Text is the component which controls the typography across your app. By default, it renders a <Text /> component
 */
const Text = React.forwardRef((props: ComponentProps, ref: any) => {
  const passedProps = useStyledProps(textStyleFunctions, props);
  const componentSpecificProps = useComponentConfig(
    "Text",
    {
      variant: props.variant,
    },
    textStyleFunctions
  );

  const finalStyle = {
    ...componentSpecificProps.style,
    ...passedProps.style,
    fontSize: responsiveSize(
      passedProps.style.fontSize || componentSpecificProps.style.fontSize
    ),
    lineHeight: responsiveSize(
      passedProps.style.lineHeight || componentSpecificProps.style.lineHeight
    ),
  };

  return (
    <RNText
      ref={ref}
      {...componentSpecificProps}
      {...passedProps}
      style={finalStyle}
    />
  );
});

export default Text;
