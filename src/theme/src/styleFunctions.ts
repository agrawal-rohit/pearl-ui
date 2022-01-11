import { ColorValue, FlexStyle, TextStyle, ViewStyle } from "react-native";
import { getKeys, getNestedObject, isThemeKey } from "../utils/typeHelpers";
import {
  borderColorProperties,
  borderProperties,
  borderRadiusProperties,
  layoutProperties,
  layoutPropertiesShorthand,
  positionProperties,
  shadowProperties,
  spacingProperties,
  spacingPropertiesShorthand,
  textShadowProperties,
  typographyProperties,
} from "./styleProperties";
import {
  FinalPearlTheme,
  ColorModeColor,
  ResponsiveValue,
  RNStyleProperty,
  StyleFunction,
  StyleFunctionContainer,
  PaletteColors,
} from "./types";
import responsiveSize from "../../utils/responsiveSize";
import { useTheme } from "../../hooks/useTheme";
import {
  getValueForScreenSize,
  isResponsiveObjectValue,
} from "./responsiveHelpers";

interface CreateStyleFunctionProps {
  property: string;
  transform?: any;
  styleProperty?: RNStyleProperty | "skip" | string;
  themeKey?: keyof FinalPearlTheme | undefined;
}

export const createStyleFunction = ({
  property,
  transform,
  styleProperty,
  themeKey,
}: CreateStyleFunctionProps): StyleFunctionContainer => {
  const styleProp = styleProperty || property.toString();

  const func: StyleFunction = (props: any, { theme, dimensions }: any): any => {
    // Initial value is the raw prop value
    let value = isResponsiveObjectValue(props[property], theme)
      ? getValueForScreenSize({
          responsiveValue: props[property],
          breakpoints: theme.breakpoints,
          dimensions,
        })
      : props[property];

    // Transform the value if transformation function exists
    if (transform) {
      value = transform(value);
    }

    // Check if this value refers to a key in the theme config
    if (isThemeKey(theme, themeKey)) {
      if (value) {
        let themeTokenValue = theme[themeKey][value];

        // For color palettes with multiple shades
        if (typeof value === "string" && value.includes(".")) {
          themeTokenValue = getNestedObject(theme, [
            themeKey,
            value.split(".")[0],
            value.split(".")[1],
          ]);
        }

        // Throw error if the target value is undefined
        if (
          themeTokenValue === undefined &&
          !getKeys(borderRadiusProperties).includes(property as any)
        ) {
          throw new Error(
            `Value '${value}' does not exist in theme['${String(themeKey)}']`
          );
        }

        if (!getKeys(borderRadiusProperties).includes(property as any))
          value = themeTokenValue;
        else value = themeTokenValue || value;
      }
    }

    if (value === undefined) return {};

    if (styleProperty !== "skip") {
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

export const transformColorValue = (value: ColorModeColor | ColorValue) => {
  const { colorMode } = useTheme();

  // Color Mode color provided
  if (typeof value === "object") {
    if (colorMode === "light") return value.light;

    return value.dark;
  }

  return value;
};

export const backgroundColorStyleFunction = [
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

export const colorStyleFunction = createStyleFunction({
  property: "color",
  themeKey: "palette",
  transform: transformColorValue,
});

export const opacityStyleFunction = createStyleFunction({
  property: "opacity",
});

export const visibleStyleFunction = createStyleFunction({
  property: "visible",
  styleProperty: "display",
  transform: (value: any) => (value === false ? "none" : "flex"),
});

export const typographyStyleFunction = [
  ...getKeys(typographyProperties).map((property) => {
    return createStyleFunction({
      property,
    });
  }),
  createStyleFunction({
    property: "letterSpacing",
    themeKey: "letterSpacings",
  }),
  createStyleFunction({
    property: "fontFamily",
    themeKey: "fonts",
  }),
  createStyleFunction({
    property: "fontWeight",
    themeKey: "fontWeights",
  }),
  createStyleFunction({
    property: "fontSize",
    themeKey: "fontSizes",
  }),
  createStyleFunction({
    property: "lineHeight",
    themeKey: "lineHeights",
  }),
];

export const layoutStyleFunction = [
  ...getKeys(layoutProperties).map((property) => {
    return createStyleFunction({
      property,
    });
  }),
  ...getKeys(layoutPropertiesShorthand).map((property) => {
    const styleProperty = layoutPropertiesShorthand[property];

    return createStyleFunction({
      property,
      styleProperty,
    });
  }),
];

export const spacingStyleFunction = [
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

export const positionStyleFunction = [
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

export const borderStyleFunction = [
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

export const shadowStyleFunction = [
  ...getKeys(shadowProperties).map((property) => {
    return createStyleFunction({
      property,
    });
  }),
  createStyleFunction({
    property: "boxShadow",
    themeKey: "elevation",
    styleProperty: "skip",
  }),
  createStyleFunction({
    property: "shadowColor",
    themeKey: "palette",
    transform: transformColorValue,
  }),
];

export const textShadowStyleFunction = [
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

export const allStyleFunctions = [
  colorStyleFunction,
  opacityStyleFunction,
  visibleStyleFunction,
  ...backgroundColorStyleFunction,
  ...spacingStyleFunction,
  ...typographyStyleFunction,
  ...layoutStyleFunction,
  ...positionStyleFunction,
  ...borderStyleFunction,
  ...shadowStyleFunction,
  ...textShadowStyleFunction,
];

// Component Specific Style function
export const boxStyleFunctions = [
  opacityStyleFunction,
  visibleStyleFunction,
  ...backgroundColorStyleFunction,
  ...layoutStyleFunction,
  ...spacingStyleFunction,
  ...borderStyleFunction,
  ...shadowStyleFunction,
  ...positionStyleFunction,
] as StyleFunctionContainer[];

export const textStyleFunctions = [
  colorStyleFunction,
  backgroundColorStyleFunction,
  opacityStyleFunction,
  visibleStyleFunction,
  layoutStyleFunction,
  typographyStyleFunction,
  spacingStyleFunction,
  textShadowStyleFunction,
  positionStyleFunction,
] as StyleFunctionContainer[];

// PropTypes
export interface ColorProps {
  color?: ResponsiveValue<PaletteColors>;
}
export interface OpacityProps {
  opacity?: ResponsiveValue<number>;
}

export interface VisibleProps {
  visible?: ResponsiveValue<boolean>;
}

export interface BackgroundColorProps {
  backgroundColor?: ResponsiveValue<PaletteColors>;
  bg?: ResponsiveValue<PaletteColors>;
}

type SpacingPropsBase = {
  [Key in keyof typeof spacingProperties]?: ResponsiveValue<
    keyof FinalPearlTheme["spacing"]
  >;
};

type SpacingShorthandProps = {
  [Key in keyof typeof spacingPropertiesShorthand]?: ResponsiveValue<
    keyof FinalPearlTheme["spacing"]
  >;
};

export type SpacingProps = SpacingPropsBase & SpacingShorthandProps;

export type TypographyProps = {
  [Key in keyof typeof typographyProperties]?: TextStyle[Key];
} & {
  letterSpacing?: ResponsiveValue<keyof FinalPearlTheme["letterSpacings"]>;
  fontSize?: ResponsiveValue<keyof FinalPearlTheme["fontSizes"]>;
  lineHeight?: ResponsiveValue<keyof FinalPearlTheme["lineHeights"]>;
  fontWeight?: ResponsiveValue<keyof FinalPearlTheme["fontWeights"]>;
  fontFamily?: ResponsiveValue<keyof FinalPearlTheme["fonts"]>;
};

type LayoutPropsBase = {
  [Key in keyof typeof layoutProperties]?: ResponsiveValue<FlexStyle[Key]>;
};

type LayoutShorthandProps = {
  [Key in keyof typeof layoutPropertiesShorthand]?: ResponsiveValue<
    FlexStyle[typeof layoutPropertiesShorthand[Key]]
  >;
};

export type LayoutProps = LayoutPropsBase & LayoutShorthandProps;

export type PositionProps = {
  [Key in keyof typeof positionProperties]?: ResponsiveValue<FlexStyle[Key]>;
} & {
  zIndex?: ResponsiveValue<keyof FinalPearlTheme["zIndices"]>;
};

export type BorderProps = {
  [Key in keyof typeof borderProperties]?: ResponsiveValue<ViewStyle[Key]>;
} & {
  [Key in keyof typeof borderColorProperties]?: ResponsiveValue<PaletteColors>;
} & {
  [Key in keyof typeof borderRadiusProperties]?: ResponsiveValue<
    keyof FinalPearlTheme["borderRadii"]
  >;
};

export type ShadowProps = {
  [Key in keyof typeof shadowProperties]?: ResponsiveValue<ViewStyle[Key]>;
} & {
  boxShadow?: ResponsiveValue<keyof FinalPearlTheme["elevation"]>;
  shadowColor?: ResponsiveValue<PaletteColors>;
};

export type TextShadowProps = {
  [Key in keyof typeof textShadowProperties]?: ResponsiveValue<TextStyle[Key]>;
} & {
  textShadowColor?: ResponsiveValue<PaletteColors>;
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

// Component Style Prop
export type BoxStyleProps = BackgroundColorProps &
  OpacityProps &
  VisibleProps &
  LayoutProps &
  SpacingProps &
  BorderProps &
  ShadowProps &
  PositionProps;

export type TextStyleProps = ColorProps &
  BackgroundColorProps &
  OpacityProps &
  VisibleProps &
  LayoutProps &
  TypographyProps &
  SpacingProps &
  TextShadowProps;
