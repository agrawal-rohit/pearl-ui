import React from "react";
import {
  backgroundColor,
  BackgroundColorProps,
  color,
  ColorProps,
  layout,
  LayoutProps,
  spacing,
  SpacingProps,
} from "../../../theme/src/styleFunctions";
import { RNStyle, StyleFunctionContainer } from "../../../theme/src/types";
import * as ExpoIcons from "@expo/vector-icons";
import { useComponentConfig } from "../../../hooks/useComponentConfig";

const iconStyleFunctions = [
  color,
  backgroundColor,
  spacing,
  layout,
] as StyleFunctionContainer[];

type IconProps = ColorProps &
  BackgroundColorProps &
  SpacingProps &
  LayoutProps & {
    iconFamily:
      | "AntDesign"
      | "Entypo"
      | "EvilIcons"
      | "Feather"
      | "FontAwesome"
      | "FontAwesome5"
      | "Fontisto"
      | "Foundation"
      | "Ionicons"
      | "MaterialCommunityIcons"
      | "MaterialIcons"
      | "Octicons"
      | "SimpleLineIcons"
      | "Zocial";
    iconName: string;
    size?: string;
    style?: RNStyle;
  };

/** A Icon component which can be used to display Expo Icons */
const Icon: React.FC<IconProps> = ({
  iconFamily,
  iconName,
  size = "m",
  ...props
}) => {
  const componentSpecificProps = useComponentConfig(
    "Icon",
    props,
    {
      size: size,
    },
    iconStyleFunctions
  );

  const IconToUse = ExpoIcons[iconFamily];

  return <IconToUse name={iconName} {...componentSpecificProps}></IconToUse>;
};

export default Icon;
