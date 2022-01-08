// Theme functions
export { extendTheme } from "./src/base/index";

// Style functions
export {
  colorStyleFunction,
  opacityStyleFunction,
  backgroundColorStyleFunction,
  spacingStyleFunction,
  typographyStyleFunction,
  layoutStyleFunction,
  positionStyleFunction,
  borderStyleFunction,
  shadowStyleFunction,
  textShadowStyleFunction,
  boxStyleFunctions,
  textStyleFunctions,
} from "./src/styleFunctions";

// Theme Context
export { ThemeProvider } from "./src/themeContext";
export { baseTheme } from "./src/base/index";

// Utils
export { generatePalette } from "./utils/utils";

// Types
export type {
  ResponsiveValue,
  AtomicComponentConfig,
  MolecularComponentConfig,
  CustomPearlTheme,
  FinalPearlTheme,
  PaletteColors,
  ComponentSizes,
  ComponentVariants,
  ColorScheme,
  StyleFunctionContainer,
} from "./src/types";
export type {
  AllProps,
  BackgroundColorProps,
  ColorProps,
  OpacityProps,
  SpacingProps,
  TypographyProps,
  LayoutProps,
  PositionProps,
  BorderProps,
  ShadowProps,
  TextShadowProps,
} from "./src/styleFunctions";
