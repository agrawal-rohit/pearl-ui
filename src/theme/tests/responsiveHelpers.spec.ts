import { breakpoints } from "./../src/base/breakpoints";
import { baseTheme } from "./../src/base/index";
import {
  getValueForScreenSize,
  isResponsiveObjectValue,
} from "../src/responsiveHelpers";

jest.useFakeTimers();

describe("isResponsiveObjectValue", () => {
  it("returns false for a regular object", () => {
    const object = {
      bgColor: "red",
      p: "xs",
    };

    const result = isResponsiveObjectValue(object, baseTheme);
    expect(result).toBe(false);
  });

  it("returns true for a responsive object", () => {
    const object = {
      phone: {
        bgColor: "red",
        p: "xs",
      },
      tablet: {
        bgColor: "pink",
        p: "l",
      },
    };

    const result = isResponsiveObjectValue(object, baseTheme);
    expect(result).toBe(true);
  });
});

describe("getValueForScreenSize", () => {
  const object = {
    phone: {
      bgColor: "red",
      p: "xs",
    },
    longPhone: {
      bgColor: "navy",
      p: "m",
    },
    tablet: {
      bgColor: "pink",
      p: "l",
    },
  };

  const breakpoints = {
    phone: 0,
    longPhone: {
      width: 0,
      height: 812,
    },
    tablet: 768,
  };

  it("returns correct value for phone", () => {
    const dimensions = {
      width: 200,
      height: 300,
    };

    const result = getValueForScreenSize({
      responsiveValue: object,
      breakpoints,
      dimensions,
    });
    expect(result).toMatchObject({
      bgColor: "red",
      p: "xs",
    });
  });

  it("returns correct value for long phone", () => {
    const dimensions = {
      width: 200,
      height: 900,
    };

    const result = getValueForScreenSize({
      responsiveValue: object,
      breakpoints,
      dimensions,
    });
    expect(result).toMatchObject({
      bgColor: "navy",
      p: "m",
    });
  });

  it("returns correct value for tablet", () => {
    const dimensions = {
      width: 800,
      height: 1000,
    };

    const result = getValueForScreenSize({
      responsiveValue: object,
      breakpoints,
      dimensions,
    });
    expect(result).toMatchObject({
      bgColor: "pink",
      p: "l",
    });
  });
});
