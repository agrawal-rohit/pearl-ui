import React from "react";
import { render } from "@testing-library/react-native";
import ScaleFade from "./scale-fade";
import Text from "../text/text";
import { ThemeProvider } from "../../../theme/src/theme-context";

jest.useFakeTimers();

describe("Atoms/ScaleFade", () => {
  it("passes the snapshot test when show is true", () => {
    const tree = render(
      <ThemeProvider>
        <ScaleFade show={true}>
          <Text>This is a test</Text>
        </ScaleFade>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("passes the snapshot test when show is false", () => {
    const tree = render(
      <ThemeProvider>
        <ScaleFade show={false}>
          <Text>This is a test</Text>
        </ScaleFade>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("passes the snapshot test when initialScale is set", () => {
    const tree = render(
      <ThemeProvider>
        <ScaleFade show={true} initialScale={0.5}>
          <Text>This is a test</Text>
        </ScaleFade>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
