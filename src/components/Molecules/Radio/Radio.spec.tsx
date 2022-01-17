import React from "react";
import Radio from "./Radio";
import { fireEvent, render } from "@testing-library/react-native";
import { ThemeProvider } from "../../../theme/src/themeContext";
import RadioGroup from "./RadioGroup";
import Stack from "../../Atoms/Stack/Stack";

jest.useFakeTimers();

describe("Molecules/Radio", () => {
  it("passes the snapshot test for basic setup", async () => {
    const tree = await render(
      <ThemeProvider>
        <Radio>Check me!</Radio>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("passes the snapshot test for different sizes", async () => {
    const tree = await render(
      <ThemeProvider>
        <Radio size="s">Small Radio</Radio>
        <Radio size="m">Regular Radio</Radio>
        <Radio size="l">Large Radio</Radio>
        <Radio size="xl">Extra Large Radio</Radio>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("passes the snapshot test for different variants", async () => {
    const tree = await render(
      <ThemeProvider>
        <Radio variant="filled">Filled Radio</Radio>
        <Radio variant="outline">Outline Radio</Radio>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("passes the snapshot test when in a checked state", async () => {
    const tree = await render(
      <ThemeProvider>
        <Radio variant="filled" isChecked>
          Checked Radio
        </Radio>
        <Radio variant="outline" isChecked>
          Checked Radio
        </Radio>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("passes the snapshot test when in an error state", async () => {
    const tree = await render(
      <ThemeProvider>
        <Radio isInvalid>Error Radio</Radio>
        <Radio isInvalid errorMessage="This is an error message!">
          Error Radio with message
        </Radio>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("passes the snapshot test for different color schemes", async () => {
    const tree = await render(
      <ThemeProvider>
        <Radio colorScheme="primary">Primary Radio</Radio>
        <Radio colorScheme="secondary">Secondary Radio</Radio>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("passes the snapshot test when using style props", async () => {
    const onPress = jest.fn();

    const tree = await render(
      <ThemeProvider>
        <Radio
          onPress={onPress}
          backgroundColor="primary.500"
          borderColor="neutral.400"
          borderWidth={2}
        >
          Button press
        </Radio>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("captures the onPress event", async () => {
    const onPress = jest.fn();

    const component = await render(
      <ThemeProvider>
        <Radio onPress={onPress} testID="radio">
          Check me
        </Radio>
      </ThemeProvider>
    );

    const tree = component.toJSON();
    if (
      (tree as any).children[0].children[0].children[0].type !==
      "RNGestureHandlerButton"
    ) {
      const pressableInstance = component.getByTestId("radio");
      fireEvent.press(pressableInstance);
      expect(onPress).toHaveBeenCalledTimes(1);
    }
  });

  it("changes the active value successfully when used in a group", async () => {
    const onChange = jest.fn();

    const component = await render(
      <ThemeProvider>
        <RadioGroup defaultValue="1" value="2" onChange={onChange}>
          <Stack direction="horizontal" spacing="s">
            <Radio value="1" testID="radio1">
              Value 1
            </Radio>
            <Radio value="2" testID="radio2">
              Value 2
            </Radio>
            <Radio value={3} testID="radio3">
              Value 3
            </Radio>
            <Radio value={4} testID="radio4">
              Value 4
            </Radio>
          </Stack>
        </RadioGroup>
      </ThemeProvider>
    );

    const tree = component.toJSON();
    if (
      (tree as any).children[0].children[0].children[0].children[0].children[0]
        .children[0].type !== "RNGestureHandlerButton"
    ) {
      const radio1 = component.getByTestId("radio1");
      fireEvent.press(radio1);
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toBeCalledWith("1");

      const radio2 = component.getByTestId("radio2");
      fireEvent.press(radio2);
      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onChange).toBeCalledWith("2");

      const radio3 = component.getByTestId("radio3");
      fireEvent.press(radio3);
      expect(onChange).toHaveBeenCalledTimes(3);
      expect(onChange).toBeCalledWith(3);

      const radio4 = component.getByTestId("radio4");
      fireEvent.press(radio4);
      expect(onChange).toHaveBeenCalledTimes(4);
      expect(onChange).toBeCalledWith(4);
    }
  });

  it("doesn't capture the onPress event when the radio is disabled ", async () => {
    const onPress = jest.fn();

    const component = await render(
      <ThemeProvider>
        <Radio onPress={onPress} isDisabled testID="radio">
          Check me
        </Radio>
      </ThemeProvider>
    );

    const tree = component.toJSON();
    if (
      (tree as any).children[0].children[0].children[0].type !==
      "RNGestureHandlerButton"
    ) {
      const pressableInstance = component.getByTestId("radio");
      fireEvent.press(pressableInstance);
      expect(onPress).toHaveBeenCalledTimes(0);
    }
  });

  it("shows error message correctly", () => {
    const { getByText } = render(
      <ThemeProvider>
        <Radio isInvalid errorMessage="Test error message" />
      </ThemeProvider>
    );

    expect(getByText("Test error message")).toBeTruthy();
  });
});
