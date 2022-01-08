import { baseTheme, extendTheme } from "./base/index";
import { ViewStyle, TextStyle, ImageStyle, ColorValue } from "react-native";
import {
  MotiTransitionProp,
  StyleValueWithReplacedTransforms,
  StyleValueWithSequenceArrays,
} from "moti";
import { SharedValue } from "react-native-reanimated";

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
  [key: number]: string;
}

export interface AtomicComponentConfig<
  PropTypes extends Record<string, any> = Record<string, any>
> {
  baseStyle: Partial<Omit<PropTypes, "size" | "variant">>;
  sizes?: Partial<Omit<PropTypes, "size" | "variant">>;
  variants?: Partial<Omit<PropTypes, "size" | "variant">>;
  defaults?: {
    size?: string;
    variant?: string;
  };
}

export interface MolecularComponentConfig<
  PropTypes extends Record<string, any> = Record<string, any>
> {
  parts: string[];
  baseStyle: {
    [key: string]: Partial<Omit<PropTypes, "size" | "variant">>;
  };
  sizes?: {
    [key: string]: Partial<Omit<PropTypes, "size" | "variant">>;
  };
  variants?: {
    [key: string]: Partial<Omit<PropTypes, "size" | "variant">>;
  };
  defaults?: {
    size?: string;
    variant?: string;
  };
}

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

export interface ThemeSkeleton {
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
  letterSpacings: {
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
  extends Omit<ThemeSkeleton, keyof CustomPearlTheme>,
    CustomPearlTheme {}

// Palette
type KeysWithValsOfType<T, V> = keyof {
  [P in keyof T as T[P] extends V ? P : never]: P;
};

export type ColorScheme = FinalPearlTheme["components"] extends { Spinner: any }
  ? KeysWithValsOfType<FinalPearlTheme["palette"], object>
  : string;

type a = {
  [C in ColorScheme]: `${C}.${Extract<
    keyof FinalPearlTheme["palette"][C],
    string | number
  >}`;
};

export type ExpandedColors = FinalPearlTheme["components"] extends {
  Spinner: any;
}
  ? KeysWithValsOfType<FinalPearlTheme["palette"], string> | a[keyof a]
  : keyof FinalPearlTheme["palette"];

export type ColorModeColor = {
  light: ExpandedColors;
  dark: ExpandedColors;
};

export type PaletteColors = ExpandedColors | ColorModeColor;

// Sizes and Variants
export type ComponentSizes<
  ComponentName extends keyof FinalPearlTheme["components"]
> = FinalPearlTheme["components"][ComponentName] extends
  | MolecularComponentConfig
  | AtomicComponentConfig
  ? FinalPearlTheme["components"][ComponentName]["sizes"] extends object
    ? keyof FinalPearlTheme["components"][ComponentName]["sizes"]
    : string
  : string;

export type ComponentVariants<
  ComponentName extends keyof FinalPearlTheme["components"]
> = FinalPearlTheme["components"][ComponentName] extends
  | MolecularComponentConfig
  | AtomicComponentConfig
  ? FinalPearlTheme["components"][ComponentName]["variants"] extends object
    ? keyof FinalPearlTheme["components"][ComponentName]["variants"]
    : string
  : string;

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

// MOTI RELATED PROPS
type OrSharedValue<T> = T | SharedValue<T>;

export type MotiWithPearlStyleProps<NativeComponent, ComponentStyleProps> = {
  from?:
    | (Omit<
        StyleValueWithSequenceArrays<
          StyleValueWithReplacedTransforms<ViewStyle>
        >,
        keyof NativeComponent
      > &
        Omit<NativeComponent, keyof ComponentStyleProps> &
        ComponentStyleProps)
    | boolean;

  animate?: OrSharedValue<
    Omit<
      StyleValueWithSequenceArrays<StyleValueWithReplacedTransforms<ViewStyle>>,
      keyof NativeComponent
    > &
      Omit<NativeComponent, keyof ComponentStyleProps> &
      ComponentStyleProps
  >;
  exit?:
    | (Omit<
        StyleValueWithReplacedTransforms<ViewStyle>,
        keyof NativeComponent
      > &
        Omit<NativeComponent, keyof ComponentStyleProps> &
        ComponentStyleProps)
    | boolean
    | ((
        custom?: any
      ) => Omit<
        StyleValueWithReplacedTransforms<ViewStyle>,
        keyof NativeComponent
      > &
        Omit<NativeComponent, keyof ComponentStyleProps> &
        ComponentStyleProps);
  transition?: MotiTransitionProp<
    Omit<StyleValueWithReplacedTransforms<ViewStyle>, keyof NativeComponent> &
      Omit<NativeComponent, keyof ComponentStyleProps> &
      ComponentStyleProps
  >;
  exitTransition?: MotiTransitionProp<
    Omit<StyleValueWithReplacedTransforms<ViewStyle>, keyof NativeComponent> &
      Omit<NativeComponent, keyof ComponentStyleProps> &
      ComponentStyleProps
  >;
};
