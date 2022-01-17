import React from "react";
import Text from "../../components/Atoms/Text/Text";
import { render, fireEvent } from "@testing-library/react-native";
import { ThemeProvider } from "../src/themeContext";
import Box from "../../components/Atoms/Box/Box";
import Button from "../../components/Molecules/Button/Button";
import { useTheme } from "../../hooks/useTheme";

jest.useFakeTimers();

interface TestComponentProps {
  targetColorMode?: "light" | "dark" | "system";
}

const ThemeTestComponent: React.FC<TestComponentProps> = (props) => {
  const { colorMode, toggleColorMode, switchColorMode } = useTheme();

  return (
    <Box>
      <Text>{colorMode}</Text>;
      <Button onPress={toggleColorMode}>Toggle mode</Button>
      <Button
        onPress={() => {
          if (props.targetColorMode) switchColorMode(props.targetColorMode);
        }}
      >
        Switch mode
      </Button>
    </Box>
  );
};

describe("Theme Context", () => {
  it("returns null if fonts haven't loaded", () => {
    const tree = render(
      <ThemeProvider haveFontsLoaded={false}>
        <ThemeTestComponent />
      </ThemeProvider>
    ).toJSON();
    expect(tree).toBe(null);
  });

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
      <ThemeProvider initialColorMode="dark">
        <ThemeTestComponent />
      </ThemeProvider>
    );

    expect(getByText("dark")).toBeTruthy();
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

  it("changes the theme from dark -> light correctly using switchColorMode", () => {
    const { getByText } = render(
      <ThemeProvider initialColorMode="dark">
        <ThemeTestComponent targetColorMode="light" />
      </ThemeProvider>
    );

    expect(getByText("dark")).toBeTruthy();
    const switchButton = getByText(/switch/i);
    fireEvent.press(switchButton);
    expect(getByText("light")).toBeTruthy();
  });

  it("changes the theme from light -> dark correctly using switchColorMode", () => {
    const { getByText } = render(
      <ThemeProvider initialColorMode="light">
        <ThemeTestComponent targetColorMode="dark" />
      </ThemeProvider>
    );

    expect(getByText("light")).toBeTruthy();
    const switchButton = getByText(/switch/i);
    fireEvent.press(switchButton);
    expect(getByText("dark")).toBeTruthy();
  });
});
