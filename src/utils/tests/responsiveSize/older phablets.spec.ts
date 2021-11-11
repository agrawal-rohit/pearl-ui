import responsiveSize from "../../responsiveSize";

jest.useFakeTimers();

jest.mock("react-native/Libraries/Utilities/PixelRatio", () => {
  return {
    get: jest.fn(() => {
      return 2.5;
    }),
  };
});

jest.mock("react-native/Libraries/Utilities/Dimensions", () => {
  return {
    get: jest.fn(() => {
      return { width: 400, height: 800 };
    }),
  };
});

describe("responsiveSize", () => {
  beforeAll(() => {
    jest.resetModules();
  });

  it("resizes size correctly for older phablets", () => {
    const initialSize = 10;

    const scaledSize = responsiveSize(initialSize);
    expect(scaledSize).toEqual(11.5);
  });
});
