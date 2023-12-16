import responsiveSize from "../../responsive-size";

jest.useFakeTimers();

jest.mock("react-native", () => ({
  PixelRatio: {
    get: jest.fn(() => 3.2),
  },
  Dimensions: {
    get: jest.fn(() => ({ width: 400, height: 600, scale: 1, fontScale: 1 })),
  },
}));

describe("responsiveSize", () => {
  beforeAll(() => {
    jest.resetModules();
  });

  it("resizes size correctly for weird android sizes", () => {
    const initialSize = 10;

    const scaledSize = responsiveSize(initialSize);
    expect(scaledSize).toEqual(11.5);
  });
});
