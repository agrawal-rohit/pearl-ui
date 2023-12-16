import responsiveSize from "../../responsive-size";

jest.useFakeTimers();

jest.mock("react-native", () => ({
  PixelRatio: {
    get: jest.fn(() => 2),
  },
  Dimensions: {
    get: jest.fn(() => ({ width: 375, height: 667, scale: 2, fontScale: 1 })),
  },
}));

describe("responsiveSize", () => {
  beforeAll(() => {
    jest.resetModules();
  });

  it("resizes size correctly for iphone 6s", () => {
    const initialSize = 10;

    const scaledSize = responsiveSize(initialSize);
    expect(scaledSize).toEqual(11.5);
  });
});
