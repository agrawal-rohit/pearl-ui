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
import Stack from "./src/components/Atoms/Stack/Stack";
import Avatar, { AvatarProps } from "./src/components/Molecules/Avatar/Avatar";
import Icon from "./src/components/Atoms/Icon/Icon";
import withBadge from "./src/components/Molecules/Badge/withBadge";
import Image from "./src/components/Molecules/Image/Image";
import Input from "./src/components/Molecules/Input/Input";
import Button from "./src/components/Molecules/Button/Button";
import Text from "./src/components/Atoms/Text/Text";
import Spinner from "./src/components/Atoms/Spinner/Spinner";

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
        <Stack direction="horizontal" spacing="s" mt="s">
          <Avatar size="xl" name="Rohit Agrawal" />

          {/* <Image
            width={200}
            height={200}
            source={{
              uri: "https://wallpaperaccess.com/full/113248.jpg",
            }}
            previewSource={{
              uri: "https://www.logolynx.com/images/logolynx/43/430c07f27af3fda19373042528edbe3d.jpeg",
            }}
            boxShadow="4xl"
          /> */}
          {/* <Avatar
            src="https://4kwallpapers.com/imas/wallpapers/macos-big-sur-apple-layers-fluidic-colorful-wwdc-stock-2560x1440-1455.jpg"
            fallbackSource={{
              uri: "https://cdn.segmentnext.com/wp-content/themes/segmentnext/images/no-image-available.jpg",
            }}
          />
          <Avatar
            backgroundColor="neutral.200"
            fallbackComponent={
              <Icon
                iconFamily="FontAwesome"
                iconName="user-circle"
                color="neutral.600"
                rawSize={55}
              />
            }
          /> */}
        </Stack>
      </Screen>
    </ThemeProvider>
  );
};

export default App;
