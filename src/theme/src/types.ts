import { ViewStyle, TextStyle, ImageStyle } from "react-native";

export type SafeVariants<T> = Omit<T, keyof BasePearlTheme>;

interface ComponentConfig {
  basestyle?: {
    [key: string]: any;
  };
  sizes?: {
    [key: string]: any;
  };
  variants?: {
    [key: string]: any;
  };
  defaults: {
    size?: string;
    variant?: string;
  };
}

export interface BasePearlTheme {
  colors: {
    [key: string]: string;
  };
  spacing: {
    [key: string]: number;
  };
  typography: {
    [key: string]: any;
  };
  components: {
    [key: string]: ComponentConfig;
  };
  zIndices?: {
    [key: string]: number;
  };
  borderRadii?: {
    [key: string]: number;
  };
}

// Style Functions
export interface StyleFunctionContainer<
  TProps extends Record<string, any>,
  Theme extends BasePearlTheme = BasePearlTheme,
  P extends keyof TProps = keyof TProps,
  K extends keyof Theme | undefined = keyof Theme | undefined
> {
  property: P;
  themeKey: K | undefined;
  variant: boolean;
  func: StyleFunction<TProps, Theme>;
}

export type StyleFunction<
  TProps extends Record<string, any> = Record<string, any>,
  Theme extends BasePearlTheme = BasePearlTheme,
  S extends keyof any = string
> = (
  props: TProps,
  theme: Theme
) => {
  [key in S]?: any;
};

// Styles
export type RNStyle = ViewStyle | TextStyle | ImageStyle;

export type RNStyleProperty =
  | keyof ViewStyle
  | keyof TextStyle
  | keyof ImageStyle;

export type PropValue = string | number | undefined | null;
