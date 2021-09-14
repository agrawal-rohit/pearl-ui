import { IBasePearlTheme, SafeVariants } from "./types";
import composeStyleProps from "./composeStyleProps";
import { all, createStyleFunction } from "./styleFunctions";

const allRestyleFunctions = composeStyleProps(all);

// With Custom Prop Name
function createVariant(params: {
  property: any;
  themeKey: any;
  defaults?: any;
}): any;

// Without Custom Prop Name
function createVariant(params: { themeKey: any; defaults?: any }): any;

function createVariant({ property = "variant", themeKey, defaults }: any) {
  const styleFunction = createStyleFunction({
    property,
    themeKey,
  });
  const func = (props: any, theme: any) => {
    const expandedProps = styleFunction.func(props, theme)[property];

    const variantDefaults = theme[themeKey] ? theme[themeKey].defaults : {};

    if (!expandedProps && !defaults && !variantDefaults) return {};
    return allRestyleFunctions.buildStyle(
      { ...defaults, ...variantDefaults, ...expandedProps },
      theme
    );
  };
  return {
    property,
    themeKey,
    variant: true,
    func,
  };
}

export type VariantProps<
  Theme extends IBasePearlTheme,
  K extends keyof Theme,
  Property extends keyof any = "variant"
> = {
  [key in Property]?: keyof Omit<Theme[K], "defaults">;
};

export default createVariant;
