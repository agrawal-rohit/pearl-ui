import { StyleFunctionContainer } from "../src/types";
import {
  backgroundColorStyleFunction,
  layoutStyleFunction,
  positionStyleFunction,
} from "./../src/style-functions";
import { composeStyleProps } from "../../hooks/utils/utils";

jest.useFakeTimers();

describe("composeStyleProps", () => {
  it("composes properties from style functions correctly", () => {
    const props = {
      bgColor: "red",
      p: "1.5",
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
      "bgColor",
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
