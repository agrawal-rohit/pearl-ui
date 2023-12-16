import responsiveSize from "../../responsive-size";

jest.useFakeTimers();

jest.mock("react-native", () => ({
  PixelRatio: {
    get: jest.fn(() => 4),
  },
  Dimensions: {
    get: jest.fn(() => ({ width: 400, height: 800, scale: 1, fontScale: 1 })),
  },
}));

describe("responsiveSize", () => {
  beforeAll(() => {
    jest.resetModules();
  });

  it("resizes size correctly for large phablets", () => {
    const initialSize = 10;

    const scaledSize = responsiveSize(initialSize);
    expect(scaledSize).toEqual(14);
  });
});
