import React from "react";
import Text from "../../components/Atoms/Text/Text";
import { render } from "@testing-library/react-native";
import { ThemeProvider } from "../../theme/src/themeContext";
import { useTheme } from "../useTheme";

jest.useFakeTimers();

const ThemeTestComponent: React.FC = () => {
  const { colorMode } = useTheme();

  return <Text>{colorMode}</Text>;
};

describe("useTheme", () => {
  it("loads the light theme by default", () => {
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
});
