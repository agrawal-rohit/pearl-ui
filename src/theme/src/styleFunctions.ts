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
import { IBasePearlTheme, RestyleFunction, RNStyleProperty } from "./types";

export type StyleTransformFunction<TVal> = (params: {
  value: TVal | undefined | null;
}) => TVal | undefined | null;

const createRestyleFunction = <
  Theme extends IBasePearlTheme = IBasePearlTheme,
  TProps extends Record<string, any> = Record<string, any>,
  P extends keyof TProps = keyof TProps,
  K extends keyof Theme | undefined = undefined,
  S extends RNStyleProperty = RNStyleProperty
>({
  property,
  transform,
  styleProperty,
  themeKey,
}: {
  property: P;
  transform?: StyleTransformFunction<TProps[P]>;
  styleProperty?: S;
  themeKey?: K;
}) => {
  const styleProp = styleProperty || property.toString();

  const func: RestyleFunction<TProps, Theme> = (props, theme) => {
    let value = props[property];
    if (transform) {
      value = transform({ value: value }) as TProps[P];
    }
    if (isThemeKey(theme, themeKey)) {
      if (value && theme[themeKey][value] === undefined)
        throw new Error(
          `Value '${value}' does not exist in theme['${themeKey}']`
        );

      return value ? theme[themeKey][value] : value;
    }

    if (value === undefined) return {};

    return {
      [styleProp]: value,
    } as { [key in S | P]?: typeof value };
  };

  return {
    property,
    themeKey,
    variant: false,
    func,
  };
};

export const backgroundColor = [
  createRestyleFunction({
    property: "backgroundColor",
    themeKey: "colors",
  }),
  createRestyleFunction({
    property: "bg",
    styleProperty: "backgroundColor",
    themeKey: "colors",
  }),
];

export const color = createRestyleFunction({
  property: "color",
  themeKey: "colors",
});

export const opacity = createRestyleFunction({
  property: "opacity",
});

export const visible = createRestyleFunction({
  property: "visible",
  styleProperty: "display",
  transform: ({ value }) => (value === false ? "none" : "flex"),
});

export const typography = getKeys(typographyProperties).map((property) => {
  return createRestyleFunction({
    property,
  });
});

export const layout = getKeys(layoutProperties).map((property) => {
  return createRestyleFunction({
    property,
  });
});

export const spacing = [
  ...getKeys(spacingProperties).map((property) => {
    return createRestyleFunction({
      property,
      themeKey: "spacing",
    });
  }),

  ...getKeys(spacingPropertiesShorthand).map((property) => {
    const styleProperty = spacingPropertiesShorthand[
      property
    ] as RNStyleProperty;

    return createRestyleFunction({
      property,
      styleProperty,
      themeKey: "spacing",
    });
  }),
];

export const position = [
  ...getKeys(positionProperties).map((property) => {
    return createRestyleFunction({
      property,
    });
  }),
  createRestyleFunction({
    property: "zIndex",
    themeKey: "zIndices",
  }),
];

export const border = [
  ...getKeys(borderProperties).map((property) => {
    return createRestyleFunction({
      property,
    });
  }),
  ...getKeys(borderColorProperties).map((property) => {
    return createRestyleFunction({
      property,
      themeKey: "colors",
    });
  }),
  ...getKeys(borderRadiusProperties).map((property) => {
    return createRestyleFunction({
      property,
      themeKey: "borderRadii",
    });
  }),
];

export const shadow = [
  ...getKeys(shadowProperties).map((property) => {
    return createRestyleFunction({
      property,
    });
  }),
  createRestyleFunction({
    property: "shadowColor",
    themeKey: "colors",
  }),
];

export const textShadow = [
  ...getKeys(textShadowProperties).map((property) => {
    return createRestyleFunction({
      property,
    });
  }),
  createRestyleFunction({
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
export interface ColorProps<Theme extends IBasePearlTheme> {
  color?: keyof Theme["colors"];
}
export interface OpacityProps {
  opacity?: number;
}

export interface VisibleProps {
  visible?: boolean;
}

export interface BackgroundColorProps<Theme extends IBasePearlTheme> {
  backgroundColor?: keyof Theme["colors"];
  bg?: keyof Theme["colors"];
}

type SpacingPropsBase<Theme extends IBasePearlTheme> = {
  [Key in keyof typeof spacingProperties]?: keyof Theme["spacing"];
};

type SpacingShorthandProps<Theme extends IBasePearlTheme> = {
  [Key in keyof typeof spacingPropertiesShorthand]?: keyof Theme["spacing"];
};

export type SpacingProps<
  Theme extends IBasePearlTheme
> = SpacingPropsBase<Theme> & SpacingShorthandProps<Theme>;

export type TypographyProps = {
  [Key in keyof typeof typographyProperties]?: TextStyle[Key];
};

export type LayoutProps = {
  [Key in keyof typeof layoutProperties]?: FlexStyle[Key];
};

export type PositionProps<Theme extends IBasePearlTheme> = {
  [Key in keyof typeof positionProperties]?: FlexStyle[Key];
} & {
  zIndex?: Theme["zIndices"] extends {} ? keyof Theme["zIndices"] : number;
};

export type BorderProps<Theme extends IBasePearlTheme> = {
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

export type ShadowProps<Theme extends IBasePearlTheme> = {
  [Key in keyof typeof shadowProperties]?: ViewStyle[Key];
} & {
  shadowColor?: keyof Theme["colors"];
};

export type TextShadowProps<Theme extends IBasePearlTheme> = {
  [Key in keyof typeof textShadowProperties]?: TextStyle[Key];
} & {
  textShadowColor?: keyof Theme["colors"];
};

export type AllProps<
  Theme extends IBasePearlTheme
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
