import React from "react";
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
import { ThemeProvider } from "./src/theme/src/theme-context";
import Screen from "./src/components/atoms/screen/screen";
import Text from "./src/components/atoms/text/text";
import Icon from "./src/components/atoms/icon/icon";
import Radio from "./src/components/molecules/radio/radio";
import RadioGroup from "./src/components/molecules/radio/radio-group";
import CheckBox from "./src/components/molecules/checkbox/checkbox";
import CheckBoxGroup from "./src/components/molecules/checkbox/checkbox-group";
import Textarea from "./src/components/molecules/textarea/textarea";
import Input from "./src/components/molecules/input/input";
import Stack from "./src/components/atoms/stack/stack";
import { HStack } from "./src/components/atoms/stack/stack";
import Center from "./src/components/atoms/center/center";

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
    <ThemeProvider initialColorMode="light" haveFontsLoaded={haveFontsLoaded}>
      <Index />
    </ThemeProvider>
  );
};

const Index = () => {
  const [radioGroupValue, setRadioGroupValue] = React.useState("B");
  const [checkboxGroupValue, setCheckboxGroupValue] = React.useState(["B"]);
  const [checked, setChecked] = React.useState(false);
  const [text, settext] = React.useState("");

  return (
    <Screen>
      <Stack direction="vertical" spacing="8">
        {/* <Stack direction="vertical">
          <Radio isChecked={checked} onPress={() => setChecked(true)}>
            Default Radio
          </Radio>
          <Radio isDisabled>Disabled Radio</Radio>
          <Radio isChecked>Checked Radio</Radio>
          <Radio isInvalid>Error Radio</Radio>
        </Stack>

        <Stack direction="vertical">
          <Text variant="h4">Controlled Radio group</Text>
          <RadioGroup
            value={radioGroupValue}
            onChange={(newVal) => setRadioGroupValue(newVal)}
          >
            <Radio value="A">A</Radio>
            <Radio value="B">B</Radio>
            <Radio value="C">C</Radio>
          </RadioGroup>
        </Stack>

        <Stack direction="vertical">
          <Text variant="h4">Controlled Checkbox group</Text>
          <CheckBoxGroup
            value={checkboxGroupValue}
            onChange={(newVal) => setCheckboxGroupValue(newVal)}
          >
            <CheckBox value="A">A</CheckBox>
            <CheckBox value="B">B</CheckBox>
            <CheckBox value="C">C</CheckBox>
          </CheckBoxGroup>
        </Stack> */}

        <Textarea
          value={text}
          placeholder="Default Textrea"
          onChangeText={(val) => settext(val)}
        />

        <Input
          value={text}
          variant="filled"
          placeholder="Default Filled Input"
          onChangeText={(val) => settext(val)}
        />

        <Input
          size="xs"
          variant="outline"
          placeholder="Small Outline Input"
          leftIcon={<Icon iconFamily="Ionicons" iconName="md-lock-closed" />}
          hasClearButton
          value={text}
          onChangeText={(val) => settext(val)}
        />

        <Input
          size="s"
          variant="outline"
          placeholder="Small Outline Input"
          // leftIcon={<Icon iconFamily="Ionicons" iconName="md-lock-closed" />}
          hasClearButton
          value={text}
          onChangeText={(val) => settext(val)}
        />

        <Input
          size="m"
          variant="outline"
          placeholder="Small Outline Input"
          leftIcon={<Icon iconFamily="Ionicons" iconName="md-lock-closed" />}
          hasClearButton
          value={text}
          onChangeText={(val) => settext(val)}
        />

        <Input
          size="l"
          variant="outline"
          placeholder="Small Outline Input"
          rightIcon={<Icon iconFamily="Ionicons" iconName="md-lock-closed" />}
          hasClearButton
          value={text}
          onChangeText={(val) => settext(val)}
        />

        <Input isFullWidth placeholder="Focused Input" autoFocus />
        <Input isFullWidth isDisabled placeholder="Disabled Input" />
        <Input isFullWidth placeholder="Error Input" isInvalid />
      </Stack>
    </Screen>
  );
};

export default App;
