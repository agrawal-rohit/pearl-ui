// import React from "react";
// import Constants from "expo-constants";
// import { useNetInfo } from "@react-native-community/netinfo";
// import Box from "../../Atoms/Box/Box";
// import Text from "../../Atoms/Text/Text";
// import { BoxProps, useRestyle, boxRestyleFunctions } from "@shopify/restyle";
// import { PearlTheme } from "../../../theme/src/basetheme";

// type OfflineNoticeProps = BoxProps<IBasePearlTheme>;

// const OfflineNotice: React.FC<OfflineNoticeProps> = ({ ...rest }) => {
//   const props = useRestyle(boxRestyleFunctions, rest);
//   const netInfo = useNetInfo();

//   if (
//     netInfo &&
//     (netInfo.type === "unknown" || netInfo.isInternetReachable === false)
//   ) {
//     return (
//       <Box
//         backgroundColor="danger500"
//         height={50}
//         top={Constants.statusBarHeight}
//         alignItems="center"
//         justifyContent="center"
//         width="100%"
//         position="absolute"
//         zIndex={2}
//         {...props}
//       >
//         <Text variant="notifications">No Internet Connection!</Text>
//       </Box>
//     );
//   }

//   return null;
// };

// export default OfflineNotice;
