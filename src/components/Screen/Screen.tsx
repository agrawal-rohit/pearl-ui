import React from "react";
import { Box } from "../..";
import { SafeAreaView, StatusBar, Platform } from "react-native";

interface ScreenProps {}

const Screen: React.FC<ScreenProps> = ({ children }) => {
  return (
    <Box
      padding="m"
      backgroundColor="mainBackground"
      flex={1}
      flexDirection="column"
    >
      <SafeAreaView
        style={{
          flex: 1,
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        }}
      >
        {children}
      </SafeAreaView>
    </Box>
  );
};

export default Screen;
