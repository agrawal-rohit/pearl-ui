import React from "react";
import Box from "../Box/Box";
import { SafeAreaView, StatusBar, Platform } from "react-native";
import { useRestyle, boxRestyleFunctions } from "@shopify/restyle";
import { IBasePearlTheme } from "../../../theme/src/types";

// type ScreenProps = BoxProps<IBasePearlTheme>;

const Screen = ({ children, ...rest }) => {
  const props = useRestyle(boxRestyleFunctions, rest);

  return (
    <Box
      padding="m"
      backgroundColor="mainBackground"
      flex={1}
      flexDirection="column"
      {...props}
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
