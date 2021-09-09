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
    "Poppins-Regular": require("./src/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("./src/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Bold": require("./src/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("./src/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("./src/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("./src/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("./src/fonts/Poppins-Medium.ttf"),
    "Poppins-Thin": require("./src/fonts/Poppins-Thin.ttf"),
  });

  if (haveFontsLoaded) {
    return (
      <ThemeProvider defaultColorMode="dark">
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
