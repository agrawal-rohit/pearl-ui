import React from "react";
import { storiesOf } from "@storybook/react-native";
import Screen from "../Screen/Screen";
import Spinner from "./Spinner";
import Box from "../Box/Box";

storiesOf("Spinner", module)
  .addDecorator((getStory) => <Screen>{getStory()}</Screen>)
  .add("ball", () => (
    <Box flexDirection="row">
      <Spinner size="s" variant="ball" isFullScreen />
      <Spinner size="m" variant="ball" isFullScreen />
      <Spinner size="l" variant="ball" isFullScreen />
      <Spinner size="xl" variant="ball" isFullScreen />
    </Box>
  ))
  .add("bar", () => (
    <Box flexDirection="row">
      <Spinner size="s" variant="bar" isFullScreen />
      <Spinner size="m" variant="bar" isFullScreen />
      <Spinner size="l" variant="bar" isFullScreen />
      <Spinner size="xl" variant="bar" isFullScreen />
    </Box>
  ))
  .add("dot", () => (
    <Box flex={1}>
      <Spinner size="s" variant="dot" isFullScreen />
      <Spinner size="m" variant="dot" isFullScreen />
      <Spinner size="l" variant="dot" isFullScreen />
      <Spinner size="xl" variant="dot" isFullScreen />
    </Box>
  ))
  .add("spinner", () => (
    <Box flexDirection="row">
      <Spinner size="s" variant="spinner" isFullScreen />
      <Spinner size="m" variant="spinner" isFullScreen />
      <Spinner size="l" variant="spinner" isFullScreen />
      <Spinner size="xl" variant="spinner" isFullScreen />
    </Box>
  ))
  .add("pacman", () => (
    <Box flexDirection="row">
      <Spinner size="s" variant="pacman" isFullScreen />
      <Spinner size="m" variant="pacman" isFullScreen />
      <Spinner size="l" variant="pacman" isFullScreen />
      <Spinner size="xl" variant="pacman" isFullScreen />
    </Box>
  ))
  .add("pulse", () => (
    <Box flexDirection="row">
      <Spinner size="s" variant="pulse" isFullScreen />
      <Spinner size="m" variant="pulse" isFullScreen />
      <Spinner size="l" variant="pulse" isFullScreen />
      <Spinner size="xl" variant="pulse" isFullScreen />
    </Box>
  ))
  .add("skype", () => (
    <Box flexDirection="row">
      <Spinner size="s" variant="skype" isFullScreen />
      <Spinner size="m" variant="skype" isFullScreen />
      <Spinner size="l" variant="skype" isFullScreen />
      <Spinner size="xl" variant="skype" isFullScreen />
    </Box>
  ))
  .add("activity", () => (
    <Box flexDirection="row">
      <Spinner size="s" variant="activity" isFullScreen />
      <Spinner size="m" variant="activity" isFullScreen />
      <Spinner size="l" variant="activity" isFullScreen />
      <Spinner size="xl" variant="activity" isFullScreen />
    </Box>
  ))
  .add("wave", () => (
    <Box flexDirection="row">
      <Spinner size="s" variant="wave" isFullScreen />
      <Spinner size="m" variant="wave" isFullScreen />
      <Spinner size="l" variant="wave" isFullScreen />
      <Spinner size="xl" variant="wave" isFullScreen />
    </Box>
  ));
