import React from "react";
import { storiesOf } from "@storybook/react-native";
import Screen from "../Screen/Screen";
import Box from "./Box";

storiesOf("Box", module)
  .addDecorator((getStory) => <Screen>{getStory()}</Screen>)
  .add("Basic box", () => (
    <Box
      backgroundColor="neutral-300"
      borderRadius="l"
      width="40%"
      height={200}
    ></Box>
  ));
