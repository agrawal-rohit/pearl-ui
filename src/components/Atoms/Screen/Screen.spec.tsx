import React from "react";
import Screen from "./Screen";
import { render } from "@testing-library/react-native";
import { ThemeProvider } from "../../../theme/src/themeContext";

jest.useFakeTimers();

jest.mock("react-native-keyboard-aware-scroll-view", () => {
  const KeyboardAwareScrollView = ({ children }: { children: any }) => children;
  return { KeyboardAwareScrollView };
});

describe("Atoms/Screen", () => {
  it("passes the snapshot test", () => {
    const tree = render(
      <ThemeProvider>
        <Screen></Screen>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
