import React from "react";
import { render } from "@testing-library/react-native";
import Stack, { HStack, VStack, ZStack } from "./stack";
import { ThemeProvider } from "../../../theme/src/theme-context";
import Divider from "../divider/divider";
import Box from "../box/box";

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

describe("Atoms/HStack", () => {
  it("passes the snapshot test", () => {
    const tree = render(
      <ThemeProvider>
        <HStack spacing="l" divider={<Divider />}>
          <Box w={20} h={100} backgroundColor="primary.500" />
          <Box w={20} h={20} backgroundColor="primary.500" />
          <Box w={20} h={20} backgroundColor="primary.500" />
          <Box w={20} h={20} backgroundColor="primary.500" />
        </HStack>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Atoms/VStack", () => {
  it("passes the snapshot test", () => {
    const tree = render(
      <ThemeProvider>
        <VStack spacing="l" divider={<Divider />}>
          <Box w={20} h={100} backgroundColor="primary.500" />
          <Box w={20} h={20} backgroundColor="primary.500" />
          <Box w={20} h={20} backgroundColor="primary.500" />
          <Box w={20} h={20} backgroundColor="primary.500" />
        </VStack>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Atoms/ZStack", () => {
  it("passes the snapshot test", () => {
    const tree = render(
      <ThemeProvider>
        <ZStack>
          <Box w={100} h={100} backgroundColor="primary.500" />
          <Box w={50} h={50} backgroundColor="neutral.500" />
          <Box w={20} h={20} backgroundColor="danger.500" />
        </ZStack>

        <ZStack mt="xl" reversed>
          <Box w={100} h={100} backgroundColor="primary.500" />
          <Box w={50} h={50} backgroundColor="neutral.500" />
          <Box w={20} h={20} backgroundColor="danger.500" />
        </ZStack>

        <ZStack mt="xl">
          <Box w={100} h={100} backgroundColor="primary.500" />
          <Box w={50} h={50} zIndex="docked" backgroundColor="neutral.500" />
          <Box w={20} h={20} backgroundColor="danger.500" />
        </ZStack>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
