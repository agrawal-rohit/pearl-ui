import React from "react";
import Box from "./Box";
import renderer from "react-test-renderer";
import { ThemeProvider } from "../../themeContext";

jest.useFakeTimers();

describe("<Box />", () => {
  it("exists", () => {
    const tree = renderer
      .create(
        <ThemeProvider>
          <Box>asdasd</Box>
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
