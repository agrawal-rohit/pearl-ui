import React from "react";
import { storiesOf } from "@storybook/react-native";
import Screen from "../Screen/Screen";
import Box from "./Box";

storiesOf("Box", module)
  .addDecorator((getStory) => <Screen>{getStory()}</Screen>)
  .add("Basic box", () => (
    <Box
      backgroundColor="primary.500"
      borderRadius="l"
      width="40%"
      boxShadow="l"
      height={200}
    ></Box>
  ))
  .add("Elevation Boxes", () => (
    <Box
      flex={1}
      flexDirection="row"
      flexWrap="wrap"
      justifyContent="space-around"
    >
      <Box
        backgroundColor="neutral.100"
        borderRadius="m"
        width="40%"
        boxShadow="xs"
        height={100}
        margin="m"
      />
      <Box
        backgroundColor="neutral.100"
        borderRadius="m"
        width="40%"
        boxShadow="s"
        height={100}
        margin="m"
      />
      <Box
        backgroundColor="neutral.100"
        borderRadius="m"
        width="40%"
        boxShadow="m"
        height={100}
        margin="m"
      />
      <Box
        backgroundColor="neutral.100"
        borderRadius="m"
        width="40%"
        boxShadow="l"
        height={100}
        margin="m"
      />
      <Box
        backgroundColor="neutral.100"
        borderRadius="m"
        width="40%"
        boxShadow="xl"
        height={100}
        margin="m"
      />
      <Box
        backgroundColor="neutral.100"
        borderRadius="m"
        width="40%"
        boxShadow="2xl"
        height={100}
        margin="m"
      />
      <Box
        backgroundColor="neutral.100"
        borderRadius="m"
        width="40%"
        boxShadow="3xl"
        height={100}
        margin="m"
      />
      <Box
        backgroundColor="neutral.100"
        borderRadius="m"
        width="40%"
        boxShadow="4xl"
        height={100}
        margin="m"
      />
    </Box>
  ));
