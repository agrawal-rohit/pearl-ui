import React from "react";
import { useColorModeValue } from "../useColorModeValue";
import Text from "../../components/Atoms/Text/Text";
import { render } from "@testing-library/react-native";
import { ThemeProvider } from "../../theme/src/themeContext";

jest.useFakeTimers();

const ThemeTestComponent: React.FC = () => {
  const activeColor = useColorModeValue("red", "pink");

  return <Text>{activeColor}</Text>;
};

describe("useColorModeValue", () => {
  it("uses the first color during light theme", () => {
    const { getByText } = render(
      <ThemeProvider>
        <ThemeTestComponent />
      </ThemeProvider>
    );
    expect(getByText("red")).toBeTruthy();
  });

  it("uses the second color during dark theme", () => {
    const { getByText } = render(
      <ThemeProvider defaultColorMode="dark">
        <ThemeTestComponent />
      </ThemeProvider>
    );
    expect(getByText("pink")).toBeTruthy();
  });
});
