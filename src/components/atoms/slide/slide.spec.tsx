import React from "react";
import { render } from "@testing-library/react-native";
import Slide from "./slide";
import Text from "../text/text";
import { ThemeProvider } from "../../../theme/src/theme-context";

jest.useFakeTimers();

describe("Atoms/Slide", () => {
  it("passes the snapshot test when show is true", () => {
    const tree = render(
      <ThemeProvider>
        <Slide show={true}>
          <Text>This is a test</Text>
        </Slide>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("passes the snapshot test when show is false", () => {
    const tree = render(
      <ThemeProvider>
        <Slide show={false}>
          <Text>This is a test</Text>
        </Slide>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("passes the snapshot test when direction is set", () => {
    const tree = render(
      <ThemeProvider>
        <Slide show={true} direction="left">
          <Text>This is a test</Text>
        </Slide>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
