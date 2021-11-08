import React from "react";
import { storiesOf } from "@storybook/react-native";
import Text from "./Text";
import Screen from "../Screen/Screen";
import Box from "../Box/Box";

storiesOf("Typography", module)
  .addDecorator((getStory) => <Screen>{getStory()}</Screen>)
  .add("All", () => (
    <Box flex={1}>
      <Text variant="h1">Heading 1</Text>
      <Text variant="h2">Heading 2</Text>
      <Text variant="h3">Heading 3</Text>
      <Text variant="h4">Heading 4</Text>
      <Text variant="h5">Heading 5</Text>
      <Text variant="h6">Heading 6</Text>
      <Text variant="p1">Paragraph 1</Text>
      <Text variant="p2">Paragraph 2</Text>
      <Text variant="p3">Paragraph 3</Text>
      <Text variant="p4">Paragraph 4</Text>
      <Text variant="label">Label</Text>
      <Text variant="caption">Caption</Text>
      <Box backgroundColor="primary.500">
        <Text variant="btn1">Button 1</Text>
      </Box>
      <Box backgroundColor="primary.500">
        <Text variant="btn2">Button 2</Text>
      </Box>
      <Box backgroundColor="primary.500">
        <Text variant="btn3">Button 3</Text>
      </Box>
      <Box backgroundColor="primary.500">
        <Text variant="btn4">Button 4</Text>
      </Box>
    </Box>
  ));
