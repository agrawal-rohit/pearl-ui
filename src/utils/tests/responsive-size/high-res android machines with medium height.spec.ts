import responsiveSize from "../../responsive-size";

jest.useFakeTimers();

jest.mock("react-native/Libraries/Utilities/PixelRatio", () => {
  return {
    get: jest.fn(() => {
      return 4;
    }),
  };
});

jest.mock("react-native/Libraries/Utilities/Dimensions", () => {
  return {
    get: jest.fn(() => {
      return { width: 400, height: 700 };
    }),
  };
});

describe("responsiveSize", () => {
  beforeAll(() => {
    jest.resetModules();
  });

  it("resizes size correctly for high-res android machines with medium height", () => {
    const initialSize = 10;

    const scaledSize = responsiveSize(initialSize);
    expect(scaledSize).toEqual(12.5);
  });
});
