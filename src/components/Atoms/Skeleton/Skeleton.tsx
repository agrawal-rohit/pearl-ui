// import React from "react";
// import {
//   backgroundColor,
//   BackgroundColorProps,
//   color,
//   ColorProps,
//   layout,
//   LayoutProps,
//   spacing,
//   SpacingProps,
//   opacity,
//   OpacityProps,
//   visible,
//   VisibleProps,
// } from "../../../theme/src/styleFunctions";
// import { RNStyle, StyleFunctionContainer } from "../../../theme/src/types";
// import {
//   AntDesign,
//   Entypo,
//   EvilIcons,
//   Feather,
//   FontAwesome,
//   FontAwesome5,
//   Fontisto,
//   Foundation,
//   Ionicons,
//   MaterialCommunityIcons,
//   MaterialIcons,
//   Octicons,
//   SimpleLineIcons,
//   Zocial,
// } from "@expo/vector-icons";
// import { useAtomicComponentConfig } from "../../../hooks/useAtomicComponentConfig";
// import responsiveSize from "../../../utils/responsiveSize";

// const iconStyleFunctions = [
//   color,
//   backgroundColor,
//   spacing,
//   layout,
//   opacity,
//   visible,
// ] as StyleFunctionContainer[];

// type IconProps = ColorProps &
//   BackgroundColorProps &
//   SpacingProps &
//   LayoutProps &
//   OpacityProps &
//   VisibleProps & {
//     /** Icon family that contains the icon you want to use  */
//     iconFamily:
//       | "AntDesign"
//       | "Entypo"
//       | "EvilIcons"
//       | "Feather"
//       | "FontAwesome"
//       | "FontAwesome5"
//       | "Fontisto"
//       | "Foundation"
//       | "Ionicons"
//       | "MaterialCommunityIcons"
//       | "MaterialIcons"
//       | "Octicons"
//       | "SimpleLineIcons"
//       | "Zocial";
//     /** Name of the icon as given in it's respective icon family */
//     iconName: string;
//     /** The size of the icon */
//     size?: string;
//     /** The variant of the icon */
//     variant?: string;
//     /** The accessibility label of the icon */
//     accessibilityLabel?: string;
//     style?: RNStyle;
//   };

// const iconFamilyMapping = {
//   AntDesign,
//   Entypo,
//   EvilIcons,
//   Feather,
//   FontAwesome,
//   FontAwesome5,
//   Fontisto,
//   Foundation,
//   Ionicons,
//   MaterialCommunityIcons,
//   MaterialIcons,
//   Octicons,
//   SimpleLineIcons,
//   Zocial,
// };

// /** he `Icon` component can used to add Expo Icons to your app and customize them using style props. */
// const Icon: React.FC<IconProps> = ({
//   iconFamily,
//   iconName,
//   size = "m",
//   accessibilityLabel = null,
//   ...rest
// }) => {
//   const props = useAtomicComponentConfig(
//     "Skeleton",
//     rest,
//     {
//       size: size,
//       variant: rest.variant,
//     },
//     iconStyleFunctions
//   );

//   const IconToUse = iconFamilyMapping[iconFamily];

//   return (
//     <IconToUse
//       accessible={true}
//       accessibilityLabel={
//         accessibilityLabel ? accessibilityLabel : `${iconName} Icon`
//       }
//       name={iconName}
//       {...props}
//       size={responsiveSize(props.size)}
//     ></IconToUse>
//   );
// };

// export default Icon;
