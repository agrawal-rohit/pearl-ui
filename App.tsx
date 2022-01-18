import React, { useEffect, useState } from "react";
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
import Button from "./src/components/Molecules/Button/Button";
import Image from "./src/components/Molecules/Image/Image";
import Avatar from "./src/components/Molecules/Avatar/Avatar";
import AvatarGroup from "./src/components/Molecules/Avatar/AvatarGroup";
import Input from "./src/components/Molecules/Input/Input";
import Radio from "./src/components/Molecules/Radio/Radio";
import CheckBox from "./src/components/Molecules/CheckBox/CheckBox";
import Box from "./src/components/Atoms/Box/Box";
import { MotiView } from "moti";

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

  const [disabled, setDisabled] = useState(false);

  return (
    <ThemeProvider initialColorMode="light" haveFontsLoaded={haveFontsLoaded}>
      <Screen>
        <Button
          onPress={() => {
            console.log(2);
          }}
          isDisabled={disabled}
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            type: "timing",
            duration: 200,
            mt: { type: "spring" },
          }}
          backgroundColor="primary.500"
          isFullWidth
          _pressed={{
            mt: "s",
            opacity: 0.6,
          }}
          _disabled={{
            opacity: 0.1,
          }}
        >
          Press Me
        </Button>
        {/* 
        <Image
          width={"100%"}
          height={200}
          loaderType="progressive"
          source={{
            uri: "https://wallpaperaccess.com/full/1713248.jpg",
          }}
          previewSource={{
            uri: "https://www.logolynx.com/images/logolynx/43/430c07f27af3fda19373042528edbe3d.jpeg",
          }}
        />

        <AvatarGroup
          max={2}
          spacing="2xl"
          truncatedBackgroundColor={{
            light: "neutral.200",
            dark: "neutral.700",
          }}
        >
          <Avatar
            name="Rohit Agrawal"
            src="https://pbs.twimg.com/profile_images/1419369145058041856/eshLFaDy_400x400.jpg"
          />
          <Avatar
            name="Rohit Agrawal"
            src="https://avatars.githubusercontent.com/u/29514438?s=400&u=d194d5de8df93f55038130ccc66429f94f8f900f&v=4"
          />
          <Avatar
            name="Rohit Agrawal"
            src="https://instagram.fdel1-3.fna.fbcdn.net/v/t51.2885-19/s320x320/160616189_1075891466264003_198594308312142696_n.jpg?_nc_ht=instagram.fdel1-3.fna.fbcdn.net&_nc_cat=111&_nc_ohc=-URhWepekUsAX_wt_-J&edm=ABfd0MgBAAAA&ccb=7-4&oh=00_AT-caDqy7XqUUTkGv5_QytlFTxtdZ2wVhZDgB4vU3Jl2qQ&oe=61DF5972&_nc_sid=7bff83"
          />
        </AvatarGroup>

        <Input isFullWidth placeholder="Hey there" />

        <Radio variant="filled">Filled Radio</Radio>
        <Radio variant="outline">Outline Radio</Radio> */}

        <CheckBox
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: "timing" }}
          isChecked={disabled}
          onPress={() => setDisabled(!disabled)}
        >
          Button press
        </CheckBox>
      </Screen>
    </ThemeProvider>
  );
};

export default App;
