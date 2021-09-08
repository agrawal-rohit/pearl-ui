import React from "react";
import { ThemeProvider } from "./src/themeContext";
import Storybook from "./storybook";
import { useFonts } from "expo-font";
import { Button } from "./src";
import AppLoading from "expo-app-loading";
import Screen from "./src/components/Screen/Screen";
import OfflineNotice from "./src/components/OfflineNotice/OfflineNotice";

const App = () => {
  const [haveFontsLoaded] = useFonts({
    "Jost-Regular": require("./src/fonts/Jost-Regular.ttf"),
    "Jost-SemiBold": require("./src/fonts/Jost-SemiBold.ttf"),
    "Jost-Bold": require("./src/fonts/Jost-Bold.ttf"),
    "Jost-ExtraBold": require("./src/fonts/Jost-ExtraBold.ttf"),
    "Jost-ExtraLight": require("./src/fonts/Jost-ExtraLight.ttf"),
    "Jost-Light": require("./src/fonts/Jost-Light.ttf"),
    "Jost-Medium": require("./src/fonts/Jost-Medium.ttf"),
    "Jost-Thin": require("./src/fonts/Jost-Thin.ttf"),
  });

  if (haveFontsLoaded) {
    return (
      <ThemeProvider defaultMode="dark">
        <Storybook />
        {/* <OfflineNotice />
        <Screen>
          <Button onPress={() => console.log(2)}>Test</Button>
        </Screen> */}
      </ThemeProvider>
    );
  }

  return <AppLoading />;
};

export default App;
