import React from "react";
import Box, { BoxProps } from "../Box/Box";
import { SafeAreaView, StatusBar, Platform } from "react-native";
import { useAtomicComponentConfig } from "../../../hooks/useAtomicComponentConfig";

type ScreenProps = BoxProps & {
  /** The size of the screen */
  size?: string;
  /** The variant of the screen */
  variant?: string;
};

/** A layout component that you can use to wrap all the views in your app. */
const Screen: React.FC<ScreenProps> = ({
  children,
  size,
  variant,
  ...rest
}) => {
  const props = useAtomicComponentConfig("Screen", rest, {
    size: size,
    variant: variant,
  });

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        backgroundColor: props.style.backgroundColor,
      }}
    >
      <Box flex={1} flexDirection="column" {...props}>
        {children}
      </Box>
    </SafeAreaView>
  );
};

export default Screen;
