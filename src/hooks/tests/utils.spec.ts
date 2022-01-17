import { baseTheme } from "./../../theme/src/base/index";
import composeStyleProps from "../../theme/src/composeStyleProps";
import {
  backgroundColorStyleFunction,
  layoutStyleFunction,
  positionStyleFunction,
} from "../../theme/src/styleFunctions";
import { StyleFunctionContainer } from "../../theme/src/types";
import { buildFinalStyleProps, checkKeyAvailability } from "../utils/utils";

jest.useFakeTimers();

describe("checkKeyAvailability", () => {
  it("passes when key exists", () => {
    const testObj = {
      a: 1,
    };

    checkKeyAvailability("a", testObj, "testObj");
    // Pass test if above expression doesn't throw anything.
    expect(true).toBe(true);
  });

  it("throws an error when key doesn't exist", () => {
    const testObj = {
      a: 1,
    };

    try {
      checkKeyAvailability("b", testObj, "testObj");
      // Fail test if above expression doesn't throw anything.
      expect(true).toBe(false);
    } catch (e) {
      expect(e.message).toContain("does not exist in");
      expect(e.message).toContain("b");
      expect(e.message).toContain("testObj");
    }
  });
});
