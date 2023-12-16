import responsiveSize from "../../responsive-size";

jest.useFakeTimers();

jest.mock("react-native", () => ({
  PixelRatio: {
    get: jest.fn(() => 2),
  },
  Dimensions: {
    get: jest.fn(() => ({ width: 320, height: 568, scale: 2, fontScale: 1 })),
  },
}));

describe("responsiveSize", () => {
  beforeAll(() => {
    jest.resetModules();
  });

  it("resizes size correctly for iphone 5", () => {
    const initialSize = 10;

    const scaledSize = responsiveSize(initialSize);
    expect(scaledSize).toEqual(9.5);
  });
});
