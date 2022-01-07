import React from "react";
import { render } from "@testing-library/react-native";
import { ThemeProvider } from "../../../theme/src/themeContext";
import Spacer from "./Spacer";
import Box from "../Box/Box";
import Text from "../Text/Text";

jest.useFakeTimers();

describe("Atoms/Spacer", () => {
  it("passes the snapshot test", () => {
    const tree = render(
      <ThemeProvider>
        <Box flexDirection="row">
          <Box p="l" bg="danger.400">
            <Text>Box 1</Text>
          </Box>
          <Spacer />
          <Box p="l" bg="success.400">
            <Text>Box 2</Text>
          </Box>
        </Box>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
