import { baseTheme } from "../src/basetheme";
import { createTheme, extendTheme } from "../src/themeFunctions";

jest.useFakeTimers();

describe("themeFunctions", () => {
  it("enforces type using createTheme", () => {
    const tempTheme = {
      palette: {},
      spacing: {},
      components: {},
      elevation: {},
      zIndices: {},
      borderRadii: {},
    };

    const finalTheme = createTheme(tempTheme);

    expect(typeof finalTheme).toBe(typeof baseTheme);
  });

  it("returns combined theme using extendTheme", () => {
    const userTheme = {
      palette: {
        "custom-color": "#321321",
      },
      spacing: {
        "custom-xxxl": 23,
      },
    };

    const combinedTheme = extendTheme(userTheme);

    expect(typeof combinedTheme).toBe(typeof baseTheme);
    expect(combinedTheme.palette.hasOwnProperty("custom-color")).toBe(true);
    expect(combinedTheme.palette.hasOwnProperty("primary-100")).toBe(true);
    expect(combinedTheme.spacing.hasOwnProperty("custom-xxxl")).toBe(true);
    expect(combinedTheme.spacing.hasOwnProperty("s")).toBe(true);
  });
});
