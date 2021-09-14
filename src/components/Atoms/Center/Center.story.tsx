import React from "react";
import { storiesOf } from "@storybook/react-native";
import Screen from "../Screen/Screen";
import Center from "./Center";
import Text from "../Text/Text";

storiesOf("Center", module)
  .addDecorator((getStory) => <Screen>{getStory()}</Screen>)
  .add("any elements", () => (
    <Center height={100} backgroundColor="primary100">
      {/* <Text>asdlalsdknl</Text> */}
    </Center>
  ));
