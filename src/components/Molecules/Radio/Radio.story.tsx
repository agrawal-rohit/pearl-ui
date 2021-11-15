import React from "react";
import { storiesOf } from "@storybook/react-native";
import Radio from "./Radio";
import Screen from "../../Atoms/Screen/Screen";

storiesOf("Radio", module)
  .addDecorator((getStory) => <Screen>{getStory()}</Screen>)
  .add("Sizes", () => {
    return (
      <>
        <Radio size="s">Small Radio</Radio>
        <Radio size="m">Regular Radio</Radio>
        <Radio size="l">Large Radio</Radio>
        <Radio size="xl">Extra Large Radio</Radio>
      </>
    );
  })
  .add("Variants", () => {
    return (
      <>
        <Radio variant="filled">Filled Radio</Radio>
        <Radio variant="outline">Outline Radio</Radio>
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
