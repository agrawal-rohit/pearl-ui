import React from "react";
import TextLink from "./text-link";
import { fireEvent, render } from "@testing-library/react-native";
import { ThemeProvider } from "../../../theme/src/theme-context";

jest.useFakeTimers();

describe("Molecules/TextLink", () => {
  it("passes the snapshot test for basic setup", async () => {
    const onPress = jest.fn();

    const tree = await render(
      <ThemeProvider>
        <TextLink onPress={onPress}>Text Link press</TextLink>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("passes the snapshot test for different sizes", async () => {
    const onPress = jest.fn();

    const tree = await render(
      <ThemeProvider>
        <TextLink onPress={onPress} size="xs">
          Text Link press
        </TextLink>
        <TextLink onPress={onPress} size="s">
          Text Link press
        </TextLink>
        <TextLink onPress={onPress} size="m">
          Text Link press
        </TextLink>
        <TextLink onPress={onPress} size="l">
          Text Link press
        </TextLink>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("passes the snapshot test for different color schemes", async () => {
    const tree = await render(
      <ThemeProvider>
        <TextLink colorScheme="primary">Primary text link</TextLink>
        <TextLink colorScheme="secondary">Secondary text link</TextLink>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("passes the snapshot test when using style props", async () => {
    const onPress = jest.fn();

    const tree = await render(
      <ThemeProvider>
        <TextLink
          onPress={onPress}
          backgroundColor="primary.500"
          borderColor="neutral.400"
          borderWidth={2}
        >
          Text link press
        </TextLink>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("captures the onPress event", async () => {
    const onPress = jest.fn();

    const component = await render(
      <ThemeProvider>
        <TextLink onPress={onPress} testID="testOnPress">
          Button press
        </TextLink>
      </ThemeProvider>
    );

    const tree = component.toJSON();
    if ((tree as any).children[0].type !== "RNGestureHandlerButton") {
      const pressableInstance = component.getByTestId("testOnPress");
      fireEvent.press(pressableInstance);
      expect(onPress).toHaveBeenCalledTimes(1);
    }
  });

  it("doesn't capture the onPress event when the button is disabled ", async () => {
    const onPress = jest.fn();

    const component = await render(
      <ThemeProvider>
        <TextLink onPress={onPress} isDisabled testID="testOnPress">
          Button press
        </TextLink>
      </ThemeProvider>
    );

    const tree = component.toJSON();
    if ((tree as any).children[0].type !== "RNGestureHandlerButton") {
      const pressableInstance = component.getByTestId("testOnPress");
      fireEvent.press(pressableInstance);
      expect(onPress).toHaveBeenCalledTimes(0);
    }
  });
});
