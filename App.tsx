import React from "react";
import Storybook from "./storybook";
import {
  useFonts,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
} from "@expo-google-fonts/poppins";
import { ThemeProvider } from "./src/theme/src/themeContext";

const App = () => {
  const [haveFontsLoaded] = useFonts({
    "Poppins-Light": Poppins_300Light,
    "Poppins-Regular": Poppins_400Regular,
    "Poppins-Medium": Poppins_500Medium,
    "Poppins-SemiBold": Poppins_600SemiBold,
    "Poppins-Bold": Poppins_700Bold,
    "Poppins-ExtraBold": Poppins_800ExtraBold,
  });

  return (
    <ThemeProvider defaultColorMode="light" haveFontsLoaded={haveFontsLoaded}>
      <Storybook />
      {/* <OfflineNotice />
      <Screen>
        <Button onPress={() => console.log(2)}>Test</Button>
      </Screen> */}
    </ThemeProvider>
  );
};

export default App;
