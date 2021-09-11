import React from "react";
import { render } from "@testing-library/react-native";
import { ThemeProvider } from "../../../theme/themeContext";
import Center from "./Center";

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
