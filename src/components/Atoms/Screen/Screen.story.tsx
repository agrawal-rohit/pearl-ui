import React from "react";
import { storiesOf } from "@storybook/react-native";
import Screen from "./Screen";

storiesOf("Screen", module)
  .addDecorator((getStory) => getStory())
  .add("Screen", () => <Screen></Screen>);
