import React from "react";
import Box from "./box";
import { render } from "@testing-library/react-native";
import { ThemeProvider } from "../../../theme/src/theme-context";

jest.useFakeTimers();

describe("Atoms/Box", () => {
  it("passes the basic snapshot test", () => {
    const tree = render(
      <ThemeProvider>
        <Box>asdasd</Box>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
