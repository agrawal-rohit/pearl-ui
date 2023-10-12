import React from "react";
import Text from "../../components/Atoms/Text/Text";
import { render } from "@testing-library/react-native";
import { ThemeProvider } from "../../theme/src/themeContext";
import { useColorModeValue } from "../useColorModeValue";

jest.useFakeTimers();

const TestComponent: React.FC = () => {
  const bg = useColorModeValue("neutral.200", "pink");
  return <Text>{bg.toString()}</Text>;
};

describe("useColorModeValue", () => {
  it("shows the correct color in light mode", () => {
    const { getByText } = render(
      <ThemeProvider initialColorMode="light">
        <TestComponent />
      </ThemeProvider>
    );

    expect(getByText("neutral.200")).toBeTruthy();
  });

  it("shows the correct color in dark mode", () => {
    const { getByText } = render(
      <ThemeProvider initialColorMode="dark">
        <TestComponent />
      </ThemeProvider>
    );

    expect(getByText("pink")).toBeTruthy();
  });
});
