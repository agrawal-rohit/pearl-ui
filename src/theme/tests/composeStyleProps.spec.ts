import { StyleFunctionContainer } from "./../src/types";
import {
  backgroundColorStyleFunction,
  layoutStyleFunction,
  positionStyleFunction,
} from "./../src/styleFunctions";
import composeStyleProps from "../src/composeStyleProps";

jest.useFakeTimers();

describe("composeStyleProps", () => {
  it("composes properties from style functions correctly", () => {
    const props = {
      bg: "red",
      p: "xs",
      zIndex: "base",
      position: "absolute",
    };

    const styleFunctions = [
      ...backgroundColorStyleFunction,
      layoutStyleFunction,
      positionStyleFunction,
    ] as StyleFunctionContainer[];

    const composed = composeStyleProps(styleFunctions);

    const expectedProperties = [
      "backgroundColor",
      "bg",
      "width",
      "height",
      "minWidth",
      "maxWidth",
      "minHeight",
      "maxHeight",
      "overflow",
      "aspectRatio",
      "alignContent",
      "alignItems",
      "alignSelf",
      "justifyContent",
      "flex",
      "flexBasis",
      "flexDirection",
      "flexGrow",
      "flexShrink",
      "flexWrap",
      "w",
      "h",
      "minW",
      "maxW",
      "minH",
      "maxH",
      "position",
      "top",
      "right",
      "bottom",
      "left",
      "start",
      "end",
      "zIndex",
    ];

    expect(composed.properties).toMatchObject(expectedProperties);
    expect(typeof composed.buildStyle).toBe("function");
  });
});
