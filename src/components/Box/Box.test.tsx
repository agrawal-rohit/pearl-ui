import React from "react";
import Box from "./Box";
import { ThemeProvider } from "../../themeContext";
import { render } from "@testing-library/react-native";

jest.useFakeTimers();

describe("<Box />", () => {
  it("exists", () => {
    const tree = render(
      <ThemeProvider>
        <Box>asdasd</Box>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
