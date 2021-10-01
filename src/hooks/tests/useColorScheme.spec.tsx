import React, { useState } from "react";
import Text from "../../components/Atoms/Text/Text";
import { fireEvent, render } from "@testing-library/react-native";
import { ThemeProvider } from "../../theme/src/themeContext";
import Box from "../../components/Atoms/Box/Box";
import { Pressable } from "react-native";
import { useColorScheme } from "../useColorScheme";

jest.useFakeTimers();

const ThemeTestComponent: React.FC = () => {
  const [useScheme, setUseScheme] = useState(false);

  const initialObj: Record<string, any> = {
    color: "primary100",
    fontSize: 20,
  };
  const updatedObj = useColorScheme("secondary", initialObj);

  return (
    <Box>
      <Text>{useScheme ? updatedObj.color : initialObj.color}</Text>
      <Pressable onPress={() => setUseScheme(true)} testID="switchButton">
        Use color scheme
      </Pressable>
    </Box>
  );
};

describe("useColorScheme.spec", () => {
  it("switches values containing primary to secondary", () => {
    const { getByText, getByTestId } = render(
      <ThemeProvider>
        <ThemeTestComponent />
      </ThemeProvider>
    );
    expect(getByText("primary100")).toBeTruthy();
    const toggleButton = getByTestId("switchButton");
    fireEvent.press(toggleButton);
    expect(getByText("secondary100")).toBeTruthy();
  });
});
