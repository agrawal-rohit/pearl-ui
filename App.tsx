import React, { useEffect, useRef, useState } from "react";
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
import Screen from "./src/components/Atoms/Screen/Screen";
import Box from "./src/components/Atoms/Box/Box";
import Text from "./src/components/Atoms/Text/Text";
import Spinner from "./src/components/Atoms/Spinner/Spinner";
import Center from "./src/components/Atoms/Center/Center";
import Button from "./src/components/Molecules/Button/Button";

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
    <ThemeProvider haveFontsLoaded={haveFontsLoaded}>
      <Storybook />
    </ThemeProvider>
  );
};

export default App;
