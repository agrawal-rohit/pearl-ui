import { ViewStyle, TextStyle, ImageStyle } from "react-native";

export type ResponsiveValue<Value, Theme extends BaseTheme> =
  | Value
  | { [Key in keyof Theme["breakpoints"]]?: Value };

export interface BaseTheme {
  colors: {
    [key: string]: string;
  };
  spacing: {
    [key: string]: number;
  };
  breakpoints: {
    [key: string]: Breakpoint;
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

export type Breakpoint = number | Dimensions;

export interface Dimensions {
  width: number;
  height: number;
}

export type RNStyle = ViewStyle | TextStyle | ImageStyle;

export type RNStyleProperty =
  | keyof ViewStyle
  | keyof TextStyle
  | keyof ImageStyle;

export type PropValue = string | number | undefined | null;
