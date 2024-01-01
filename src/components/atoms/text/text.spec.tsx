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

  it("should render text with different font sizes", () => {
    const component = render(
      <ThemeProvider>
        <Text fontSize={20}>Hi I am a text</Text>
      </ThemeProvider>
    );
    expect(component.queryByText("Hi I am a text")).toBeTruthy();
  });

  it("should render text with different font weights", () => {
    const component = render(
      <ThemeProvider>
        <Text fontWeight="bold">Hi I am a text</Text>
      </ThemeProvider>
    );
    expect(component.queryByText("Hi I am a text")).toBeTruthy();
  });

  it("should render text with different font styles", () => {
    const component = render(
      <ThemeProvider>
        <Text fontStyle="italic">Hi I am a text</Text>
      </ThemeProvider>
    );
    expect(component.queryByText("Hi I am a text")).toBeTruthy();
  });
});
