import React from "react";
import { storiesOf } from "@storybook/react-native";
import Screen from "../Screen/Screen";
import Avatar from "./Avatar";

storiesOf("Avatar", module)
  .addDecorator((getStory) => <Screen>{getStory()}</Screen>)
  .add("Main", () => (
    <>
      {/* <Divider />
      <Divider mt="l" length="50%" />

      <Divider mt="l" orientation="vertical" length={20} bg="violet" /> */}
    </>
  ));
