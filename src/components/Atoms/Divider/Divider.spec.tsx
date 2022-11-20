import React from "react";
import { render } from "@testing-library/react-native";
import Divider from "./Divider";
import { ThemeProvider } from "../../../theme/src/themeContext";

jest.useFakeTimers();

describe("Atoms/Divider", () => {
  it("passes the snapshot test in light mode", () => {
    const tree = render(
      <ThemeProvider>
        <Divider orientation="horizontal" />
        <Divider orientation="vertical" />
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("passes the snapshot test in dark mode", () => {
    const tree = render(
      <ThemeProvider initialColorMode="dark">
        <Divider orientation="horizontal" />
        <Divider orientation="vertical" />
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("passes the snapshot test for different length modes", () => {
    const tree = render(
      <ThemeProvider initialColorMode="dark">
        <Divider length="50%" />
        <Divider orientation="vertical" length={20} bgColor="violet" />
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
