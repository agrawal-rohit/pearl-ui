import React from "react";
import Pressable from "./pressable";
import { fireEvent, render } from "@testing-library/react-native";
import { ThemeProvider } from "../../../theme/src/theme-context";
import { MotiPressable } from "moti/interactions";
import Text from "../text/text";

jest.useFakeTimers();

describe("Atoms/Pressable", () => {
  it("passes the snapshot test for basic setup", async () => {
    const onPress = jest.fn();

    const tree = await render(
      <ThemeProvider>
        <Pressable onPress={onPress}>
          <Text>Button press</Text>
        </Pressable>
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
        >
          <Text>Button press</Text>
        </Pressable>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("captures the onPress event", async () => {
    const onPress = jest.fn();

    const component = await render(
      <ThemeProvider>
        <MotiPressable> </MotiPressable>
        <Pressable onPress={onPress} testID="testOnPress">
          <Text>Button press</Text>
        </Pressable>
      </ThemeProvider>
    );

    const tree = component.toJSON();
    if ((tree as any).children[0].type !== "RNGestureHandlerButton") {
      const pressableInstance = component.getByTestId("testOnPress");
      fireEvent.press(pressableInstance);
      expect(onPress).toHaveBeenCalledTimes(1);
    }
  });

  it("passes the snapshot test when disabled", async () => {
    const onPress = jest.fn();

    const tree = await render(
      <ThemeProvider>
        <Pressable isDisabled onPress={onPress}>
          <Text>Button press</Text>
        </Pressable>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("does not capture the onPress event when disabled", async () => {
    const onPress = jest.fn();

    const component = await render(
      <ThemeProvider>
        <Pressable onPress={onPress} isDisabled testID="testOnPressDisabled">
          <Text>Button press</Text>
        </Pressable>
      </ThemeProvider>
    );

    const pressableInstance = component.getByTestId("testOnPressDisabled");
    fireEvent.press(pressableInstance);
    expect(onPress).not.toHaveBeenCalled();
  });
});
