import React from "react";
import { action } from "@storybook/addon-actions";
import { text } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react-native";
import Button from "./Button";
import Text from "../../Atoms/Text/Text";
import Screen from "../../Atoms/Screen/Screen";

storiesOf("Button", module)
  .addDecorator((getStory) => <Screen>{getStory()}</Screen>)
  .add("with text", () => (
    <Button onPress={action("clicked-text")}>
      <Text>{text("Button text", "Hello Button")}</Text>
    </Button>
  ))
  .add("with some emoji", () => (
    <Button onPress={action("clicked-emoji")}>
      <Text>😀 😎 👍 💯</Text>
    </Button>
  ))
  .add("loading", () => (
    <Button onPress={action("loading")} loading>
      <Text>Test</Text>
    </Button>
  ));
