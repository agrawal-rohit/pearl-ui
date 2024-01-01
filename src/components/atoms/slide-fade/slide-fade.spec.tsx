import React from "react";
import { render } from "@testing-library/react-native";
import SlideFade from "./slide-fade";
import Text from "../text/text";
import { ThemeProvider } from "../../../theme/src/theme-context";

jest.useFakeTimers();

describe("Atoms/SlideFade", () => {
  it("passes the snapshot test when show is true", () => {
    const tree = render(
      <ThemeProvider>
        <SlideFade show={true}>
          <Text>This is a test</Text>
        </SlideFade>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("passes the snapshot test when show is false", () => {
    const tree = render(
      <ThemeProvider>
        <SlideFade show={false}>
          <Text>This is a test</Text>
        </SlideFade>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("passes the snapshot test when offsetX is set", () => {
    const tree = render(
      <ThemeProvider>
        <SlideFade show={true} offsetX={10}>
          <Text>This is a test</Text>
        </SlideFade>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("passes the snapshot test when offsetY is set", () => {
    const tree = render(
      <ThemeProvider>
        <SlideFade show={true} offsetY={20}>
          <Text>This is a test</Text>
        </SlideFade>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
