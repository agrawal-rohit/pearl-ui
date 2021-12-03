import { ViewStyle, TextStyle, ImageStyle, ColorValue } from "react-native";

export type AtLeastOneResponsiveValue<
  TVal extends PropValue = PropValue,
  R = { [Key in keyof FinalPearlTheme["breakpoints"]]: Record<Key, TVal> }
> = Partial<{
  [K in keyof FinalPearlTheme["breakpoints"]]: TVal;
}> &
  R[keyof R];

export type ResponsiveValue<TVal extends PropValue> =
  | TVal
  | AtLeastOneResponsiveValue<TVal>;

export interface TypographyConfig {
  baseStyle:
    | TextStyle
    | {
        color?: ColorModeColor | ColorValue;
      };
  variants: {
    [key: string]:
      | TextStyle
      | {
          color?: ColorModeColor | ColorValue;
        };
  };
  defaults: {
    variant?: string;
  };
}

export interface ElevationConfig {
  shadowColor: ColorModeColor | ColorValue;
  shadowOffset: {
    width: number;
    height: number;
  };
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
}

export interface ColorPalette {
  [key: string]: {
    [key: number]: string;
  };
}

export interface AtomicComponentConfig {
  baseStyle: {
    [key: string]: any;
  };
  sizes?: {
    [key: string]: any;
  };
  variants?: {
    [key: string]: any;
  };
  defaults?: {
    size?: string;
    variant?: string;
  };
}

export interface MolecularComponentConfig {
  parts: string[];
  baseStyle: {
    [key: string]: {
      [key: string]: any;
    };
  };
  sizes?: {
    [key: string]: {
      [key: string]: any;
    };
  };
  variants?: {
    [key: string]: {
      [key: string]: any;
    };
  };
  defaults?: {
    size?: string;
    variant?: string;
  };
}

export type ColorModeColor = {
  light: ColorValue;
  dark: ColorValue;
};

export type FontConfig = {
  [key: string]: {
    [key: string]: {
      [key: string]: string;
    };
  };
};

export type Breakpoint = number | Dimensions;

export interface Dimensions {
  width: number;
  height: number;
}

export interface BasePearlTheme {
  palette: {
    [key: string]: string | ColorPalette;
  };
  spacing: {
    [key: string]: number | string;
  };
  components: {
    [key: string]: AtomicComponentConfig | MolecularComponentConfig;
  };
  fonts: {
    [key: string]: string;
  };
  fontConfig: FontConfig;
  fontSizes: {
    [key: string]: number;
  };
  lineHeights: {
    [key: string]: number;
  };
  fontWeights: {
    [key: string]: string;
  };
  elevation: {
    [key: string]: ElevationConfig;
  };
  zIndices: {
    [key: string]: number;
  };
  borderRadii: {
    [key: string]: number | string;
  };
  breakpoints: {
    [key: string]: Breakpoint;
  };
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CustomPearlTheme {}

export interface FinalPearlTheme
  extends Omit<BasePearlTheme, keyof CustomPearlTheme>,
    CustomPearlTheme {}

// Style Functions
export interface StyleFunctionContainer {
  property: string;
  themeKey?: keyof FinalPearlTheme | undefined | undefined;
  func: StyleFunction;
}

export type StyleFunction = (
  props: Record<string, any>,
  {
    theme,
    dimensions,
  }: {
    theme: FinalPearlTheme;
    dimensions: Dimensions;
  }
) => {
  [key: string]: any;
};

export type StyleTransformFunction = (params: {
  value: PropValue | undefined | null;
  theme: FinalPearlTheme;
  themeKey?: keyof FinalPearlTheme | undefined;
}) => PropValue | undefined | null;

// Styles
export type RNStyle = ViewStyle | TextStyle | ImageStyle;

export type RNStyleProperty =
  | keyof ViewStyle
  | keyof TextStyle
  | keyof ImageStyle;

export type PropValue = string | number | undefined | boolean | null | object;
