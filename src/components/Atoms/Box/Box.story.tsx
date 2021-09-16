import React from "react";
import { storiesOf } from "@storybook/react-native";
import Screen from "../Screen/Screen";
import Box from "../Box/Box";
import Text from "../Text/Text";

storiesOf("Box", module)
  .addDecorator((getStory) => <Screen>{getStory()}</Screen>)
  .add("Basic box", () => (
    <Box>
      <Text variant="p1">This is a sample box</Text>
    </Box>
  ));
