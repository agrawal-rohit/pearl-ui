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
import Spinner from "./src/components/atoms/spinner/spinner";
import Video from "./src/components/molecules/video/video";
import Image from "./src/components/molecules/image/image";
import Radio from "./src/components/molecules/radio/radio";
import RadioGroup from "./src/components/molecules/radio/radio-group";
import CheckBox from "./src/components/molecules/checkbox/checkbox";
import CheckBoxGroup from "./src/components/molecules/checkbox/checkbox-group";
import Textarea from "./src/components/molecules/textarea/textarea";
import Input from "./src/components/molecules/input/input";
import Stack, { HStack } from "./src/components/atoms/stack/stack";
import Button from "./src/components/molecules/button/button";
import IconButton from "./src/components/molecules/icon-button/icon-button";
import Progress from "./src/components/molecules/progress/progress";
import Skeleton from "./src/components/atoms/skeleton/skeleton";
import SkeletonCircle from "./src/components/atoms/skeleton/skeleton-circle";
import ButtonGroup from "./src/components/molecules/button/button-group";
import Box from "./src/components/atoms/box/box";
import SkeletonText from "./src/components/atoms/skeleton/skeleton-text";
import { MotiPressable } from "moti/interactions";
import { Pressable } from "react-native";
import { ResizeMode } from "expo-av";
import { NativeModules } from "react-native";

