import React from "react";
import { storiesOf } from "@storybook/react-native";
import Screen from "../Screen/Screen";
import Box from "../Box/Box";
import Icon from "./Icon";

storiesOf("Icon", module)
  .addDecorator((getStory) => <Screen>{getStory()}</Screen>)
  .add("Sizes", () => (
    <Box flexDirection="row" justifyContent="space-between">
      <Icon iconFamily="AntDesign" iconName="stepforward" size="s" />
      <Icon iconFamily="AntDesign" iconName="stepforward" size="m" />
      <Icon iconFamily="AntDesign" iconName="stepforward" size="l" />
      <Icon iconFamily="AntDesign" iconName="stepforward" size="xl" />
    </Box>
  ))
  .add("Overrides", () => (
    <Box flexDirection="row" justifyContent="space-between">
      <Icon
        iconFamily="AntDesign"
        iconName="stepforward"
        size="l"
        color="primary.500"
      />
    </Box>
  ));
