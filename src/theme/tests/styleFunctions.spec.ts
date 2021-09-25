import {
  borderColorProperties,
  borderProperties,
} from "../src/styleProperties";
import { getKeys } from "../utils/typeHelpers";
import { baseTheme } from "../src/basetheme";
import {
  backgroundColor,
  border,
  color,
  layout,
  opacity,
  position,
  shadow,
  spacing,
  textShadow,
  typography,
} from "../src/styleFunctions";

jest.useFakeTimers();

describe("createStyleFunctions", () => {
  it("maps backgroundColor props correctly", () => {
    const props1 = { backgroundColor: "white" };
    const bgStyle1 = backgroundColor[0].func(props1, baseTheme);

    const props2 = { bg: "white" };
    const bgStyle2 = backgroundColor[1].func(props2, baseTheme);

    const wrongProp = { backgroundColor: "wrongColor" };

    expect(bgStyle1.backgroundColor).toBe(
      baseTheme[backgroundColor[0].themeKey].white
    );
    expect(bgStyle2.backgroundColor).toBe(
      baseTheme[backgroundColor[1].themeKey].white
    );
    try {
      const generateStyle = backgroundColor[0].func(wrongProp, baseTheme);
      // Fail test if above expression doesn't throw anything.
      expect(true).toBe(false);
    } catch (e) {
      expect(e.message).toContain("does not exist in theme");
    }
  });

  it("maps color prop correctly", () => {
    const props = { color: "white" };
    const colorStyle = color.func(props, baseTheme);

    expect(colorStyle.color).toBe(baseTheme[color.themeKey].white);
  });

  it("maps oapcity prop correctly", () => {
    const props = { opacity: 0 };
    const opacityStyle = opacity.func(props, baseTheme);

    expect(opacityStyle.opacity).toBe(0);
  });

  it("maps typography props correctly", () => {
    const props = { fontSize: 2 };
    const fontSizeStyle = typography[1].func(props, baseTheme);

    expect(fontSizeStyle.fontSize).toBe(2);
  });

  it("maps layout props correctly", () => {
    const props = { width: 2 };
    const widthStyle = layout[0].func(props, baseTheme);

    expect(widthStyle.width).toBe(2);
  });

  it("maps spacing props correctly", () => {
    const props1 = { margin: "s" };
    const spacingStyle1 = spacing[0].func(props1, baseTheme);

    const props2 = { m: "s" };
    const spacingStyle2 = spacing[spacing.length - 18].func(props2, baseTheme);

    expect(spacingStyle1.margin).toBe(baseTheme[spacing[0].themeKey].s);
    expect(spacingStyle2.margin).toBe(
      baseTheme[spacing[spacing.length - 18].themeKey].s
    );
  });

  it("maps position props correctly", () => {
    const props = { zIndex: "docked" };
    const zIndexStyle = position[position.length - 1].func(props, baseTheme);

    expect(zIndexStyle.zIndex).toBe(
      baseTheme[position[position.length - 1].themeKey].docked
    );
  });

  it("maps border props correctly", () => {
    const borderColorProps = { borderColor: "black" };
    const borderColorStyle = border[getKeys(borderProperties).length].func(
      borderColorProps,
      baseTheme
    );

    const borderRadiusProps = { borderRadius: "s" };
    const borderRadiusStyle = border[
      getKeys(borderProperties).length + getKeys(borderColorProperties).length
    ].func(borderRadiusProps, baseTheme);

    expect(borderColorStyle.borderColor).toBe(
      baseTheme[border[getKeys(borderProperties).length].themeKey].black
    );

    expect(borderRadiusStyle.borderRadius).toBe(
      baseTheme[
        border[
          getKeys(borderProperties).length +
            getKeys(borderColorProperties).length
        ].themeKey
      ].s
    );
  });

  it("maps shadow props correctly", () => {
    const props = { boxShadow: "s" };
    const shadowStyle = shadow[shadow.length - 2].func(props, baseTheme);

    expect(shadowStyle).toBe(baseTheme[shadow[shadow.length - 2].themeKey].s);

    const shadowColor = { shadowColor: shadowStyle.shadowColor };
    const shadowColorStyle = shadow[shadow.length - 1].func(
      shadowColor,
      baseTheme
    );

    expect(shadowColorStyle.shadowColor).toBe(
      baseTheme[shadow[shadow.length - 1].themeKey][shadowStyle.shadowColor]
    );
  });

  it("maps textShadow props correctly", () => {
    const props = { textShadowColor: "black" };
    const textShadowColorStyle = textShadow[textShadow.length - 1].func(
      props,
      baseTheme
    );

    expect(textShadowColorStyle.textShadowColor).toBe(
      baseTheme[textShadow[textShadow.length - 1].themeKey].black
    );
  });
});
