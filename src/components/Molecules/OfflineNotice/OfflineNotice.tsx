import React from "react";
import Constants from "expo-constants";
import { useNetInfo } from "@react-native-community/netinfo";
import Box, { BoxProps, boxStyleFunctions } from "../../Atoms/Box/Box";
import Text from "../../Atoms/Text/Text";
import { baseLightTheme } from "../../../theme/src/basetheme";
import useStyledProps from "../../../hooks/useStyledProps";

type OfflineNoticeProps = BoxProps<typeof baseLightTheme>;

const OfflineNotice: React.FC<OfflineNoticeProps> = ({ ...rest }) => {
  const props = useStyledProps(boxStyleFunctions, rest);
  const netInfo = useNetInfo();

  if (
    netInfo &&
    (netInfo.type === "unknown" || netInfo.isInternetReachable === false)
  ) {
    return (
      <Box
        backgroundColor="danger500"
        height={50}
        top={Constants.statusBarHeight}
        alignItems="center"
        justifyContent="center"
        width="100%"
        position="absolute"
        zIndex={2}
        {...props}
      >
        <Text variant="notifications">No Internet Connection!</Text>
      </Box>
    );
  }

  return null;
};

export default OfflineNotice;
