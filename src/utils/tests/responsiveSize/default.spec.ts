import responsiveSize from "../../responsiveSize";

jest.useFakeTimers();

jest.mock("react-native/Libraries/Utilities/PixelRatio", () => {
  return {
    get: jest.fn(() => {
      return 1;
    }),
  };
});

jest.mock("react-native/Libraries/Utilities/Dimensions", () => {
  return {
    get: jest.fn(() => {
      return { width: 400, height: 600 };
    }),
  };
});

describe("responsiveSize", () => {
  beforeAll(() => {
    jest.resetModules();
  });

  it("returns 0 for empty size", () => {
    const scaledSize = responsiveSize(null);
    expect(scaledSize).toEqual(0);
  });

  it("returns the size itself by default", () => {
    const initialSize = 10;
    const scaledSize = responsiveSize(initialSize);
    expect(scaledSize).toEqual(initialSize);
  });
});
