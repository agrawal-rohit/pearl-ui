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
import { useAtomicComponentConfig } from "../../../hooks/useAtomicComponentConfig";
import responsiveSize from "../Text/responsiveSize";

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
    /** Icon family that contains the icon you want to use  */
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
    /** Name of the icon as given in it's respective icon family */
    iconName: string;
    /** The size of the icon */
    size?: string;
    /** The variant of the icon */
    variant?: string;
    /** The accessibility label of the icon */
    accessibilityLabel?: string;
    style?: RNStyle;
  };

const iconFamilyMapping = {
  AntDesign,
  Entypo,
  EvilIcons,
  Feather,
  FontAwesome,
  FontAwesome5,
  Fontisto,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
  SimpleLineIcons,
  Zocial,
};

/** he `Icon` component can used to add Expo Icons to your app and customize them using style props. */
const Icon: React.FC<IconProps> = ({
  iconFamily,
  iconName,
  size = "m",
  variant = undefined,
  accessibilityLabel = null,
  ...props
}) => {
  const componentSpecificProps = useAtomicComponentConfig(
    "Icon",
    props,
    {
      size: size,
      variant: variant,
    },
    iconStyleFunctions
  );

  const IconToUse = iconFamilyMapping[iconFamily];

  return (
    <IconToUse
      accessible={true}
      accessibilityLabel={
        accessibilityLabel ? accessibilityLabel : `${iconName} Icon`
      }
      name={iconName}
      {...componentSpecificProps}
      size={responsiveSize(componentSpecificProps.size)}
    ></IconToUse>
  );
};

export default Icon;
