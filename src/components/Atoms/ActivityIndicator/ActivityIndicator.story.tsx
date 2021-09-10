import React from "react";
import { storiesOf } from "@storybook/react-native";
import Screen from "../Screen/Screen";
import ActivityIndicator from "./ActivityIndicator";
import Box from "../Box/Box";

storiesOf("ActivityIndicator", module)
  .addDecorator((getStory) => <Screen>{getStory()}</Screen>)
  .add("ball", () => (
    <Box flexDirection="row">
      <ActivityIndicator size="s" variant="ball" />
      <ActivityIndicator size="m" variant="ball" />
      <ActivityIndicator size="l" variant="ball" />
      <ActivityIndicator size="xl" variant="ball" />
    </Box>
  ))
  .add("bar", () => (
    <Box flexDirection="row">
      <ActivityIndicator size="s" variant="bar" />
      <ActivityIndicator size="m" variant="bar" />
      <ActivityIndicator size="l" variant="bar" />
      <ActivityIndicator size="xl" variant="bar" />
    </Box>
  ))
  .add("dot", () => (
    <Box flex={1}>
      <ActivityIndicator size="s" variant="dot" />
      <ActivityIndicator size="m" variant="dot" />
      <ActivityIndicator size="l" variant="dot" />
      <ActivityIndicator size="xl" variant="dot" />
    </Box>
  ))
  .add("spinner", () => (
    <Box flexDirection="row">
      <ActivityIndicator size="s" variant="spinner" />
      <ActivityIndicator size="m" variant="spinner" />
      <ActivityIndicator size="l" variant="spinner" />
      <ActivityIndicator size="xl" variant="spinner" />
    </Box>
  ))
  .add("pacman", () => (
    <Box flexDirection="row">
      <ActivityIndicator size="s" variant="pacman" />
      <ActivityIndicator size="m" variant="pacman" />
      <ActivityIndicator size="l" variant="pacman" />
      <ActivityIndicator size="xl" variant="pacman" />
    </Box>
  ))
  .add("pulse", () => (
    <Box flexDirection="row">
      <ActivityIndicator size="s" variant="pulse" />
      <ActivityIndicator size="m" variant="pulse" />
      <ActivityIndicator size="l" variant="pulse" />
      <ActivityIndicator size="xl" variant="pulse" />
    </Box>
  ))
  .add("skype", () => (
    <Box flexDirection="row">
      <ActivityIndicator size="s" variant="skype" />
      <ActivityIndicator size="m" variant="skype" />
      <ActivityIndicator size="l" variant="skype" />
      <ActivityIndicator size="xl" variant="skype" />
    </Box>
  ))
  .add("activity", () => (
    <Box flexDirection="row">
      <ActivityIndicator size="s" variant="activity" />
      <ActivityIndicator size="m" variant="activity" />
      <ActivityIndicator size="l" variant="activity" />
      <ActivityIndicator size="xl" variant="activity" />
    </Box>
  ))
  .add("wave", () => (
    <Box flexDirection="row">
      <ActivityIndicator size="s" variant="wave" />
      <ActivityIndicator size="m" variant="wave" />
      <ActivityIndicator size="l" variant="wave" />
      <ActivityIndicator size="xl" variant="wave" />
    </Box>
  ));
