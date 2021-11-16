import React from "react";
import { storiesOf } from "@storybook/react-native";
import Radio from "./Radio";
import Screen from "../../Atoms/Screen/Screen";

storiesOf("Radio", module)
  .addDecorator((getStory) => <Screen>{getStory()}</Screen>)
  .add("Sizes", () => {
    return (
      <>
        <Radio isChecked size="s">
          Small Radio
        </Radio>
        <Radio isChecked size="m">
          Regular Radio
        </Radio>
        <Radio isChecked size="l">
          Large Radio
        </Radio>
        <Radio isChecked size="xl">
          Extra Large Radio
        </Radio>
      </>
    );
  })
  .add("Variants", () => {
    return (
      <>
        <Radio isChecked variant="filled">
          Filled Radio
        </Radio>
        <Radio isChecked variant="outline">
          Outline Radio
        </Radio>
      </>
    );
  })
  .add("States", () => {
    return (
      <>
        <Radio>Default Radio</Radio>
        <Radio isDisabled>Disabled Radio</Radio>
        <Radio isChecked>Checked Radio</Radio>
        <Radio isInvalid>Error Radio</Radio>
        <Radio isInvalid errorMessage="This is an error message!">
          Error Radio with message
        </Radio>
      </>
    );
  });
