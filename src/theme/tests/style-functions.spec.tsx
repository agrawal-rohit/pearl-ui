import React from "react";
import { StyleFunctionContainer } from "../src/types";
import {
  borderColorProperties,
  borderProperties,
} from "../src/style-properties";
import { getKeys, getNestedObject } from "../utils/type-helpers";
import { baseTheme } from "../src/base/index";
import { Dimensions, Text } from "react-native";
import {
  backgroundColorStyleFunction,
  borderStyleFunction,
  colorStyleFunction,
  layoutStyleFunction,
  opacityStyleFunction,
  positionStyleFunction,
  shadowStyleFunction,
  spacingStyleFunction,
  textShadowStyleFunction,
  typographyStyleFunction,
} from "../src/style-functions";
import { render } from "@testing-library/react-native";

jest.useFakeTimers();

type ColorTransformTestComponentProps = {
  props: object;
  stylePropertyName: string;
  styleFunction: StyleFunctionContainer;
};

const ColorTransformTestComponent: React.FC<
  ColorTransformTestComponentProps
> = ({ props, stylePropertyName, styleFunction }) => {
  let value;
  try {
    value = styleFunction.func(props, {
      theme: baseTheme,
      dimensions: Dimensions.get("window"),
    });
  } catch (e) {
    value = (e as any).message;
  }

  if (typeof value === "object") {
    return <Text testID={stylePropertyName}>{value[stylePropertyName]}</Text>;
  }

  return <Text testID="Error">{value}</Text>;
};

