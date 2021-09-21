import React from "react";
import Constants from "expo-constants";
import { useNetInfo } from "@react-native-community/netinfo";
import Box, { BoxProps, boxStyleFunctions } from "../../Atoms/Box/Box";
import Text from "../../Atoms/Text/Text";
import { useStyledProps } from "../../../hooks/useStyledProps";

type OfflineNoticeProps = BoxProps;

const OfflineNotice: React.FC<OfflineNoticeProps> = ({ ...rest }) => {
  const netInfo = useNetInfo();

  if (
    netInfo &&
    (netInfo.type === "unknown" || netInfo.isInternetReachable === false)
  ) {
    return (
      <Box
        backgroundColor="danger-500"
        height={50}
        top={Constants.statusBarHeight}
        alignItems="center"
        justifyContent="center"
        width="100%"
        position="absolute"
        zIndex="banner"
        {...rest}
      >
        <Text>No Internet Connection!</Text>
      </Box>
    );
  }

  return null;
};

export default OfflineNotice;
