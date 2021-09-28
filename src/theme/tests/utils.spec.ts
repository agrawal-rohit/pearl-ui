import { generatePalette } from "../utils/utils";

jest.useFakeTimers();

describe("generatePalette", () => {
  it("works as expected for odd number of shades", () => {
    const label = "test";
    const generatedShades = generatePalette("#6a7bff", label, 7);

    expect(generatedShades.hasOwnProperty(label)).toBeTruthy();
    expect(Object.keys(generatedShades[label]).length).toEqual(7);
    expect(Object.keys(generatedShades[label])[0].includes("100")).toBeTruthy();
    expect(
      Object.keys(generatedShades[label])[
        Object.keys(generatedShades[label]).length - 1
      ].includes("700")
    ).toBeTruthy();
  });

  it("works as expected for even number of shades", () => {
    const label = "test";
    const generatedShades = generatePalette("#6a7bff", label, 4);

    expect(generatedShades.hasOwnProperty(label)).toBeTruthy();
    expect(Object.keys(generatedShades[label]).length).toEqual(4);
    expect(Object.keys(generatedShades[label])[0].includes("100")).toBeTruthy();
    expect(
      Object.keys(generatedShades[label])[
        Object.keys(generatedShades[label]).length - 1
      ].includes("400")
    ).toBeTruthy();
  });
});
