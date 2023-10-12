import React, { useState } from "react";
import CheckBox from "./checkbox";
import { fireEvent, render } from "@testing-library/react-native";
import { ThemeProvider } from "../../../theme/src/theme-context";
import CheckBoxGroup from "./checkbox-group";
import Stack from "../../atoms/stack/stack";

jest.useFakeTimers();

describe("Molecules/CheckBox", () => {
  it("passes the snapshot test for basic setup", async () => {
    const tree = await render(
      <ThemeProvider>
        <CheckBox>Check me!</CheckBox>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("passes the snapshot test for different sizes", async () => {
    const tree = await render(
      <ThemeProvider>
        <CheckBox size="s">Small Checkbox</CheckBox>
        <CheckBox size="m">Regular Checkbox</CheckBox>
        <CheckBox size="l">Large Checkbox</CheckBox>
        <CheckBox size="xl">Extra Large Checkbox</CheckBox>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("passes the snapshot test for different variants", async () => {
    const tree = await render(
      <ThemeProvider>
        <CheckBox variant="filled">Filled Checkbox</CheckBox>
        <CheckBox variant="outline">Outline Checkbox</CheckBox>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("passes the snapshot test when in a checked/indeterminate state", async () => {
    const tree = await render(
      <ThemeProvider>
        <CheckBox variant="filled" isChecked isIndeterminate>
          Indeterminate Checkbox
        </CheckBox>
        <CheckBox variant="filled" isChecked>
          Checked Checkbox
        </CheckBox>

        <CheckBox variant="outline" isChecked isIndeterminate>
          Indeterminate Checkbox
        </CheckBox>
        <CheckBox variant="outline" isChecked>
          Checked Checkbox
        </CheckBox>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("passes the snapshot test when in an error state", async () => {
    const tree = await render(
      <ThemeProvider>
        <CheckBox isInvalid>Error Checkbox</CheckBox>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("passes the snapshot test for different color schemes", async () => {
    const tree = await render(
      <ThemeProvider>
        <CheckBox colorScheme="primary">Primary CheckBox</CheckBox>
        <CheckBox colorScheme="secondary">Secondary CheckBox</CheckBox>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("passes the snapshot test when using style props", async () => {
    const onPress = jest.fn();

    const tree = await render(
      <ThemeProvider>
        <CheckBox
          onPress={onPress}
          backgroundColor="primary.500"
          borderColor="neutral.400"
          borderWidth={2}
        >
          Button press
        </CheckBox>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("captures the onPress event", async () => {
    const onPress = jest.fn();

    const component = await render(
      <ThemeProvider>
        <CheckBox onPress={onPress} testID="checkBox">
          Check me
        </CheckBox>
      </ThemeProvider>
    );

    const tree = component.toJSON();
    if (
      (tree as any).children[0].children[0].children[0].type !==
      "RNGestureHandlerButton"
    ) {
      const pressableInstance = component.getByTestId("checkBox");
      fireEvent.press(pressableInstance);
      expect(onPress).toHaveBeenCalledTimes(1);
    }
  });

  it("changes the active value successfully when used in a group", async () => {
    const onChange = jest.fn();

    const Wrapper: React.FC = () => {
      const [checkedGroup, setCheckedGroup] = useState([]);

      const checkedHandler = (value: any) => {
        setCheckedGroup(value);
        onChange(value);
      };

      return (
        <CheckBoxGroup
          defaultValue={[]}
          value={checkedGroup}
          onChange={checkedHandler}
        >
          <Stack direction="horizontal" spacing="s">
            <CheckBox value="1" testID="checkbox1">
              Value 1
            </CheckBox>
            <CheckBox value="2" testID="checkbox2">
              Value 2
            </CheckBox>
            <CheckBox value={3} testID="checkbox3">
              Value 3
            </CheckBox>
            <CheckBox value={4} testID="checkbox4">
              Value 4
            </CheckBox>
          </Stack>
        </CheckBoxGroup>
      );
    };

    const component = await render(
      <ThemeProvider>
        <Wrapper />
      </ThemeProvider>
    );

    const tree = component.toJSON();
    if (
      (tree as any).children[0].children[0].children[0].children[0].children[0]
        .children[0].type !== "RNGestureHandlerButton"
    ) {
      const checkbox1 = component.getByTestId("checkbox1");
      fireEvent.press(checkbox1);
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toBeCalledWith(["1"]);

      const checkbox2 = component.getByTestId("checkbox2");
      fireEvent.press(checkbox2);
      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onChange).toBeCalledWith(["1", "2"]);

      // Remove the value
      fireEvent.press(checkbox2);
      expect(onChange).toHaveBeenCalledTimes(3);
      expect(onChange).toBeCalledWith(["1"]);

      const checkbox3 = component.getByTestId("checkbox3");
      fireEvent.press(checkbox3);
      expect(onChange).toHaveBeenCalledTimes(4);
      expect(onChange).toBeCalledWith(["1", 3]);

      const checkbox4 = component.getByTestId("checkbox4");
      fireEvent.press(checkbox4);
      expect(onChange).toHaveBeenCalledTimes(5);
      expect(onChange).toBeCalledWith(["1", 3, 4]);
    }
  });

  it("doesn't capture the onPress event when the checkbox is disabled ", async () => {
    const onPress = jest.fn();

    const component = await render(
      <ThemeProvider>
        <CheckBox onPress={onPress} isDisabled testID="checkBox">
          Check me
        </CheckBox>
      </ThemeProvider>
    );

    const tree = component.toJSON();
    if (
      (tree as any).children[0].children[0].children[0].type !==
      "RNGestureHandlerButton"
    ) {
      const pressableInstance = component.getByTestId("checkBox");
      fireEvent.press(pressableInstance);
      expect(onPress).toHaveBeenCalledTimes(0);
    }
  });
});
