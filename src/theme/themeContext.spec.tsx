import React from "react";
import Text from "../components/Atoms/Text/Text";
import { render, fireEvent } from "@testing-library/react-native";
import { ThemeProvider, useTheme } from "./themeContext";
import Box from "../components/Atoms/Box/Box";
import { palette } from "./theme";
import Button from "../components/Molecules/Button/Button";

jest.useFakeTimers();

const ThemeTestComponent: React.FC = () => {
  const { theme, colorMode, toggleTheme } = useTheme();

  return (
    <Box>
      <Text>{colorMode}</Text>;<Text>{theme.colors.mainBackground}</Text>;
      <Button onPress={toggleTheme}>Toggle theme</Button>
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
    expect(getByText(palette.neutral100)).toBeTruthy();
  });

  it("loads the dark theme when overriden", () => {
    const { getByText } = render(
      <ThemeProvider initialColorMode="dark">
        <ThemeTestComponent />
      </ThemeProvider>
    );

    expect(getByText("dark")).toBeTruthy();
    expect(getByText(palette.neutral700)).toBeTruthy();
  });

  it("loads the theme automatically based on the system theme", () => {
    const { getByText } = render(
      <ThemeProvider initialColorMode="system">
        <ThemeTestComponent />
      </ThemeProvider>
    );

    expect(getByText("light")).toBeTruthy();
  });

  it("toggles the theme (light -> dark) correctly", () => {
    const { getByText } = render(
      <ThemeProvider initialColorMode="light">
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
      <ThemeProvider initialColorMode="dark">
        <ThemeTestComponent />
      </ThemeProvider>
    );

    expect(getByText("dark")).toBeTruthy();
    const toggleButton = getByText(/toggle/i);
    fireEvent.press(toggleButton);
    expect(getByText("light")).toBeTruthy();
  });
});
