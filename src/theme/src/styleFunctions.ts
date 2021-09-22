import { useColorModeValue } from "./../../hooks/useColorModeValue";
import { ColorValue, FlexStyle, TextStyle, ViewStyle } from "react-native";
import { getKeys, isThemeKey } from "../utils/typeHelpers";
import {
  borderColorProperties,
  borderProperties,
  borderRadiusProperties,
  layoutProperties,
  positionProperties,
  shadowProperties,
  spacingProperties,
  spacingPropertiesShorthand,
  textShadowProperties,
  typographyProperties,
} from "./styleProperties";
import { BasePearlTheme, ColorModeColor } from "./types";

export const createStyleFunction = ({
  property,
  transform,
  styleProperty,
  themeKey,
}: any) => {
  const styleProp = styleProperty || property.toString();

  const func = (props: any, theme: any): any => {
    // Initial value is the raw prop value
    let value = props[property];

    // Transform the value if transformation function exists
    if (transform) {
      value = transform(value);
    }

    // Check if this value refers to a key in the theme config
    if (isThemeKey(theme, themeKey)) {
      // Throw error if the target value is undefined
      if (value && theme[themeKey][value] === undefined)
        throw new Error(
          `Value '${value}' does not exist in theme['${String(themeKey)}']`
        );

      // Finalize the value to be assigned to the component style
      value = value ? theme[themeKey][value] : value;
    }

    if (value === undefined) return {};

    if (typeof styleProperty !== "object") {
      return {
        [styleProp]: value,
      };
    } else {
      return value;
    }
  };

  return {
    property,
    themeKey,
    func,
  };
};

const transformColorValue = (value: ColorModeColor | ColorValue) => {
  // Color Mode color provided
  if (typeof value === "object") {
    return useColorModeValue(value.light, value.dark);
  }

  return value;
};

export const backgroundColor = [
  createStyleFunction({
    property: "backgroundColor",
    themeKey: "palette",
    transform: transformColorValue,
  }),
  createStyleFunction({
    property: "bg",
    styleProperty: "backgroundColor",
    themeKey: "palette",
    transform: transformColorValue,
  }),
];

export const color = createStyleFunction({
  property: "color",
  themeKey: "palette",
  transform: transformColorValue,
});

export const opacity = createStyleFunction({
  property: "opacity",
});

export const visible = createStyleFunction({
  property: "visible",
  styleProperty: "display",
  transform: (value: any) => (value === false ? "none" : "flex"),
});

export const typography = getKeys(typographyProperties).map((property) => {
  return createStyleFunction({
    property,
  });
});

export const layout = getKeys(layoutProperties).map((property) => {
  return createStyleFunction({
    property,
  });
});

export const spacing = [
  ...getKeys(spacingProperties).map((property) => {
    return createStyleFunction({
      property,
      themeKey: "spacing",
    });
  }),

  ...getKeys(spacingPropertiesShorthand).map((property) => {
    const styleProperty = spacingPropertiesShorthand[property];

    return createStyleFunction({
      property,
      styleProperty,
      themeKey: "spacing",
    });
  }),
];

export const position = [
  ...getKeys(positionProperties).map((property) => {
    return createStyleFunction({
      property,
    });
  }),
  createStyleFunction({
    property: "zIndex",
    themeKey: "zIndices",
  }),
];

export const border = [
  ...getKeys(borderProperties).map((property) => {
    return createStyleFunction({
      property,
    });
  }),
  ...getKeys(borderColorProperties).map((property) => {
    return createStyleFunction({
      property,
      themeKey: "palette",
      transform: transformColorValue,
    });
  }),
  ...getKeys(borderRadiusProperties).map((property) => {
    return createStyleFunction({
      property,
      themeKey: "borderRadii",
    });
  }),
];

export const shadow = [
  createStyleFunction({
    property: "boxShadow",
    themeKey: "elevation",
    styleProperty: {},
  }),
  createStyleFunction({
    property: "shadowColor",
    themeKey: "palette",
    transform: transformColorValue,
  }),
];

export const textShadow = [
  ...getKeys(textShadowProperties).map((property) => {
    return createStyleFunction({
      property,
    });
  }),
  createStyleFunction({
    property: "textShadowColor",
    themeKey: "palette",
    transform: transformColorValue,
  }),
];

export const all = [
  color,
  opacity,
  ...backgroundColor,
  ...spacing,
  ...typography,
  ...layout,
  ...position,
  ...border,
  ...shadow,
  ...textShadow,
];

// PropTypes
export interface ColorProps {
  color?: keyof BasePearlTheme["palette"] | ColorModeColor;
}
export interface OpacityProps {
  opacity?: number;
}

export interface VisibleProps {
  visible?: boolean;
}

export interface BackgroundColorProps {
  backgroundColor?: keyof BasePearlTheme["palette"] | ColorModeColor;
  bg?: keyof BasePearlTheme["palette"] | ColorModeColor;
}

type SpacingPropsBase = {
  [Key in keyof typeof spacingProperties]?: keyof BasePearlTheme["spacing"];
};

type SpacingShorthandProps = {
  [Key in keyof typeof spacingPropertiesShorthand]?: keyof BasePearlTheme["spacing"];
};

export type SpacingProps = SpacingPropsBase & SpacingShorthandProps;

export type TypographyProps = {
  [Key in keyof typeof typographyProperties]?: TextStyle[Key];
};

export type LayoutProps = {
  [Key in keyof typeof layoutProperties]?: FlexStyle[Key];
};

export type PositionProps = {
  [Key in keyof typeof positionProperties]?: FlexStyle[Key];
} & {
  zIndex?: BasePearlTheme["zIndices"] extends {}
    ? keyof BasePearlTheme["zIndices"]
    : number;
};

export type BorderProps = {
  [Key in keyof typeof borderProperties]?: ViewStyle[Key];
} &
  {
    [Key in keyof typeof borderColorProperties]?: keyof BasePearlTheme["palette"];
  } &
  {
    [Key in keyof typeof borderRadiusProperties]?: BasePearlTheme["borderRadii"] extends {}
      ? keyof BasePearlTheme["borderRadii"]
      : number;
  };

export type ShadowProps = {
  boxShadow?: keyof BasePearlTheme["elevation"];
  shadowColor?: keyof BasePearlTheme["palette"];
};

export type TextShadowProps = {
  [Key in keyof typeof textShadowProperties]?: TextStyle[Key];
} & {
  textShadowColor?: keyof BasePearlTheme["palette"];
};

export type AllProps = BackgroundColorProps &
  ColorProps &
  OpacityProps &
  SpacingProps &
  TypographyProps &
  LayoutProps &
  PositionProps &
  BorderProps &
  ShadowProps &
  TextShadowProps;