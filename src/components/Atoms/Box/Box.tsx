import React from "react";
import { View } from "react-native";
import { pearlify } from "../../../hooks/pearlify";
import { BoxStyleProps } from "../../../theme/src/styleFunctions";

/**
 * Box is the most abstract component on top of which all other Pearl UI components are built. By default, it renders a <View> element.
 */
type ViewProps = React.ComponentProps<typeof View>;

export type BoxProps = BoxStyleProps & Omit<ViewProps, keyof BoxStyleProps>;

const Box = pearlify(View, {
  componentName: "Box",
  type: "basic",
});

export default Box;
