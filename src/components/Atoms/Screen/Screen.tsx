import React from "react";
import Box, { BoxProps, boxStyleFunctions } from "../Box/Box";
import { SafeAreaView, StatusBar, Platform } from "react-native";
import useStyledProps from "../../../hooks/useStyledProps";
import { baseLightTheme } from "../../../theme/src/basetheme";

const Screen: React.FC<BoxProps<typeof baseLightTheme>> = ({
  children,
  ...rest
}) => {
  const props = useStyledProps(boxStyleFunctions, rest);

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
