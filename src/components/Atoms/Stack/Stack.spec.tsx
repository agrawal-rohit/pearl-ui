import React from "react";
import { render } from "@testing-library/react-native";
import Stack from "./Stack";
import { ThemeProvider } from "../../../theme/src/themeContext";
import Divider from "../Divider/Divider";
import Box from "../Box/Box";

jest.useFakeTimers();

describe("Atoms/Stack", () => {
  it("passes the snapshot test for horizontal direction", () => {
    const tree = render(
      <ThemeProvider>
        <Stack direction="horizontal" spacing="l" divider={<Divider />}>
          <Box w={20} h={100} backgroundColor="primary.500" />
          <Box w={20} h={20} backgroundColor="primary.500" />
          <Box w={20} h={20} backgroundColor="primary.500" />
          <Box w={20} h={20} backgroundColor="primary.500" />
        </Stack>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("passes the snapshot test for vertical direction", () => {
    const tree = render(
      <ThemeProvider>
        <Stack mt="l" direction="vertical" spacing="l" divider={<Divider />}>
          <Box w={100} h={20} backgroundColor="primary.500" />
          <Box w="40%" h={20} backgroundColor="primary.500" />
          <Box w={20} h={20} backgroundColor="primary.500" />
          <Box w={20} h={20} backgroundColor="primary.500" />
        </Stack>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
