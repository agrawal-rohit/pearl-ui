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
import Box, { boxStyleFunctions } from "./src/components/Atoms/Box/Box";
import Text, { textStyleFunctions } from "./src/components/Atoms/Text/Text";
import Spinner from "./src/components/Atoms/Spinner/Spinner";
import Center from "./src/components/Atoms/Center/Center";
import Button from "./src/components/Molecules/Button/Button";
import { useStyledProps } from "./src/hooks/useStyledProps";
import { StyleFunctionContainer } from "./src/theme/src/types";

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
        <Text variant="h1">Heading 1</Text>
        <Text variant="h2">Heading 2</Text>
        <Text variant="t1">Title 1</Text>
        <Text variant="t2">Title 2</Text>
        <Text variant="st1">Subtitle 1</Text>
        <Text variant="st2">Subtitle 2</Text>
        <Text variant="p1">Paragraph 1</Text>
        <Text variant="p2">Paragraph 2</Text>
        <Box backgroundColor="primary.500">
          <Text variant="btn1" color="neutral.50">
            Button 1
          </Text>
        </Box>
        <Box backgroundColor="primary.500">
          <Text variant="btn2" color="neutral.50">
            Button 2
          </Text>
        </Box>
        <Box backgroundColor="primary.500">
          <Text variant="btn3" color="neutral.50">
            Button 3
          </Text>
        </Box>
        <Box backgroundColor="primary.500">
          <Text variant="btn4" color="neutral.50">
            Button 4
          </Text>
        </Box>
        <Text variant="caption">Caption</Text>
      </Screen>
    </ThemeProvider>
  );
};

export default App;