if (__DEV__) {
  NativeModules.DevSettings.setIsDebuggingRemotely(true);
}

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
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [text, setText] = React.useState("");

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    const progressTimer = setInterval(() => {
      if (progress < 100) setProgress(progress + 10);
    }, 500);
    return () => clearInterval(progressTimer);
  }, [progress]);

  return (
    <Screen>
      {/* <Stack direction="vertical" spacing="6">
        <Video
          w="100%"
          aspectRatio={16 / 9}
          loaderType="progressive"
          source={{
            uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
          }}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          fallbackComponent={
            <Icon
              iconFamily="MaterialIcons"
              iconName="error-outline"
              size="l"
              color="neutral.50"
            />
          }
          previewSource={{
            uri: "https://www.wpbeginner.com/wp-content/uploads/2020/03/ultimate-small-business-resource-coronavirus.png",
          }}
        />

        <Box>
          <Text variant="h5">Image with preview color loading</Text>
          <Image
            mt="4"
            width="30%"
            height={100}
            loaderType="progressive"
            previewColor="blue"
            isCached={false}
            source={{
              uri: "https://wallpaperaccess.com/full/1713248.jpg",
            }}
            previewSource={{
              uri: "https://www.logolynx.com/images/logolynx/43/430c07f27af3fda19373042528edbe3d.jpeg",
            }}
          />
        </Box>

        <Box>
          <Text variant="h5">Image with progressive loading</Text>
          <Image
            mt="4"
            width="100%"
            height={100}
            loaderType="progressive"
            isCached={false}
            source={{
              uri: "https://wallpaperaccess.com/full/1713248.jpg",
            }}
            previewSource={{
              uri: "https://www.logolynx.com/images/logolynx/43/430c07f27af3fda19373042528edbe3d.jpeg",
            }}
          />
        </Box>

        <Box>
          <Text variant="h5">Image with spinner loading</Text>
          <Image
            mt="4"
            width={100}
            height={200}
            boxShadow="2xl"
            loaderType="spinner"
            isCached={false}
            source={{
              uri: "https://www.pixel4k.com/wp-content/uploads/2020/08/the-valley-minimal-4k_1596932776.jpg",
            }}
          />
        </Box>

        <Box>
          <Text variant="h5">Image with error fallback</Text>
          <Image
            mt="4"
            width={100}
            height={100}
            loaderType="progressive"
            fallbackComponent={
              <Icon
                iconFamily="MaterialIcons"
                iconName="error-outline"
                size="l"
                color="neutral.50"
              />
            }
            source={{
              uri: "https://4kwallpapers.com/imas/wallpapers/macos-big-sur-apple-layers-fluidic-colorful-wwdc-stock-2560x1440-1455.jpg",
            }}
            previewSource={{
              uri: "https://www.wpbeginner.com/wp-content/uploads/2020/03/ultimate-small-business-resource-coronavirus.png",
            }}
          />
        </Box>
      </Stack> */}

      <Stack direction="vertical" spacing="4">
        {/* <Skeleton isLoaded={isLoaded}>
          <Stack direction="vertical">
            <Radio isChecked={checked} onPress={() => setChecked(true)}>
              Default Radio
            </Radio>
            <Radio isDisabled>Disabled Radio</Radio>
            <Radio isChecked>Checked Radio</Radio>
            <Radio isInvalid>Error Radio</Radio>
          </Stack>
        </Skeleton>

        <Progress variant="filled" value={progress} />

        <Stack direction="vertical">
          <Radio isChecked={checked} onPress={() => setChecked(true)}>
            Default Radio
          </Radio>
          <Radio isDisabled>Disabled Radio</Radio>
          <Radio isChecked>Checked Radio</Radio>
          <Radio isInvalid>Error Radio</Radio>
        </Stack>

        <Stack direction="vertical">
          <Text variant="h5">Controlled Radio group</Text>
          <RadioGroup
            size="s"
            spacing="1"
            value={radioGroupValue}
            onChange={(newVal) => setRadioGroupValue(newVal)}
          >
            <Radio value="A">A</Radio>
            <Radio value="B">B</Radio>
            <Radio value="C">C</Radio>
          </RadioGroup>
        </Stack>

        <Stack direction="vertical">
          <Text variant="h5">Controlled Checkbox group</Text>
          <CheckBoxGroup
            value={checkboxGroupValue}
            onChange={(newVal) => setCheckboxGroupValue(newVal)}
          >
            <CheckBox value="A">A</CheckBox>
            <CheckBox value="B">B</CheckBox>
            <CheckBox value="C">C</CheckBox>
          </CheckBoxGroup>
        </Stack> */}

        {/* <ButtonGroup variant="outline" isAttached>
          <Button colorScheme="primary">Save</Button>
          <Button
            colorScheme="danger"
            rightIcon={<Icon iconFamily="Ionicons" iconName="md-lock-closed" />}
          >
            Lock
          </Button>
        </ButtonGroup>

        <Video
          w="100%"
          aspectRatio={16 / 9}
          borderRadius="m"
          source={{
            uri: "https://static.videezy.com/system/resources/previews/000/000/080/original/CoffeeCup.mp4",
          }}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
        />

        <Button size="xs">Save</Button>
        <Button size="s">Save</Button>
        <Button size="m">Save</Button>
        <Button size="l">Save</Button> */}

        <ButtonGroup variant="outline" isAttached>
          <IconButton
            icon={<Icon iconFamily="AntDesign" iconName="heart" />}
            colorScheme="primary"
          />
          <IconButton
            colorScheme="danger"
            icon={<Icon iconFamily="AntDesign" iconName="pause" />}
          />
        </ButtonGroup>

        <IconButton
          icon={<Icon iconFamily="AntDesign" iconName="heart" />}
          size="xs"
        >
          Save
        </IconButton>
        <IconButton
          icon={<Icon iconFamily="AntDesign" iconName="heart" />}
          size="s"
        >
          Save
        </IconButton>
        <IconButton
          icon={<Icon iconFamily="AntDesign" iconName="heart" />}
          size="m"
        >
          Save
        </IconButton>
        <IconButton
          isLoading
          icon={<Icon iconFamily="AntDesign" iconName="heart" />}
          size="l"
        >
          Save
        </IconButton>

        {/* <Textarea
          value={text}
          placeholder="Default Textrea"
          onChangeText={(val) => setText(val)}
        />

        <Input
          value={text}
          variant="filled"
          placeholder="Default Filled Input"
          onChangeText={(val) => setText(val)}
        />

        <Input
          size="xs"
          variant="outline"
          placeholder="Small Outline Input"
          leftIcon={<Icon iconFamily="Ionicons" iconName="md-lock-closed" />}
          hasClearButton
          value={text}
          onChangeText={(val) => setText(val)}
        />

        <Input
          size="s"
          variant="outline"
          placeholder="Small Outline Input"
          // leftIcon={<Icon iconFamily="Ionicons" iconName="md-lock-closed" />}
          hasClearButton
          value={text}
          onChangeText={(val) => setText(val)}
        />

        <Input
          size="m"
          variant="outline"
          placeholder="Small Outline Input"
          leftIcon={<Icon iconFamily="Ionicons" iconName="md-lock-closed" />}
          hasClearButton
          value={text}
          onChangeText={(val) => setText(val)}
        />

        <Input
          size="l"
          variant="outline"
          placeholder="Small Outline Input"
          rightIcon={<Icon iconFamily="Ionicons" iconName="md-lock-closed" />}
          hasClearButton
          value={text}
          onChangeText={(val) => setText(val)}
        />

        <Input isFullWidth placeholder="Focused Input" autoFocus />
        <Input isFullWidth isDisabled placeholder="Disabled Input" />
        <Input isFullWidth placeholder="Error Input" isInvalid /> */}
      </Stack>
    </Screen>
  );
};

export default App;
