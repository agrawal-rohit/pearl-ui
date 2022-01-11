import React from "react";
import { View, ViewProps } from "react-native";
import { pearlify } from "../../../hooks/pearlify";

/**
 * Box is the most abstract component on top of which all other Pearl UI components are built. By default, it renders a <View> element.
 */
const Box = pearlify<ViewProps>(View, {
  componentName: "None",
  type: "basic",
  animatable: true,
});

export type BoxProps = React.ComponentProps<typeof Box>;

export default Box;
