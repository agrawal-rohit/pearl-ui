import React from "react";
import { storiesOf } from "@storybook/react-native";
import CheckBox from "./CheckBox";
import Screen from "../../Atoms/Screen/Screen";

storiesOf("CheckBox", module)
  .addDecorator((getStory) => <Screen>{getStory()}</Screen>)
  .add("Sizes", () => {
    return (
      <>
        <CheckBox size="s">Small Checkbox</CheckBox>
        <CheckBox size="m">Regular Checkbox</CheckBox>
        <CheckBox size="l">Large Checkbox</CheckBox>
        <CheckBox size="xl">Extra Large Checkbox</CheckBox>
      </>
    );
  })
  .add("Variants", () => {
    return (
      <>
        <CheckBox variant="filled">Filled Checkbox</CheckBox>
        <CheckBox variant="outline">Outline Checkbox</CheckBox>
      </>
    );
  })
  .add("States", () => {
    return (
      <>
        <CheckBox>Default Checkbox</CheckBox>
        <CheckBox isChecked isIndeterminate>
          Indeterminate Checkbox
        </CheckBox>
        <CheckBox isChecked>Checked Checkbox</CheckBox>
        <CheckBox isErrorVisible>Error Checkbox</CheckBox>
        <CheckBox isErrorVisible errorMessage="This is an error message!">
          Error Checkbox with message
        </CheckBox>
      </>
    );
  });
