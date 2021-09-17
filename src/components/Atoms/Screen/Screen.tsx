import React from "react";
import Box, { BoxProps, boxStyleFunctions } from "../Box/Box";
import { SafeAreaView, StatusBar, Platform } from "react-native";
import useStyledProps from "../../../hooks/useStyledProps";
import useComponentConfig from "../../../hooks/useComponentConfig";

const Screen: React.FC<BoxProps> = ({ children, ...rest }) => {
  const componentStyles = useComponentConfig("Screen", {});

  return (
    <Box
      padding="m"
      flex={1}
      flexDirection="column"
      {...rest}
      {...componentStyles}
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
