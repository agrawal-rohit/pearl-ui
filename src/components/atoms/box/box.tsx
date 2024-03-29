import React from "react";
import { View, ViewProps } from "react-native";
import { pearl } from "../../../pearl";

/**
 * Box is the most abstract component on top of which all other Pearl UI components are built.
 * By default, it renders a <View> element.
 */
const Box = pearl<ViewProps>(View, {
  componentName: "Box",
  type: "basic",
  animatable: true,
});

// The props that the Box component accepts.
export type BoxProps = React.ComponentProps<typeof Box>;

Box.displayName = "Box";

// Export the Box component as the default export.
export default Box;
