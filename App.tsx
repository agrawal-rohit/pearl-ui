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
import { ThemeProvider } from "./src/theme/src/theme-context";
import Screen from "./src/components/atoms/screen/screen";
import Pressable from "./src/components/atoms/pressable/pressable";
import ComponentCard from "./demo/components/component-card";
import Text from "./src/components/atoms/text/text";
import Icon from "./src/components/atoms/icon/icon";
import BoxDemo from "./demo/components/box-demo";
import CenterDemo from "./demo/components/center-demo";
import StackDemo from "./demo/components/stack-demo";
import GridDemo from "./demo/components/grid-demo";
import ScreenDemo from "./demo/components/screen-demo";
import SpacerDemo from "./demo/components/spacer-demo";
import DividerDemo from "./demo/components/divider-demo";
import TextDemo from "./demo/components/text-demo";
import IconDemo from "./demo/components/icon-demo";
import ImageDemo from "./demo/components/image-demo";
import AvatarDemo from "./demo/components/avatar-demo";
import VideoDemo from "./demo/components/video-demo";
import PressableDemo from "./demo/components/pressable-demo";
import ButtonDemo from "./demo/components/button-demo";
import IconButtonDemo from "./demo/components/icon-button-demo";
import InputDemo from "./demo/components/input-demo";
import PinInputDemo from "./demo/components/pin-input-demo";
import ListDemo from "./demo/components/list-demo";
import SwitchDemo from "./demo/components/switch-demo";
import TextareaDemo from "./demo/components/textarea-demo";
import CheckboxDemo from "./demo/components/checkbox-demo";
import RadioDemo from "./demo/components/radio-demo";
import SpinnerDemo from "./demo/components/spinner-demo";
import SkeletonDemo from "./demo/components/skeleton-demo";
import BadgeDemo from "./demo/components/badge-demo";
import ProgressDemo from "./demo/components/progress-demo";
import FadeDemo from "./demo/components/fade-demo";
import ScaleFadeDemo from "./demo/components/scale-fade-demo";
import SlideDemo from "./demo/components/slide-demo";
import SlideFadeDemo from "./demo/components/slide-fade-demo";
import CollapseDemo from "./demo/components/collapse-demo";
import AccordionDemo from "./demo/components/accordion-demo";
import Stack, { HStack } from "./src/components/atoms/stack/stack";
import IconButton from "./src/components/molecules/icon-button/icon-button";
import Box from "./src/components/atoms/box/box";
import { FlatList, ScrollView } from "react-native";
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  useResponsiveProp,
  useTheme,
} from "./src";
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

  return (
    <ThemeProvider initialColorMode="light" haveFontsLoaded={haveFontsLoaded}>
      <Index />
    </ThemeProvider>
  );
};

const componentList: {
  label: string;
  imageSrc: any;
  component?: React.ReactNode;
  scrollable?: boolean;
}[] = [
  {
    label: "Box",
    imageSrc: require("./demo/assets/box.png"),
    component: <BoxDemo />,
  },
  {
    label: "Center",
    imageSrc: require("./demo/assets/center.png"),
    component: <CenterDemo />,
  },
  {
    label: "Stack",
    imageSrc: require("./demo/assets/stack.png"),
    component: <StackDemo />,
  },
  {
    label: "Grid",
    imageSrc: require("./demo/assets/grid.png"),
    component: <GridDemo />,
  },
  {
    label: "Screen",
    imageSrc: require("./demo/assets/screen.png"),
    component: <ScreenDemo />,
    scrollable: false,
  },
  {
    label: "Spacer",
    imageSrc: require("./demo/assets/spacer.png"),
    component: <SpacerDemo />,
  },
  {
    label: "Divider",
    imageSrc: require("./demo/assets/divider.png"),
    component: <DividerDemo />,
  },
  {
    label: "Text",
    imageSrc: require("./demo/assets/text.png"),
    component: <TextDemo />,
  },
  {
    label: "List",
    imageSrc: require("./demo/assets/list.png"),
    component: <ListDemo />,
  },
  {
    label: "Accordion",
    imageSrc: require("./demo/assets/accordion.png"),
    component: <AccordionDemo />,
  },
  {
    label: "Icon",
    imageSrc: require("./demo/assets/icon.png"),
    component: <IconDemo />,
  },
  {
    label: "Image",
    imageSrc: require("./demo/assets/image.png"),
    component: <ImageDemo />,
  },
  {
    label: "Avatar",
    imageSrc: require("./demo/assets/avatar.png"),
    component: <AvatarDemo />,
  },
  {
    label: "Video",
    imageSrc: require("./demo/assets/video.png"),
    component: <VideoDemo />,
  },
  {
    label: "Pressable",
    imageSrc: require("./demo/assets/pressable.png"),
    component: <PressableDemo />,
  },
  {
    label: "Button",
    imageSrc: require("./demo/assets/button.png"),
    component: <ButtonDemo />,
  },
  {
    label: "Icon Button",
    imageSrc: require("./demo/assets/icon-button.png"),
    component: <IconButtonDemo />,
  },
  {
    label: "Input",
    imageSrc: require("./demo/assets/input.png"),
    component: <InputDemo />,
  },
  {
    label: "Pin Input",
    imageSrc: require("./demo/assets/pin-input.png"),
    component: <PinInputDemo />,
  },
  {
    label: "Switch",
    imageSrc: require("./demo/assets/switch.png"),
    component: <SwitchDemo />,
  },
  {
    label: "Textarea",
    imageSrc: require("./demo/assets/textarea.png"),
    component: <TextareaDemo />,
  },
  {
    label: "Checkbox",
    imageSrc: require("./demo/assets/checkbox.png"),
    component: <CheckboxDemo />,
  },
  {
    label: "Radio",
    imageSrc: require("./demo/assets/radio.png"),
    component: <RadioDemo />,
  },
  {
    label: "Spinner",
    imageSrc: require("./demo/assets/spinner.png"),
    component: <SpinnerDemo />,
  },
  {
    label: "Skeleton",
    imageSrc: require("./demo/assets/skeleton.png"),
    component: <SkeletonDemo />,
  },
  {
    label: "Badge",
    imageSrc: require("./demo/assets/badge.png"),
    component: <BadgeDemo />,
  },
  {
    label: "Progress",
    imageSrc: require("./demo/assets/progress.png"),
    component: <ProgressDemo />,
  },
  {
    label: "Fade",
    imageSrc: require("./demo/assets/fade.png"),
    component: <FadeDemo />,
  },
  {
    label: "Scale Fade",
    imageSrc: require("./demo/assets/scale-fade.png"),
    component: <ScaleFadeDemo />,
  },
  {
    label: "Slide",
    imageSrc: require("./demo/assets/slide.png"),
    component: <SlideDemo />,
  },
  {
    label: "Slide Fade",
    imageSrc: require("./demo/assets/slide-fade.png"),
    component: <SlideFadeDemo />,
  },
  {
    label: "Collapse",
    imageSrc: require("./demo/assets/collapse.png"),
    component: <CollapseDemo />,
  },
];

