import responsiveSize from "../../responsive-size";

jest.useFakeTimers();

jest.mock("react-native", () => ({
  PixelRatio: {
    get: jest.fn(() => 3.2),
  },
  Dimensions: {
    get: jest.fn(() => ({ width: 400, height: 700, scale: 1, fontScale: 1 })),
  },
}));

describe("responsiveSize", () => {
  beforeAll(() => {
    jest.resetModules();
  });

  it("resizes size correctly for special case androids", () => {
    const initialSize = 10;

    const scaledSize = responsiveSize(initialSize);
    expect(scaledSize).toEqual(12);
  });
});
