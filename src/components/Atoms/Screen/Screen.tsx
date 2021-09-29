import React from "react";
import Box, { BoxProps } from "../Box/Box";
import { SafeAreaView, StatusBar, Platform } from "react-native";
import { useComponentConfig } from "../../../hooks/useComponentConfig";

/** A layout component to wrap each screen in your app */
const Screen: React.FC<BoxProps> = ({ children, ...props }) => {
  const componentStyles = useComponentConfig("Screen", props);

  return (
    <Box flex={1} flexDirection="column" {...componentStyles}>
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
