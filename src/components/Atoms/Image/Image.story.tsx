import React from "react";
import { storiesOf } from "@storybook/react-native";
import Image from "./Image";
import { Image as RNImage } from "react-native";
import Screen from "../Screen/Screen";

storiesOf("Image", module)
  .addDecorator((getStory) => <Screen>{getStory()}</Screen>)
  .add("Screen", () => (
    <Image
      width={200}
      height={200}
      source={{
        uri: "https://cdn.wallpapersafari.com/25/3/xzGf3n.jpg",
      }}
      loadingIndicatorSource={{
        uri: "https://cdn.wallpapersafari.com/25/3/xzGf3n.jpg",
      }}
    />
  ));
