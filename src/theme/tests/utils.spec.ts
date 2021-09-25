import { generatePalette } from "../utils/utils";

jest.useFakeTimers();

describe("generatePalette", () => {
  it("works as expected for odd number of shades", () => {
    const generatedShades = generatePalette("#6a7bff", "test", 7);

    expect(Object.keys(generatedShades).length).toEqual(7);
    expect(Object.keys(generatedShades)[0].includes("test-100")).toBeTruthy();
    expect(
      Object.keys(generatedShades)[
        Object.keys(generatedShades).length - 1
      ].includes("700")
    ).toBeTruthy();
  });

  it("works as expected for even number of shades", () => {
    const generatedShades = generatePalette("#6a7bff", "test", 4);

    expect(Object.keys(generatedShades).length).toEqual(4);
    expect(Object.keys(generatedShades)[0].includes("test-100")).toBeTruthy();
    expect(
      Object.keys(generatedShades)[
        Object.keys(generatedShades).length - 1
      ].includes("400")
    ).toBeTruthy();
  });
});
