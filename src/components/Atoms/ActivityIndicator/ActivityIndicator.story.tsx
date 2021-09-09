import React from "react";
import { storiesOf } from "@storybook/react-native";
import Screen from "../Screen/Screen";
import ActivityIndicator from "./ActivityIndicator";

storiesOf("ActivityIndicator", module)
  .addDecorator((getStory) => <Screen>{getStory()}</Screen>)
  .add("ball", () => <ActivityIndicator variant="ball" />)
  .add("bar", () => <ActivityIndicator variant="bar" />)
  .add("dot", () => <ActivityIndicator variant="dot" />)
  .add("spinner", () => <ActivityIndicator variant="spinner" />)
  .add("pacman", () => <ActivityIndicator variant="pacman" />)
  .add("pulse", () => <ActivityIndicator variant="pulse" />)
  .add("skype", () => <ActivityIndicator variant="skype" />)
  .add("activity", () => <ActivityIndicator variant="activity" />)
  .add("wave", () => <ActivityIndicator variant="wave" />);
