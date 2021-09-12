import React from "react";
import { render } from "@testing-library/react-native";
import Center from "./Center";
import { ThemeProvider } from "../../../theme/src/themeContext";

jest.useFakeTimers();

describe("Atoms/Center", () => {
  it("passes the snapshot test", () => {
    const tree = render(
      <ThemeProvider>
        <Center>This is centered</Center>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
