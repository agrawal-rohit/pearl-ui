import React from "react";
import CheckBox from "./CheckBox";
import { fireEvent, render } from "@testing-library/react-native";
import { ThemeProvider } from "../../../theme/src/themeContext";

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
        <CheckBox isChecked isIndeterminate>
          Indeterminate Checkbox
        </CheckBox>
        <CheckBox isChecked>Checked Checkbox</CheckBox>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("passes the snapshot test when in an error state", async () => {
    const tree = await render(
      <ThemeProvider>
        <CheckBox isErrorVisible>Error Checkbox</CheckBox>
        <CheckBox isErrorVisible errorMessage="This is an error message!">
          Error Checkbox with message
        </CheckBox>
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

    const { getByTestId } = await render(
      <ThemeProvider>
        <CheckBox onPress={onPress} testID="checkBox">
          Check me
        </CheckBox>
      </ThemeProvider>
    );

    const pressableInstance = getByTestId("checkBox");
    fireEvent.press(pressableInstance);
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("doesn't capture the onPress event when the checkbox is disabled ", async () => {
    const onPress = jest.fn();

    const { getByTestId } = await render(
      <ThemeProvider>
        <CheckBox onPress={onPress} isDisabled testID="checkBox">
          Check me
        </CheckBox>
      </ThemeProvider>
    );

    const pressableInstance = getByTestId("checkBox");
    fireEvent.press(pressableInstance);
    expect(onPress).toHaveBeenCalledTimes(0);
  });

  it("shows error message correctly", () => {
    const { getByText } = render(
      <ThemeProvider>
        <CheckBox isErrorVisible errorMessage="Test error message" />
      </ThemeProvider>
    );

    expect(getByText("Test error message")).toBeTruthy();
  });
});
