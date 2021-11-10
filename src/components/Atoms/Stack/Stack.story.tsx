import React from "react";
import { storiesOf } from "@storybook/react-native";
import Screen from "../Screen/Screen";
import Stack from "./Stack";
import Box from "../Box/Box";
import Divider from "../Divider/Divider";

storiesOf("Stack", module)
  .addDecorator((getStory) => <Screen>{getStory()}</Screen>)
  .add("Horizontal", () => (
    <Stack direction="horizontal" spacing="l" divider={<Divider />}>
      <Box w={20} h={100} backgroundColor="primary.500" />
      <Box w={20} h={20} backgroundColor="primary.500" />
      <Box w={20} h={20} backgroundColor="primary.500" />
      <Box w={20} h={20} backgroundColor="primary.500" />
    </Stack>
  ))
  .add("Vertical", () => (
    <Stack mt="l" direction="vertical" spacing="l" divider={<Divider />}>
      <Box w={100} h={20} backgroundColor="primary.500" />
      <Box w="40%" h={20} backgroundColor="primary.500" />
      <Box w={20} h={20} backgroundColor="primary.500" />
      <Box w={20} h={20} backgroundColor="primary.500" />
    </Stack>
  ));
