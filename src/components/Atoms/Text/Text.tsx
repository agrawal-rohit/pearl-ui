import React from "react";
import { Text as RNText } from "react-native";
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
  const componentSpecificProps = useComponentConfig(
    "Text",
    {
      variant: props.variant,
    },
    props,
    textStyleFunctions
  );

  const finalStyle = {
    ...componentSpecificProps.style,
    fontSize: responsiveSize(
      componentSpecificProps.style.fontSize ||
        componentSpecificProps.style.fontSize
    ),
    lineHeight: responsiveSize(
      componentSpecificProps.style.lineHeight ||
        componentSpecificProps.style.lineHeight
    ),
  };

  // console.log(finalStyle);

  return (
    <RNText ref={ref} style={finalStyle}>
      {props.children}
    </RNText>
  );
});

export default Text;
