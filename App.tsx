import React, { useState } from "react";
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
import Avatar from "./src/components/Molecules/Avatar/Avatar";
import AvatarGroup from "./src/components/Molecules/Avatar/AvatarGroup";
import Text from "./src/components/Atoms/Text/Text";
import Box from "./src/components/Atoms/Box/Box";
import Divider from "./src/components/Atoms/Divider/Divider";
import Stack, {
  HStack,
  VStack,
  ZStack,
} from "./src/components/Atoms/Stack/Stack";
import Icon from "./src/components/Atoms/Icon/Icon";
import Image from "./src/components/Molecules/Image/Image";
import Spinner from "./src/components/Atoms/Spinner/Spinner";
import CheckBox from "./src/components/Molecules/CheckBox/CheckBox";
import CheckBoxGroup from "./src/components/Molecules/CheckBox/CheckBoxGroup";
import Input from "./src/components/Molecules/Input/Input";
import { extendTheme } from "./src/theme/src/base";
import { pearlify } from "./src/hooks/pearlify";
import { View } from "react-native";

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

  const [color, setColor] = useState("pink");

  return (
    <ThemeProvider haveFontsLoaded={haveFontsLoaded}>
      <Screen></Screen>
    </ThemeProvider>
  );
};

export default App;