const Index = () => {
  const { colorMode, toggleColorMode } = useTheme();
  const [activeComponent, setActiveComponent] = useState<string | undefined>(
    undefined
  );
  const numColumns = useResponsiveProp({
    phone: 2,
    largeTablet: 8,
  });

  const renderMainComponent = () => {
    if (!activeComponent)
      return (
        <FlatList
          data={componentList}
          horizontal={false}
          numColumns={numColumns}
          renderItem={({ item, index }) => (
            <ComponentCard
              label={item.label}
              imageSrc={item.imageSrc}
              onPress={() => {
                if (!!item.component) setActiveComponent(item.label);
              }}
              from={{ opacity: 0, translateY: 10 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{
                type: "timing",
                duration: 50,
                opacity: {
                  type: "timing",
                  duration: 150,
                  delay: index * 100,
                },
                translateY: {
                  type: "timing",
                  duration: 150,
                  delay: index * 100,
                },
              }}
            />
          )}
          keyExtractor={(item) => item.label}
          style={{ padding: 10 }}
        />
      );

    const foundComponent = componentList.find(
      (comp) => comp.label === activeComponent
    );
    if (foundComponent && foundComponent.component) {
      const mainElm = (
        <Box
          p="5"
          w="100%"
          h="100%"
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: "timing", duration: 150 }}
        >
          {foundComponent.component}
        </Box>
      );

      if (foundComponent.scrollable === false) return mainElm;

      return <ScrollView style={{ height: "100%" }}>{mainElm}</ScrollView>;
    }

    return null;
  };

  // return (
  //   <Screen>
  //     <Accordion>
  //       <AccordionItem>
  //         <AccordionButton>
  //           <Text>Accordion Section 1</Text>
  //         </AccordionButton>
  //         <AccordionPanel>
  //           <Text>
  //             This is the content for the first section of the accordion. It can
  //             be replaced with any content you like.
  //           </Text>
  //         </AccordionPanel>
  //       </AccordionItem>

  //       <AccordionItem>
  //         <AccordionButton>
  //           <Text>Accordion Section 2</Text>
  //         </AccordionButton>
  //         <AccordionPanel>
  //           <Text>
  //             This is the content for the second section of the accordion. It
  //             can be replaced with any content you like.
  //           </Text>
  //         </AccordionPanel>
  //       </AccordionItem>
  //     </Accordion>
  //   </Screen>
  // );

  return (
    <Screen p="0" scrollable={false}>
      <Stack direction="vertical" flex={1} spacing="0">
        <Box
          py="1.5"
          flexDirection="row"
          borderBottomWidth={1}
          borderColor={{ light: "neutral.300", dark: "neutral.600" }}
          justifyContent="space-between"
          alignItems="center"
          style={{
            paddingHorizontal: 20,
          }}
        >
          <HStack alignItems="center">
            {!!activeComponent && (
              <Pressable
                onPress={() => setActiveComponent(undefined)}
                alignSelf="center"
              >
                <Icon
                  rawSize={15}
                  color={{
                    light: "neutral.900",
                    dark: "neutral.50",
                  }}
                  iconFamily="Feather"
                  iconName="chevron-left"
                />
              </Pressable>
            )}
            <Text fontWeight="semibold">
              {!!activeComponent ? activeComponent : "Pearl UI - Showcase"}
            </Text>
          </HStack>
          <IconButton
            size="s"
            variant="ghost"
            onPress={toggleColorMode}
            icon={
              <Icon
                rawSize={15}
                iconFamily="Feather"
                iconName={colorMode === "light" ? "sun" : "moon"}
              />
            }
          />
        </Box>

        {renderMainComponent()}
      </Stack>
    </Screen>
  );
};

export default App;
