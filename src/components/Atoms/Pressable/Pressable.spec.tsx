import React from "react";
import Pressable from "./Pressable";
import { fireEvent, render } from "@testing-library/react-native";
import { ThemeProvider } from "../../../theme/src/themeContext";

jest.useFakeTimers();

describe("Atoms/Pressable", () => {
  it("passes the snapshot test for basic setup", async () => {
    const onPress = jest.fn();

    const tree = await render(
      <ThemeProvider>
        <Pressable onPress={onPress}>Button press</Pressable>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("passes the snapshot test when using style props", async () => {
    const onPress = jest.fn();

    const tree = await render(
      <ThemeProvider>
        <Pressable
          onPress={onPress}
          backgroundColor="primary.500"
          borderColor="neutral.400"
          borderWidth={2}
          androidRippleConfig={{ color: "red" }}
        >
          Button press
        </Pressable>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("captures the onPress event", async () => {
    const onPress = jest.fn();

    const { getByTestId } = await render(
      <ThemeProvider>
        <Pressable onPress={onPress} testID="testOnPress">
          Button press
        </Pressable>
      </ThemeProvider>
    );

    const pressableInstance = getByTestId("testOnPress");
    fireEvent.press(pressableInstance);
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
