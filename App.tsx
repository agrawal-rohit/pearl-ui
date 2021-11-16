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
import Stack from "./src/components/Atoms/Stack/Stack";
import CheckBox from "./src/components/Molecules/CheckBox/CheckBox";
import Radio from "./src/components/Molecules/Radio/Radio";
import RadioGroup from "./src/components/Molecules/Radio/RadioGroup";
import CheckBoxGroup from "./src/components/Molecules/CheckBox/CheckBoxGroup";

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
  const [checked, setchecked] = useState(false);
  const [checkedGroup, setCheckedGroup] = useState([]);

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
        
        <CheckBoxGroup
          value={checkedGroup}
          size="xl"
          onChange={(value) => {
            // console.log(value);
            setCheckedGroup(value);
          }}
        >
          <Stack direction="vertical">
            <CheckBox value="1">Value 1</CheckBox>
            <CheckBox value="2">Value 2</CheckBox>
            <CheckBox value="3">Value 3</CheckBox>
            <CheckBox value="4">Value 4</CheckBox>
          </Stack>
        </CheckBoxGroup>

        <CheckBox
          size="xl"
          borderRadius="xl"
          isChecked={checked}
          onPress={() => setchecked(!checked)}
          value="1"
        >
          Value 1
        </CheckBox>

        <RadioGroup
          defaultValue="1"
          value="2"
          onChange={(value) => console.log(value)}
        >
          <Stack direction="horizontal" spacing="s">
            <Radio value="1">Value 1</Radio>
            <Radio value="2">Value 2</Radio>
            <Radio value="3">Value 3</Radio>
            <Radio value="4">Value 4</Radio>
          </Stack>
        </RadioGroup>

        <Button isFullWidth onPress={() => console.log(2)}>
          Login
        </Button>
      </Screen> */}
    </ThemeProvider>
  );
};

export default App;
