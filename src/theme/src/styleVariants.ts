import { BasePearlTheme, SafeVariants } from "./types";
import composeStyleProps from "./composeStyleProps";
import { all, createStyleFunction } from "./styleFunctions";

const allStyleFunctions = composeStyleProps(all);

export const createTextVariants = () => {
  const property: any = "variant";
  const themeKey = "typography";
  const styleFunction = createStyleFunction({
    property,
    themeKey,
  });
  const func = (props: any, theme: any) => {
    const expandedProps = styleFunction.func(props, theme)[property];

    const variantDefaults = theme[themeKey] ? theme[themeKey].defaults : {};

    if (!expandedProps && !variantDefaults) return {};
    return allStyleFunctions.buildStyle(
      { ...variantDefaults, ...expandedProps },
      theme
    );
  };
  return {
    property,
    themeKey,
    variant: true,
    func,
  };
};

export type ComponentVariantProps<
  Theme extends BasePearlTheme,
  K extends keyof Theme["components"]["variants"]
> = {
  variant?: keyof Theme["components"]["variants"][K];
};
