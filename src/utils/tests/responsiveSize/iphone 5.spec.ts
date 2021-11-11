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
      return { width: 400, height: 600 };
    }),
  };
});

describe("responsiveSize", () => {
  beforeAll(() => {
    jest.resetModules();
  });

  it("resizes size correctly for iphone 5", () => {
    const initialSize = 10;

    const scaledSize = responsiveSize(initialSize);
    expect(scaledSize).toEqual(10);
  });
});
