import { baseTheme, extendTheme } from "./base/index";
import { ViewStyle, TextStyle, ImageStyle, ColorValue } from "react-native";
import {
  MotiTransitionProp,
  StyleValueWithReplacedTransforms,
  StyleValueWithSequenceArrays,
  UseAnimationState,
} from "moti";
import { SharedValue } from "react-native-reanimated";
import { BoxStyleProps } from "./styleFunctions";

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
    [key: string]:
      | AtomicComponentConfig
      | Omit<MolecularComponentConfig, "parts">;
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

export type PropValue =
  | string
  | number
  | undefined
  | boolean
  | null
  | object
  | symbol;

// Sizes and Variants
export type ComponentTypeProps<
  ComponentName extends keyof FinalPearlTheme["components"],
  ComponentType extends "basic" | "atom" | "molecule" = "basic"
> = ComponentType extends "basic"
  ? {}
  : {
      size?: ResponsiveValue<ComponentSizes<ComponentName>>;
      variant?: ResponsiveValue<ComponentVariants<ComponentName>>;
    };

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

// TODO: Add Atom and Molecule Component Prop Types

// Component Types
export type BasicComponentProps<
  ComponentProps,
  StyleProps = BoxStyleProps
> = PearlComponent<ComponentProps, StyleProps>;

export type AtomComponentProps<
  ComponentName extends keyof FinalPearlTheme["components"],
  ComponentProps,
  StyleProps = BoxStyleProps
> = PearlComponent<ComponentProps, StyleProps> & {
  size?: ResponsiveValue<ComponentSizes<ComponentName>>;
  variant?: ResponsiveValue<ComponentVariants<ComponentName>>;
};

export type PearlComponent<
  ComponentProps,
  StyleProps = BoxStyleProps
> = StyleProps &
  MotiWithPearlStyleProps<ViewStyle, StyleProps> &
  Omit<
    ComponentProps,
    keyof StyleProps & MotiWithPearlStyleProps<ViewStyle, StyleProps>
  > & {
    colorScheme?: ColorScheme;
  };

// MOTI RELATED PROPS
type OrSharedValue<T> = T | SharedValue<T>;

export type MotiWithPearlStyleProps<NativeComponentStyle, ComponentStyleProps> =
  {
    from?:
      | (Omit<
          StyleValueWithSequenceArrays<
            StyleValueWithReplacedTransforms<NativeComponentStyle>
          >,
          keyof NativeComponentStyle
        > &
          Omit<NativeComponentStyle, keyof ComponentStyleProps> &
          ComponentStyleProps)
      | boolean;

    animate?: OrSharedValue<
      Omit<
        StyleValueWithSequenceArrays<
          StyleValueWithReplacedTransforms<NativeComponentStyle>
        >,
        keyof NativeComponentStyle
      > &
        Omit<NativeComponentStyle, keyof ComponentStyleProps> &
        ComponentStyleProps
    >;
    exit?:
      | (Omit<
          StyleValueWithReplacedTransforms<NativeComponentStyle>,
          keyof NativeComponentStyle
        > &
          Omit<NativeComponentStyle, keyof ComponentStyleProps> &
          ComponentStyleProps)
      | boolean
      | ((
          custom?: any
        ) => Omit<
          StyleValueWithReplacedTransforms<NativeComponentStyle>,
          keyof NativeComponentStyle
        > &
          Omit<NativeComponentStyle, keyof ComponentStyleProps> &
          ComponentStyleProps);
    transition?: MotiTransitionProp<
      Omit<
        StyleValueWithReplacedTransforms<NativeComponentStyle>,
        keyof NativeComponentStyle
      > &
        Omit<NativeComponentStyle, keyof ComponentStyleProps> &
        ComponentStyleProps
    >;
    exitTransition?: MotiTransitionProp<
      Omit<
        StyleValueWithReplacedTransforms<NativeComponentStyle>,
        keyof NativeComponentStyle
      > &
        Omit<NativeComponentStyle, keyof ComponentStyleProps> &
        ComponentStyleProps
    >;
    state?: Pick<UseAnimationState<any>, "__state">;
  };
