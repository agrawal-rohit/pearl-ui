import { render } from "@testing-library/react-native";
import React from "react";
import renderer from "react-test-renderer";
import { ThemeProvider } from "../../../theme/src/themeContext";
import Box from "../Box/Box";
import Stack from "../Stack/Stack";
import Spinner from "./Spinner";

jest.useFakeTimers();

describe("Atoms/Spinner", () => {
  it("passes the snapshot test for different sizes", () => {
    const tree = render(
      <ThemeProvider>
        <Spinner size="s" />
        <Spinner size="m" />
        <Spinner size="l" />
        <Spinner size="xl" />
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("passes the snapshot test for different variants", () => {
    const tree = render(
      <ThemeProvider>
        <Spinner variant="activity" />
        <Spinner variant="ball" />
        <Spinner variant="bar" />
        <Spinner variant="dot" />
        <Spinner variant="pacman" />
        <Spinner variant="pulse" />
        <Spinner variant="skype" />
        <Spinner variant="spinner" />
        <Spinner variant="wave" />
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("passes the snapshot test for different color schemes", () => {
    const tree = render(
      <ThemeProvider>
        <Spinner colorScheme="primary" />
        <Spinner colorScheme="success" />
        <Spinner colorScheme="warning" />
        <Spinner colorScheme="info" />
        <Spinner colorScheme="danger" />
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("passes the snapshot test if the spinner is expanded or not", () => {
    const tree = render(
      <ThemeProvider>
        <Stack direction="vertical" spacing="l">
          <Box w={200} h={100} backgroundColor="neutral.200">
            <Spinner />
          </Box>

          <Box w={200} h={100} backgroundColor="neutral.200">
            <Spinner isExpanded />
          </Box>
        </Stack>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("doesn't render when not loading", () => {
    const tree = renderer
      .create(
        <ThemeProvider>
          <Spinner isLoading={false} />
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toBe(null);
  });

  it("renders when loading", () => {
    let comp;
    renderer.act(() => {
      comp = renderer.create(
        <ThemeProvider>
          <Spinner />
        </ThemeProvider>
      );
    });
    const tree = (comp as any).toJSON();
    expect(tree.children.length).toBe(1);
  });
});
