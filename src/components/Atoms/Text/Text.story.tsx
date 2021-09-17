import React from "react";
import { storiesOf } from "@storybook/react-native";
import Text from "./Text";
import Screen from "../Screen/Screen";
import Box from "../Box/Box";

storiesOf("Typography", module)
  .addDecorator((getStory) => <Screen>{getStory()}</Screen>)
  .add("Heading", () => (
    <Box flex={1}>
      <Text variant="h1">Heading 1</Text>
      <Text variant="h2">Heading 2</Text>
      <Text variant="h3">Heading 3</Text>
      <Text variant="h4">Heading 4</Text>
      <Text variant="h5">Heading 5</Text>
      <Text variant="h6">Heading 6</Text>
    </Box>
  ))
  .add("Subheading", () => (
    <Box flex={1}>
      <Text variant="s1">Subheading 1</Text>
      <Text variant="s2">Subheading 2</Text>
    </Box>
  ))
  .add("Paragraph", () => (
    <Box flex={1}>
      <Text variant="p1">Paragraph 1</Text>
      <Text variant="p2">Paragraph 2</Text>
    </Box>
  ))
  .add("Caption", () => (
    <Box flex={1}>
      <Text variant="c1">Caption 1</Text>
      <Text variant="c2">Caption 2</Text>
    </Box>
  ))
  .add("Label", () => (
    <Box flex={1}>
      <Text variant="label">Label 1</Text>
    </Box>
  ))
  .add("Button Text", () => (
    <Box flex={1}>
      <Text variant="button">Button text</Text>
    </Box>
  ));
