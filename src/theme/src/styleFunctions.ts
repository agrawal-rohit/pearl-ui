import { FlexStyle, TextStyle, ViewStyle } from "react-native";
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
import { BasePearlTheme } from "./types";

export const createStyleFunction = ({
  property,
  transform,
  styleProperty,
  themeKey,
}: any) => {
  const styleProp = styleProperty || property.toString();

  const func = (props: any, theme: any) => {
    // Initial value is the raw prop value
    let value = props[property];

    // Transform the value if transformation function exists
    if (transform) {
      value = transform({ value: value });
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

    return {
      [styleProp]: value,
    };
  };

  return {
    property,
    themeKey,
    variant: false,
    func,
  };
};

export const backgroundColor = [
  createStyleFunction({
    property: "backgroundColor",
    themeKey: "colors",
  }),
  createStyleFunction({
    property: "bg",
    styleProperty: "backgroundColor",
    themeKey: "colors",
  }),
];

export const color = createStyleFunction({
  property: "color",
  themeKey: "colors",
});

export const opacity = createStyleFunction({
  property: "opacity",
});

export const visible = createStyleFunction({
  property: "visible",
  styleProperty: "display",
  transform: ({ value }: any) => (value === false ? "none" : "flex"),
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
      themeKey: "colors",
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
  ...getKeys(shadowProperties).map((property) => {
    return createStyleFunction({
      property,
    });
  }),
  createStyleFunction({
    property: "shadowColor",
    themeKey: "colors",
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
    themeKey: "colors",
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
export interface ColorProps<Theme extends BasePearlTheme> {
  color?: keyof Theme["colors"];
}
export interface OpacityProps {
  opacity?: number;
}

export interface VisibleProps {
  visible?: boolean;
}

export interface BackgroundColorProps<Theme extends BasePearlTheme> {
  backgroundColor?: keyof Theme["colors"];
  bg?: keyof Theme["colors"];
}

const a: keyof BasePearlTheme["spacing"] = "a";

type SpacingPropsBase<Theme extends BasePearlTheme> = {
  [Key in keyof typeof spacingProperties]?: keyof Theme["spacing"];
};

type SpacingShorthandProps<Theme extends BasePearlTheme> = {
  [Key in keyof typeof spacingPropertiesShorthand]?: keyof Theme["spacing"];
};

export type SpacingProps<
  Theme extends BasePearlTheme
> = SpacingPropsBase<Theme> & SpacingShorthandProps<Theme>;

export type TypographyProps = {
  [Key in keyof typeof typographyProperties]?: TextStyle[Key];
};

export type LayoutProps = {
  [Key in keyof typeof layoutProperties]?: FlexStyle[Key];
};

export type PositionProps<Theme extends BasePearlTheme> = {
  [Key in keyof typeof positionProperties]?: FlexStyle[Key];
} & {
  zIndex?: Theme["zIndices"] extends {} ? keyof Theme["zIndices"] : number;
};

export type BorderProps<Theme extends BasePearlTheme> = {
  [Key in keyof typeof borderProperties]?: ViewStyle[Key];
} &
  {
    [Key in keyof typeof borderColorProperties]?: keyof Theme["colors"];
  } &
  {
    [Key in keyof typeof borderRadiusProperties]?: Theme["borderRadii"] extends {}
      ? keyof Theme["borderRadii"]
      : number;
  };

export type ShadowProps<Theme extends BasePearlTheme> = {
  [Key in keyof typeof shadowProperties]?: ViewStyle[Key];
} & {
  shadowColor?: keyof Theme["colors"];
};

export type TextShadowProps<Theme extends BasePearlTheme> = {
  [Key in keyof typeof textShadowProperties]?: TextStyle[Key];
} & {
  textShadowColor?: keyof Theme["colors"];
};

export type AllProps<
  Theme extends BasePearlTheme
> = BackgroundColorProps<Theme> &
  ColorProps<Theme> &
  OpacityProps &
  SpacingProps<Theme> &
  TypographyProps &
  LayoutProps &
  PositionProps<Theme> &
  BorderProps<Theme> &
  ShadowProps<Theme> &
  TextShadowProps<Theme>;
