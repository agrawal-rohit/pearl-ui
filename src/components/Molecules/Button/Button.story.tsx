import React from "react";
import { action } from "@storybook/addon-actions";
import { text } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react-native";
import Button from "./Button";
import Screen from "../../Atoms/Screen/Screen";
import Box from "../../Atoms/Box/Box";
import Text from "../../Atoms/Text/Text";

storiesOf("Button", module)
  .addDecorator((getStory) => getStory())
  .add("with text", () => (
    <>
      <Button onPress={action("clicked-text")} size="s">
        {text("Button text", "Hello Button")}
      </Button>
      <Button onPress={action("clicked-text")} size="m">
        {text("Button text", "Hello Button")}
      </Button>
      <Button onPress={action("clicked-text")} size="l">
        {text("Button text", "Hello Button")}
      </Button>
      <Button onPress={action("clicked-text")} size="xl">
        {text("Button text", "Hello Button")}
      </Button>
      <Box width="auto" height={20} backgroundColor="silver">
        <Text>asdasdad</Text>
      </Box>
    </>
  ))
  .add("with some emoji", () => (
    <Button onPress={action("clicked-emoji")}>😀 😎 👍 💯</Button>
  ))
  .add("loading", () => (
    <Button onPress={action("loading")} loading>
      Test
    </Button>
  ));
