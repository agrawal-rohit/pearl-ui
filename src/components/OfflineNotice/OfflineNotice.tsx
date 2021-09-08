import React from "react";
import { View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import { NetInfoStateType, useNetInfo } from "@react-native-community/netinfo";
import { Box, Text } from "../..";

export default function OfflineNotice() {
  const netInfo = useNetInfo();

  if (
    netInfo.type === NetInfoStateType.unknown ||
    netInfo.isInternetReachable === false
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
      >
        <Text variant="button">No Internet Connection!</Text>
      </Box>
    );
  }

  return null;
}
