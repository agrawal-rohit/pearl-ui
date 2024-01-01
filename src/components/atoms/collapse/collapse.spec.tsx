import React from "react";
import { render } from "@testing-library/react-native";
import Collapse from "./collapse";
import Text from "../text/text";
import { ThemeProvider } from "../../../theme/src/theme-context";

jest.useFakeTimers();

describe("Atoms/Collapse", () => {
  it("passes the snapshot test when show is true", () => {
    const tree = render(
      <ThemeProvider>
        <Collapse show={true}>
          <Text>This is a test</Text>
        </Collapse>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("passes the snapshot test when show is false", () => {
    const tree = render(
      <ThemeProvider>
        <Collapse show={false}>
          <Text>This is a test</Text>
        </Collapse>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
