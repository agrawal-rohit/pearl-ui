import React from "react";
import { render } from "@testing-library/react-native";
import { ThemeProvider } from "../../../theme/src/theme-context";
import Spacer from "./spacer";
import Box from "../box/box";
import Text from "../text/text";

jest.useFakeTimers();

describe("Atoms/Spacer", () => {
  it("passes the snapshot test", () => {
    const tree = render(
      <ThemeProvider>
        <Box flexDirection="row">
          <Box p="l" bgColor="danger.400">
            <Text>Box 1</Text>
          </Box>
          <Spacer />
          <Box p="l" bgColor="success.400">
            <Text>Box 2</Text>
          </Box>
        </Box>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
