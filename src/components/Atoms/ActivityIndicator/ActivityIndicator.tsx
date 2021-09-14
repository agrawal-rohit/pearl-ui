// import React from "react";
// import {
//   BallIndicator,
//   BarIndicator,
//   DotIndicator,
//   MaterialIndicator,
//   PacmanIndicator,
//   PulseIndicator,
//   SkypeIndicator,
//   UIActivityIndicator,
//   WaveIndicator,
// } from "react-native-indicators";
// import useStyledProps from "../../../hooks/useStyledProps";
// import { useTheme } from "../../../hooks/useTheme";
// import { PearlTheme } from "../../../theme/src/basetheme";
// import {
//   layout,
//   LayoutProps,
//   spacing,
//   SpacingProps,
// } from "../../../theme/src/styleFunctions";
// import { IBasePearlTheme } from "../../../theme/src/types";

// const restyleFunctions = [spacing, layout];
// type IActivityIndicatorProps = SpacingProps<IBasePearlTheme> &
//   LayoutProps & {
//     color?: string;
//     size?: "s" | "m" | "l" | "xl";
//     variant?:
//       | "ball"
//       | "bar"
//       | "dot"
//       | "spinner"
//       | "pacman"
//       | "pulse"
//       | "skype"
//       | "activity"
//       | "wave";
//     loading?: boolean;
//   };

// const IndicatorTypeToComponentMap = {
//   ball: BallIndicator,
//   bar: BarIndicator,
//   dot: DotIndicator,
//   spinner: MaterialIndicator,
//   pacman: PacmanIndicator,
//   pulse: PulseIndicator,
//   skype: SkypeIndicator,
//   activity: UIActivityIndicator,
//   wave: WaveIndicator,
// };

// const ActivityIndicator: React.FC<IActivityIndicatorProps> = ({
//   color = undefined,
//   size = "m",
//   variant = "spinner",
//   loading = true,
//   ...rest
// }) => {
//   if (!loading) return null;

//   const { theme } = useTheme();
//   const props = useStyledProps(restyleFunctions, rest);

//   const { primary500 } = theme.colors;

//   return React.createElement(IndicatorTypeToComponentMap[variant], {
//     color: color ? color : primary500,
//     size:
//       variant === "dot"
//         ? theme.activityIndicatorSize[size].size / 5
//         : theme.activityIndicatorSize[size].size,
//     ...props,
//   });
// };

// export default ActivityIndicator;
