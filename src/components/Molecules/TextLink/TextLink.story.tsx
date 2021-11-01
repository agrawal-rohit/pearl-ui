import React from "react";
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react-native";
import TextLink from "./TextLink";
import Screen from "../../Atoms/Screen/Screen";

storiesOf("TextLink", module)
  .addDecorator((getStory) => <Screen>{getStory()}</Screen>)
  .add("Sizes", () => (
    <>
      <TextLink onPress={action("clicked-text")} size="xs">
        Button text
      </TextLink>

      <TextLink onPress={action("clicked-text")} size="s">
        Button text
      </TextLink>

      <TextLink onPress={action("clicked-text")} size="m">
        Button text
      </TextLink>

      <TextLink onPress={action("clicked-text")} size="l">
        Button text
      </TextLink>
    </>
  ))
  .add("Disabled", () => (
    <>
      <TextLink onPress={action("clicked-text")} isDisabled>
        Button text
      </TextLink>
    </>
  ))
  .add("Color Scheme", () => (
    <>
      <TextLink onPress={action("clicked-text")}>Button text</TextLink>
      <TextLink onPress={action("clicked-text")} colorScheme="secondary">
        Button text
      </TextLink>
    </>
  ));
