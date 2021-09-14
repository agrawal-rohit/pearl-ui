import { ViewStyle, TextStyle, ImageStyle } from "react-native";

export type SafeVariants<T> = Omit<T, keyof IBasePearlTheme>;

export interface IBasePearlTheme {
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
    [key: string]: any;
  };
  zIndices?: {
    [key: string]: number;
  };
  borderRadii?: {
    [key: string]: number;
  };
}

// Style Functions
export interface RestyleFunctionContainer<
  TProps extends Record<string, any>,
  Theme extends IBasePearlTheme = IBasePearlTheme,
  P extends keyof TProps = keyof TProps,
  K extends keyof Theme | undefined = keyof Theme | undefined
> {
  property: P;
  themeKey: K | undefined;
  variant: boolean;
  func: RestyleFunction<TProps, Theme>;
}

export type RestyleFunction<
  TProps extends Record<string, any> = Record<string, any>,
  Theme extends IBasePearlTheme = IBasePearlTheme,
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
