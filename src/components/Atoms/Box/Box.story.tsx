import React from "react";
import { storiesOf } from "@storybook/react-native";
import Screen from "../Screen/Screen";
import Box from "../Box/Box";

storiesOf("Box", module)
  .addDecorator((getStory) => <Screen>{getStory()}</Screen>)
  .add("Basic box", () => <Box>This is a sample box</Box>);
