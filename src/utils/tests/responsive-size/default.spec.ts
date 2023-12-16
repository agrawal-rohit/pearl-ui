import responsiveSize from "../../responsive-size";

jest.useFakeTimers();

jest.mock("react-native", () => ({
  PixelRatio: {
    get: jest.fn(() => 1),
  },
  Dimensions: {
    get: jest.fn(() => ({ width: 400, height: 600, scale: 1, fontScale: 1 })),
  },
}));

describe("responsiveSize", () => {
  beforeAll(() => {
    jest.resetModules();
  });

  it("returns 0 for empty size", () => {
    const scaledSize = responsiveSize();
    expect(scaledSize).toBe(0);
  });

  it("returns the size itself by default", () => {
    const initialSize = 10;
    const scaledSize = responsiveSize(initialSize);
    expect(scaledSize).toBe(initialSize);
  });
});
