import React from "react";
import Text from "./text";
import { render } from "@testing-library/react-native";
import { ThemeProvider } from "../../../theme/src/theme-context";

jest.useFakeTimers();

describe("Atoms/Text", () => {
  it("passes the snapshot test", () => {
    const component = render(
      <ThemeProvider>
        <Text>Hi I am a text</Text>
      </ThemeProvider>
    );
    expect(component).toMatchSnapshot();
  });

  it("should render text passed to children", () => {
    const component = render(
      <ThemeProvider>
        <Text>Hi I am a text</Text>
      </ThemeProvider>
    );
    expect(component.queryByText("Hi I am a text")).toBeTruthy();
  });
});
