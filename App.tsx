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
import Input from "./src/components/Molecules/Input/Input";
import Icon from "./src/components/Atoms/Icon/Icon";
import Button from "./src/components/Molecules/Button/Button";
import Box from "./src/components/Atoms/Box/Box";

const App = () => {
  const [haveFontsLoaded] = useFonts({
    "Poppins-Light": Poppins_300Light,
    "Poppins-Regular": Poppins_400Regular,
    "Poppins-Medium": Poppins_500Medium,
    "Poppins-SemiBold": Poppins_600SemiBold,
    "Poppins-Bold": Poppins_700Bold,
    "Poppins-ExtraBold": Poppins_800ExtraBold,
  });

  const [text, settext] = useState("");

  return (
    <ThemeProvider defaultColorMode="light" haveFontsLoaded={haveFontsLoaded}>
      <Storybook />
      {/* <Screen>
        <Input
          isFullWidth
          placeholder="Enter Email"
          leftIcon={<Icon iconFamily="Ionicons" iconName="mail" />}
          value={text}
          onChangeText={(val) => settext(val)}
        />

        <Input
          isFullWidth
          placeholder="Enter Password"
          secureTextEntry
          leftIcon={<Icon iconFamily="Ionicons" iconName="md-lock-closed" />}
          rightIcon={<Icon iconFamily="Ionicons" iconName="eye-off" />}
        />

        <Button mt="m" isFullWidth onPress={() => console.log(2)}>
          Login
        </Button>
      </Screen> */}
    </ThemeProvider>
  );
};

export default App;
