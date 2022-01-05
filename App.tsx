import React, { useEffect, useRef, useState } from "react";
import {
  useFonts,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
  Poppins_300Light_Italic,
  Poppins_700Bold_Italic,
  Poppins_200ExtraLight,
  Poppins_100Thin_Italic,
  Poppins_100Thin,
  Poppins_400Regular_Italic,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold_Italic,
  Poppins_800ExtraBold_Italic,
  Poppins_900Black,
  Poppins_900Black_Italic,
  Poppins_200ExtraLight_Italic,
} from "@expo-google-fonts/poppins";
import { ThemeProvider } from "./src/theme/src/themeContext";
import Screen from "./src/components/Atoms/Screen/Screen";
import Stack, {
  HStack,
  VStack,
  ZStack,
} from "./src/components/Atoms/Stack/Stack";
import Avatar from "./src/components/Molecules/Avatar/Avatar";
import Box from "./src/components/Atoms/Box/Box";

const App = () => {
  const [haveFontsLoaded] = useFonts({
    "Poppins-Hairline": Poppins_100Thin,
    "Poppins-HairlineItalic": Poppins_100Thin_Italic,
    "Poppins-Thin": Poppins_200ExtraLight,
    "Poppins-ThinItalic": Poppins_200ExtraLight_Italic,
    "Poppins-Light": Poppins_300Light,
    "Poppins-LightItalic": Poppins_300Light_Italic,
    "Poppins-Regular": Poppins_400Regular,
    "Poppins-RegularItalic": Poppins_400Regular_Italic,
    "Poppins-Medium": Poppins_500Medium,
    "Poppins-MediumItalic": Poppins_500Medium_Italic,
    "Poppins-SemiBold": Poppins_600SemiBold,
    "Poppins-SemiBoldItalic": Poppins_600SemiBold_Italic,
    "Poppins-Bold": Poppins_700Bold,
    "Poppins-BoldItalic": Poppins_700Bold_Italic,
    "Poppins-ExtraBold": Poppins_800ExtraBold,
    "Poppins-ExtraBoldItalic": Poppins_800ExtraBold_Italic,
    "Poppins-Black": Poppins_900Black,
    "Poppins-BlackItalic": Poppins_900Black_Italic,
  });

  return (
    <ThemeProvider haveFontsLoaded={haveFontsLoaded}>
      <Screen>
        <HStack spacing="s" mt="s">
          <Avatar name="Rohit Agrawal" />
          <Avatar name="Rohit Agrawal" />
          <Avatar name="Rohit Agrawal" />
          <Avatar name="Rohit Agrawal" />
        </HStack>

        <VStack spacing="s" mt="xl">
          <Avatar name="Rohit Agrawal" />
          <Avatar name="Rohit Agrawal" />
          <Avatar name="Rohit Agrawal" />
          <Avatar name="Rohit Agrawal" />
        </VStack>

        <ZStack mt="xl">
          <Avatar name="Rohit Agrawal" />
          <Avatar name="Rohit Agrawal" ml="xl" />
          <Avatar name="Rohit Agrawal" ml="5xl" />
          <Avatar name="Rohit Agrawal" ml="8xl" />
        </ZStack>
      </Screen>
    </ThemeProvider>
  );
};

export default App;
