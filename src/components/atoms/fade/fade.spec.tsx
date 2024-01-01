import React from "react";
import { render } from "@testing-library/react-native";
import Fade from "./fade";
import Text from "../text/text";
import { ThemeProvider } from "../../../theme/src/theme-context";

jest.useFakeTimers();

describe("Atoms/Fade", () => {
  it("passes the snapshot test when show is true", () => {
    const tree = render(
      <ThemeProvider>
        <Fade show={true}>
          <Text>This is a test</Text>
        </Fade>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("passes the snapshot test when show is false", () => {
    const tree = render(
      <ThemeProvider>
        <Fade show={false}>
          <Text>This is a test</Text>
        </Fade>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
