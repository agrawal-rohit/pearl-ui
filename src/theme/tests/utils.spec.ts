import { generateTintsandShades } from "../utils/utils";

jest.useFakeTimers();

describe("generateTintsandShades", () => {
  it("works as expected for odd number of shades", () => {
    const generatedShades = generateTintsandShades("#6a7bff", "test", 7);

    expect(Object.keys(generatedShades).length).toEqual(7);
    expect(Object.keys(generatedShades)[0].includes("test")).toBeTruthy();
    expect(Object.keys(generatedShades)[0].includes("100")).toBeTruthy();
    expect(
      Object.keys(generatedShades)[
        Object.keys(generatedShades).length - 1
      ].includes("700")
    ).toBeTruthy();
  });

  it("works as expected for even number of shades", () => {
    const generatedShades = generateTintsandShades("#6a7bff", "test", 4);

    expect(Object.keys(generatedShades).length).toEqual(4);
    expect(Object.keys(generatedShades)[0].includes("test")).toBeTruthy();
    expect(Object.keys(generatedShades)[0].includes("100")).toBeTruthy();
    expect(
      Object.keys(generatedShades)[
        Object.keys(generatedShades).length - 1
      ].includes("400")
    ).toBeTruthy();
  });
});
