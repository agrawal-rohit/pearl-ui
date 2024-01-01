import React from "react";
import Box from "./box";
import Text from "../text/text";
import { render } from "@testing-library/react-native";
import { ThemeProvider } from "../../../theme/src/theme-context";

jest.useFakeTimers();

describe("Atoms/Box", () => {
  it("passes the basic snapshot test", () => {
    const tree = render(
      <ThemeProvider>
        <Box w={10} h={10} />
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders the correct text", () => {
    const { getByText } = render(
      <ThemeProvider>
        <Box>
          <Text>Test Text</Text>
        </Box>
      </ThemeProvider>
    );
    expect(getByText("Test Text")).toBeTruthy();
  });

  it("renders correctly with different props", () => {
    const tree = render(
      <ThemeProvider>
        <Box bgColor="red">Test Text</Box>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
