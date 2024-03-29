import { render } from "@testing-library/react-native";
import React from "react";
import renderer from "react-test-renderer";
import { ThemeProvider } from "../../../theme/src/theme-context";
import Box from "../box/box";
import Stack from "../stack/stack";
import Spinner from "./spinner";
import Indicator from "./indicators/indicator";

jest.useFakeTimers();

describe("Atoms/Spinner", () => {
  it("passes the snapshot test for different sizes", () => {
    const tree = render(
      <ThemeProvider>
        <Spinner size="xs" />
        <Spinner size="s" />
        <Spinner size="m" />
        <Spinner size="l" />
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

    expect((tree as any).children).toBe(null);
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

describe("Atoms/Indicator", () => {
  it("passes the snapshot test for different animation durations", () => {
    const tree = render(
      <ThemeProvider>
        <Indicator animationDuration={500} />
        <Indicator animationDuration={1000} />
        <Indicator animationDuration={1500} />
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("passes the snapshot test for different counts", () => {
    const tree = render(
      <ThemeProvider>
        <Indicator count={1} />
        <Indicator count={2} />
        <Indicator count={3} />
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
