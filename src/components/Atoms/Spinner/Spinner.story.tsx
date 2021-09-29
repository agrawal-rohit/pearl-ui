import React from "react";
import { storiesOf } from "@storybook/react-native";
import Screen from "../Screen/Screen";
import Spinner from "./Spinner";
import Box from "../Box/Box";

storiesOf("Spinner", module)
  .addDecorator((getStory) => <Screen>{getStory()}</Screen>)
  .add("ball", () => (
    <Box flexDirection="row">
      <Spinner size="s" variant="ball" />
      <Spinner size="m" variant="ball" />
      <Spinner size="l" variant="ball" />
      <Spinner size="xl" variant="ball" />
    </Box>
  ))
  .add("bar", () => (
    <Box flexDirection="row">
      <Spinner size="s" variant="bar" />
      <Spinner size="m" variant="bar" />
      <Spinner size="l" variant="bar" />
      <Spinner size="xl" variant="bar" />
    </Box>
  ))
  .add("dot", () => (
    <Box flex={1}>
      <Spinner size="s" variant="dot" />
      <Spinner size="m" variant="dot" />
      <Spinner size="l" variant="dot" />
      <Spinner size="xl" variant="dot" />
    </Box>
  ))
  .add("spinner", () => (
    <Box flexDirection="row">
      <Spinner size="s" variant="spinner" />
      <Spinner size="m" variant="spinner" />
      <Spinner size="l" variant="spinner" />
      <Spinner size="xl" variant="spinner" />
    </Box>
  ))
  .add("pacman", () => (
    <Box flexDirection="row">
      <Spinner size="s" variant="pacman" />
      <Spinner size="m" variant="pacman" />
      <Spinner size="l" variant="pacman" />
      <Spinner size="xl" variant="pacman" />
    </Box>
  ))
  .add("pulse", () => (
    <Box flexDirection="row">
      <Spinner size="s" variant="pulse" />
      <Spinner size="m" variant="pulse" />
      <Spinner size="l" variant="pulse" />
      <Spinner size="xl" variant="pulse" />
    </Box>
  ))
  .add("skype", () => (
    <Box flexDirection="row">
      <Spinner size="s" variant="skype" />
      <Spinner size="m" variant="skype" />
      <Spinner size="l" variant="skype" />
      <Spinner size="xl" variant="skype" />
    </Box>
  ))
  .add("activity", () => (
    <Box flexDirection="row">
      <Spinner size="s" variant="activity" />
      <Spinner size="m" variant="activity" />
      <Spinner size="l" variant="activity" />
      <Spinner size="xl" variant="activity" />
    </Box>
  ))
  .add("wave", () => (
    <Box flexDirection="row">
      <Spinner size="s" variant="wave" />
      <Spinner size="m" variant="wave" />
      <Spinner size="l" variant="wave" />
      <Spinner size="xl" variant="wave" />
    </Box>
  ));
