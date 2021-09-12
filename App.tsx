import React from "react";
import Storybook from "./storybook";
import { useFonts } from "expo-font";
import Screen from "./src/components/Atoms/Screen/Screen";
import AppLoading from "expo-app-loading";
import OfflineNotice from "./src/components/Molecules/OfflineNotice/OfflineNotice";
import Button from "./src/components/Molecules/Button/Button";
import { ThemeProvider } from "./src/theme/src/themeContext";

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
      <ThemeProvider initialColorMode="dark">
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
