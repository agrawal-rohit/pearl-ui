import React from "react";
import Box from "../Box/Box";
import { SafeAreaView, StatusBar, Platform } from "react-native";
import { BoxProps, useRestyle, boxRestyleFunctions } from "@shopify/restyle";
import { Theme } from "../../../theme/theme";

type ScreenProps = BoxProps<Theme>;

const Screen: React.FC<ScreenProps> = ({ children, ...rest }) => {
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
