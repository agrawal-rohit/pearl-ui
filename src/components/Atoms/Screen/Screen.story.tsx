import React from "react";
import { storiesOf } from "@storybook/react-native";
import Screen from "./Screen";
import Box from "../Box/Box";

storiesOf("Screen", module)
  .addDecorator((getStory) => getStory())
  .add("Screen", () => (
    <Screen showScrollBar={true}>
      <Box w="100%" h={200} backgroundColor="primary.500" />
    </Screen>
  ))
  .add("Screen with Pull to Refresh", () => (
    <Screen
      onPullToRefresh={() =>
        new Promise<void>((res, rej) =>
          setTimeout(() => {
            console.log("YOOOOO");
            res();
          }, 2000)
        )
      }
      showScrollBar={true}
    >
      <Box w="100%" h={200} backgroundColor="primary.500" />
    </Screen>
  ));
