import React from "react";
import { storiesOf } from "@storybook/react-native";
import Screen from "../Screen/Screen";
import Spinner from "./Spinner";
import Box from "../Box/Box";
import Stack from "../../Atoms/Stack/Stack";

storiesOf("Spinner", module)
  .addDecorator((getStory) => <Screen>{getStory()}</Screen>)
  .add("Sizes", () => (
    <Stack direction="horizontal" spacing="s">
      <Spinner size="s" />
      <Spinner size="m" />
      <Spinner size="l" />
      <Spinner size="xl" />
    </Stack>
  ))
  .add("Variants", () => (
    <Stack direction="vertical" spacing="s">
      <Spinner variant="activity" />
      <Spinner variant="ball" />
      <Spinner variant="bar" />
      <Spinner variant="dot" />
      <Spinner variant="pacman" />
      <Spinner variant="pulse" />
      <Spinner variant="skype" />
      <Spinner variant="spinner" />
      <Spinner variant="wave" />
    </Stack>
  ))
  .add("Color Schemes", () => (
    <Box flex={1}>
      <Spinner colorScheme="primary" />
      <Spinner colorScheme="success" />
      <Spinner colorScheme="warning" />
      <Spinner colorScheme="info" />
      <Spinner colorScheme="danger" />
    </Box>
  ))
  .add("Expanded", () => (
    <Stack direction="vertical" spacing="l">
      <Box w={200} h={100} backgroundColor="neutral.200">
        <Spinner />
      </Box>

      <Box w={200} h={100} backgroundColor="neutral.200">
        <Spinner isExpanded />
      </Box>
    </Stack>
  ));
