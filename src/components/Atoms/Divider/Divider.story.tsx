import React from "react";
import { storiesOf } from "@storybook/react-native";
import Screen from "../Screen/Screen";
import Divider from "./Divider";

storiesOf("Divider", module)
  .addDecorator((getStory) => <Screen>{getStory()}</Screen>)
  .add("horizontal", () => <Divider />)
  .add("vertical", () => <Divider orientation="vertical" />);
