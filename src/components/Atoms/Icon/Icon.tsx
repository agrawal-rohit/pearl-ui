import React from "react";
import {
  backgroundColorStyleFunction,
  BackgroundColorProps,
  colorStyleFunction,
  ColorProps,
  layoutStyleFunction,
  LayoutProps,
  spacingStyleFunction,
  SpacingProps,
  opacityStyleFunction,
  OpacityProps,
  visibleStyleFunction,
  VisibleProps,
} from "../../../theme/src/style-functions";
import {
  AtomComponentProps,
  ComponentSizes,
  ComponentVariants,
  PearlComponent,
  ResponsiveValue,
  StyleFunctionContainer,
} from "../../../theme/src/types";
import {
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
} from "@expo/vector-icons";
import responsiveSize from "../../../utils/responsive-size";
import { View } from "react-native";
import { pearlify } from "../../../hooks/pearlify";

export const iconStyleFunctions = [
  colorStyleFunction,
  backgroundColorStyleFunction,
  spacingStyleFunction,
  layoutStyleFunction,
  opacityStyleFunction,
  visibleStyleFunction,
] as StyleFunctionContainer[];

type IconStyleProps = ColorProps &
  BackgroundColorProps &
  SpacingProps &
  LayoutProps &
  OpacityProps &
  VisibleProps;

type BaseIconProps = React.ComponentProps<typeof View> & {
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
  /** The accessibility label of the icon */
  accessibilityLabel?: string;
  /** Size of the icon in pixels to override the component style size */
  rawSize?: number;
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

const CustomIcon = React.forwardRef(
  (
    {
      iconFamily,
      iconName,
      accessibilityLabel = undefined,
      rawSize = undefined,
      ...props
    }: AtomComponentProps<"Icon", BaseIconProps, IconStyleProps>,
    ref: any
  ) => {
    const IconToUse = iconFamilyMapping[iconFamily];

    return (
      <IconToUse
        ref={ref}
        accessible={true}
        accessibilityLabel={
          accessibilityLabel ? accessibilityLabel : `${iconName} Icon`
        }
        name={iconName}
        {...props}
        size={responsiveSize(rawSize)}
      ></IconToUse>
    );
  }
);

/** The `Icon` component can used to add Expo Icons to your app and customize them using style props. */
const Icon = pearlify<BaseIconProps, "atom", IconStyleProps>(
  CustomIcon,
  { componentName: "Icon", type: "atom", animatable: true },
  iconStyleFunctions
);

export type IconProps = React.ComponentProps<typeof Icon>;

export default Icon;
