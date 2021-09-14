import React from "react";
import { storiesOf } from "@storybook/react-native";
import Screen from "../Screen/Screen";
import Box from "./Box";

storiesOf("Box", module)
  .addDecorator((getStory) => getStory())
  .add("Basic box", () => (
    <Box
      padding="s"
      height={300}
      width={100}
      backgroundColor="primary100"
    ></Box>
  ));
