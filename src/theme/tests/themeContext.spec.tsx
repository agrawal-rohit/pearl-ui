import React from "react";
import Text from "../../components/Atoms/Text/Text";
import { render, fireEvent } from "@testing-library/react-native";
import { ThemeProvider } from "../src/themeContext";
import Box from "../../components/Atoms/Box/Box";
import Button from "../../components/Molecules/Button/Button";
import { useTheme } from "../../hooks/useTheme";

jest.useFakeTimers();

const ThemeTestComponent: React.FC = () => {
  const { colorMode, toggleColorMode } = useTheme();

  return (
    <Box>
      <Text>{colorMode}</Text>;
      <Button onPress={toggleColorMode}>Toggle mode</Button>
    </Box>
  );
};

describe("Theme Context", () => {
  it("initially loads the light theme", () => {
    const { getByText } = render(
      <ThemeProvider>
        <ThemeTestComponent />
      </ThemeProvider>
    );
    expect(getByText("light")).toBeTruthy();
  });

  it("loads the dark theme when overriden", () => {
    const { getByText } = render(
      <ThemeProvider defaultColorMode="dark">
        <ThemeTestComponent />
      </ThemeProvider>
    );

    expect(getByText("dark")).toBeTruthy();
  });

  it("loads the theme automatically based on the system theme", () => {
    const { getByText } = render(
      <ThemeProvider defaultColorMode="system">
        <ThemeTestComponent />
      </ThemeProvider>
    );

    expect(getByText("light")).toBeTruthy();
  });

  it("toggles the theme (light -> dark) correctly", () => {
    const { getByText } = render(
      <ThemeProvider defaultColorMode="light">
        <ThemeTestComponent />
      </ThemeProvider>
    );

    expect(getByText("light")).toBeTruthy();
    const toggleButton = getByText(/toggle/i);
    fireEvent.press(toggleButton);
    expect(getByText("dark")).toBeTruthy();
  });

  it("toggles the theme (dark -> light) correctly", () => {
    const { getByText } = render(
      <ThemeProvider defaultColorMode="dark">
        <ThemeTestComponent />
      </ThemeProvider>
    );

    expect(getByText("dark")).toBeTruthy();
    const toggleButton = getByText(/toggle/i);
    fireEvent.press(toggleButton);
    expect(getByText("light")).toBeTruthy();
  });
});