describe("createStyleFunctions", () => {
  it("maps backgroundColor prop correctly", () => {
    const { getByText } = render(
      <ColorTransformTestComponent
        props={{ backgroundColor: "white" }}
        stylePropertyName="backgroundColor"
        styleFunction={backgroundColorStyleFunction[0]}
      />
    );

    const targetBackgroundColor = baseTheme["palette"].white as string;
    expect(getByText(targetBackgroundColor)).toBeTruthy();
  });

  it("maps bg prop correctly", () => {
    const { getByText } = render(
      <ColorTransformTestComponent
        props={{ bgColor: "white" }}
        stylePropertyName="backgroundColor"
        styleFunction={backgroundColorStyleFunction[1]}
      />
    );

    const targetBackgroundColor = baseTheme["palette"].white as string;
    expect(getByText(targetBackgroundColor)).toBeTruthy();
  });

  it("maps color prop correctly", () => {
    const { getByText } = render(
      <ColorTransformTestComponent
        props={{ color: "white" }}
        stylePropertyName="color"
        styleFunction={colorStyleFunction}
      />
    );

    const targetColor = baseTheme["palette"].white as string;
    expect(getByText(targetColor)).toBeTruthy();
  });

  it("maps oapcity prop correctly", () => {
    const props = { opacity: 0 };
    const opacityStyle = opacityStyleFunction.func(props, {
      theme: baseTheme,
      dimensions: Dimensions.get("window"),
    });

    expect(opacityStyle.opacity).toBe(0);
  });

  it("maps typography props correctly", () => {
    const props = { fontSize: "s" };
    const fontSizeStyle = typographyStyleFunction[
      typographyStyleFunction.length - 2
    ].func(props, {
      theme: baseTheme,
      dimensions: Dimensions.get("window"),
    });

    expect(fontSizeStyle.fontSize).toBe(14);

    const props2 = { lineHeight: "s" };
    const lineHeightStyle = typographyStyleFunction[
      typographyStyleFunction.length - 1
    ].func(props2, {
      theme: baseTheme,
      dimensions: Dimensions.get("window"),
    });

    expect(lineHeightStyle.lineHeight).toBe(18);

    const props3 = { fontFamily: "body" };
    const fontFamilyStyle = typographyStyleFunction[
      typographyStyleFunction.length - 4
    ].func(props3, {
      theme: baseTheme,
      dimensions: Dimensions.get("window"),
    });

    expect(fontFamilyStyle.fontFamily).toBe("Poppins");

    const props4 = { fontWeight: "hairline" };
    const fontWeightStyle = typographyStyleFunction[
      typographyStyleFunction.length - 3
    ].func(props4, {
      theme: baseTheme,
      dimensions: Dimensions.get("window"),
    });

    expect(fontWeightStyle.fontWeight).toBe("100");

    const props5 = { letterSpacing: "xs" };
    const letterSpacingStyle = typographyStyleFunction[
      typographyStyleFunction.length - 5
    ].func(props5, {
      theme: baseTheme,
      dimensions: Dimensions.get("window"),
    });

    expect(letterSpacingStyle.letterSpacing).toBe(-2);
  });

  it("maps layout props correctly", () => {
    const props = { width: 2 };
    const widthStyle = layoutStyleFunction[0].func(props, {
      theme: baseTheme,
      dimensions: Dimensions.get("window"),
    });

    expect(widthStyle.width).toBe(2);
  });

  it("maps spacing props correctly", () => {
    const props1 = { margin: "2" };
    const spacingStyle1 = spacingStyleFunction[0].func(props1, {
      theme: baseTheme,
      dimensions: Dimensions.get("window"),
    });

    const props2 = { m: "2" };
    const spacingStyle2 = spacingStyleFunction[
      spacingStyleFunction.length - 18
    ].func(props2, {
      theme: baseTheme,
      dimensions: Dimensions.get("window"),
    });

    expect(spacingStyle1.margin).toBe(baseTheme.spacing[2]);
    expect(spacingStyle2.margin).toBe(baseTheme.spacing[2]);
  });

  it("maps position props correctly", () => {
    const props = { zIndex: "docked" };
    const zIndexStyle = positionStyleFunction[
      positionStyleFunction.length - 1
    ].func(props, {
      theme: baseTheme,
      dimensions: Dimensions.get("window"),
    });

    expect(zIndexStyle.zIndex).toBe(baseTheme.zIndices.docked);
  });

  it("maps border props correctly", () => {
    const { getByText } = render(
      <ColorTransformTestComponent
        props={{ borderColor: "black" }}
        stylePropertyName="borderColor"
        styleFunction={borderStyleFunction[getKeys(borderProperties).length]}
      />
    );

    const targetBorderColor = baseTheme["palette"].black as string;
    expect(getByText(targetBorderColor)).toBeTruthy();

    const borderRadiusProps = { borderRadius: "s" };
    const borderRadiusStyle = borderStyleFunction[
      getKeys(borderProperties).length + getKeys(borderColorProperties).length
    ].func(borderRadiusProps, {
      theme: baseTheme,
      dimensions: Dimensions.get("window"),
    });

    expect(borderRadiusStyle.borderRadius).toBe(baseTheme.borderRadii.s);
  });

  it("maps shadow props correctly", () => {
    const props = { boxShadow: "s" };
    const shadowStyle = shadowStyleFunction[
      shadowStyleFunction.length - 2
    ].func(props, {
      theme: baseTheme,
      dimensions: Dimensions.get("window"),
    });

    expect(shadowStyle).toBe(baseTheme.elevation.s);

    const { getByText } = render(
      <ColorTransformTestComponent
        props={{ shadowColor: "neutral.600" }}
        stylePropertyName="shadowColor"
        styleFunction={shadowStyleFunction[shadowStyleFunction.length - 1]}
      />
    );

    const targetShadowColor = getNestedObject(baseTheme, [
      "palette",
      "neutral",
      "600",
    ]) as string;
    expect(getByText(targetShadowColor)).toBeTruthy();
  });

  it("maps textShadow props correctly", () => {
    const { getByText } = render(
      <ColorTransformTestComponent
        props={{ textShadowColor: "black" }}
        stylePropertyName="textShadowColor"
        styleFunction={
          textShadowStyleFunction[textShadowStyleFunction.length - 1]
        }
      />
    );

    const targetTextShadowColor = baseTheme["palette"].black as string;
    expect(getByText(targetTextShadowColor)).toBeTruthy();
  });
});
