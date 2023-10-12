import React, { useState } from "react";
import Text from "../../components/atoms/text/text";
import { fireEvent, render } from "@testing-library/react-native";
import { ThemeProvider } from "../../theme/src/theme-context";
import Box from "../../components/atoms/box/box";
import { Pressable } from "react-native";
import { useColorScheme } from "../useColorScheme";

jest.useFakeTimers();

const TestComponent: React.FC<any> = (props: any) => {
  const [useScheme, setUseScheme] = useState(false);

  const updatedObj = useColorScheme(props.colorScheme, props.object);

  return (
    <Box>
      <Text>{useScheme ? updatedObj.color : props.object.color}</Text>
      <Pressable onPress={() => setUseScheme(true)} testID="switchButton">
        Use color scheme
      </Pressable>
    </Box>
  );
};

describe("useColorScheme", () => {
  it("leaves values unchanged for missing color scheme", () => {
    const { getByText, getByTestId } = render(
      <ThemeProvider>
        <TestComponent
          colorScheme={null}
          object={{
            color: "primary100",
            fontSize: 20,
          }}
        />
      </ThemeProvider>
    );
    expect(getByText("primary100")).toBeTruthy();
    const toggleButton = getByTestId("switchButton");
    fireEvent.press(toggleButton);
    expect(getByText("primary100")).toBeTruthy();
  });
  it("switches values containing primary to secondary", () => {
    const { getByText, getByTestId } = render(
      <ThemeProvider>
        <TestComponent
          colorScheme="secondary"
          object={{
            color: "primary100",
            fontSize: 20,
          }}
        />
      </ThemeProvider>
    );
    expect(getByText("primary100")).toBeTruthy();
    const toggleButton = getByTestId("switchButton");
    fireEvent.press(toggleButton);
    expect(getByText("secondary100")).toBeTruthy();
  });
});
