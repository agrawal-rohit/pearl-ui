import React from "react";
import Box from "./Box";
import { render } from "@testing-library/react-native";
import { ThemeProvider } from "../../../themeContext";

jest.useFakeTimers();

describe("Atoms/Box", () => {
  it("exists", () => {
    const tree = render(
      <ThemeProvider>
        <Box>asdasd</Box>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
