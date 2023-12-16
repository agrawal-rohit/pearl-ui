import React from "react";
import { render } from "@testing-library/react-native";
import { ThemeProvider } from "../../../theme/src/theme-context";
import Icon from "./icon";

jest.useFakeTimers();

describe("Atoms/Icon", () => {
  it("passes the snapshot test in light mode", () => {
    const tree = render(
      <ThemeProvider>
        <Icon iconFamily="AntDesign" iconName="stepforward" />
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("passes the snapshot test in dark mode", () => {
    const tree = render(
      <ThemeProvider>
        <Icon iconFamily="AntDesign" iconName="stepforward" />
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("passes the snapshot test when overriden", () => {
    const tree = render(
      <ThemeProvider>
        <Icon
          iconFamily="AntDesign"
          iconName="stepforward"
          color="primary.500"
        />
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
