import React from "react";
import Screen from "./Screen";
import { render } from "@testing-library/react-native";
import { ThemeProvider } from "../../../themeContext";

jest.useFakeTimers();

describe("Atoms/Screen", () => {
  it("passes the snapshot test", () => {
    const tree = render(
      <ThemeProvider>
        <Screen>asdasd</Screen>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
