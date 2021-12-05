import React from "react";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

// 1. import `ChakraProvider` component
import {
  VStack,
  ChakraProvider,
  Container,
  Text,
  ColorModeScript,
  useColorModeValue,
  Stack,
  Heading,
  Box,
  LightMode,
  Button,
} from "@chakra-ui/react";

import { AiFillBuild } from "react-icons/ai";
import { HiLightningBolt } from "react-icons/hi";
import { CgDarkMode } from "react-icons/cg";
import { IoColorPaletteSharp, IoAccessibility, IoMoon } from "react-icons/io5";
import { theme } from "../theme/chakraTheme";
import { useCustomThemeContext } from "../hooks/useCustomThemeContext";
import Link from "@docusaurus/Link";
import FeatureSection from "../components/FeatureSection";
import ThemeFeature from "../components/LandingPage/ThemeFeature";

function HomepageHeader() {
  const { isDarkTheme } = useCustomThemeContext();

  return (
    <VStack spacing={2}>
      <Box>
        <Heading
          as="h1"
          fontSize={{ base: 32, sm: "4xl", md: "4xl", lg: "6xl" }}
          fontWeight="extrabold"
          marginTop={{ base: 10, md: 14 }}
          maxW="60rem"
          mx="auto"
          lineHeight="1.2"
          textAlign="center"
          letterSpacing="tight"
          color={useColorModeValue("gray.700", "white")}
        >
          Build consistent cross-platform mobile apps with{" "}
          <span style={{ color: "var(--ifm-color-primary)" }}>speed</span>
        </Heading>

        <Text
          fontSize={{ base: 17, md: "lg" }}
          mt="6"
          maxW="3xl"
          mx="auto"
          fontWeight="500"
          lineHeight="7"
          textAlign="center"
          color={useColorModeValue("gray.600", "gray.400")}
        >
          Pearl UI is a powerful UI toolkit that helps you build beautiful
          production-ready mobile apps right out of the box. Skip the designer,
          write cleaner code, and get your product to market faster!
        </Text>

        <Stack
          justify="center"
          direction={{ base: "column", md: "row" }}
          mt="7"
          mb="4"
          spacing="2"
        >
          <LightMode>
            <Button
              as={Link}
              to="/docs/getting-started/introduction"
              size="lg"
              colorScheme="brand"
              sx={{
                "&:hover": {
                  color: "white",
                },
              }}
            >
              Read the Docs
            </Button>
            <Button
              as="a"
              target="_blank"
              href="https://github.com/agrawal-rohit/pearl-ui"
              size="lg"
              color="#1a202c"
              sx={{
                "&:hover": {
                  color: "#1a202c",
                  backgroundColor: "gray.300",
                },
              }}
            >
              Github
            </Button>
          </LightMode>
        </Stack>
      </Box>

      <a
        href="https://www.producthunt.com/posts/pearl-ui?utm_source=badge-review&utm_medium=badge&utm_souce=badge-pearl-ui#discussion-body"
        target="_blank"
        rel="noreferrer"
        style={{ marginBottom: 50, marginTop: 20 }}
      >
        <img
          src={`https://api.producthunt.com/widgets/embed-image/v1/review.svg?post_id=319078&theme=${
            isDarkTheme ? "dark" : "light"
          }`}
          alt="Pearl UI - Design system driven UI framework for React Native | Product Hunt"
          style={{ width: 250, height: 54 }}
          width="250"
          height="54"
        />
      </a>
    </VStack>
  );
}

// TODO: Add dark mode compatibility feature section
// TODO: Add accessiblity feature section
// TODO: Add style props feature section
// TODO: Add atomic design feature section
// TODO: Add consistency feature section

function FeaturesSection() {
  const features = [
    {
      title: "Customizable",
      description:
        "Customize every component to fit your design needs. The entire theme can be controlled via a single config file.",
      icon: <IoColorPaletteSharp fontSize={30} />,
    },
    {
      title: "Accessible",
      description:
        "All components follow the official Android and Apple accessibility guidelines, while providing support for screen readers.",
      icon: <IoAccessibility fontSize={30} />,
    },
    {
      title: "Dark Mode",
      description:
        "Out of the box support for multiple color modes. Let it be light, dark, or based on users' system preferences.",
      icon: <IoMoon fontSize={30} />,
    },
    {
      title: "Developer Experience",
      description:
        "Boost your productivity during development with the help of style props and modular components",
      icon: <HiLightningBolt fontSize={30} />,
    },
    {
      title: "Extendable",
      description:
        "Follows the <a href='https://atomicdesign.bradfrost.com/' target='_blank'>Atomic Design</a> methodology to provide you with modular components that can be used to build complex interfaces.",
      icon: <AiFillBuild fontSize={30} />,
    },
  ];

  return null;
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={theme}>
        <Layout
          title={`${siteConfig.title} - ${siteConfig.tagline}`}
          description="Pearl UI is a design-system-driven framework for developers to build
      beautiful, accessible mobile apps straight out of the box. Take your
      idea from a design mockup to a finished product at the speed of light!"
        >
          <Container maxW="container.xl" px={{ base: "7", md: "" }}>
            <HomepageHeader />
            <Box mb={{ base: 0, lg: "8rem" }} />
            <FeatureSection
              icon={IoColorPaletteSharp}
              overline="Fully Themeable"
              heading="Harness the power of design systems"
              description="Design systems make it easy to scale your user interface and increase visual consistency. Pearl UI allows you define all aspects of a typical design system during development, giving you the power to update the entire look and feel of your app in minutes!"
              gradientColors={["#B24592", "#F15F79"]}
              visualElement={<ThemeFeature />}
              ctaLink="/docs/theming/default-theme"
            />

            <FeatureSection
              icon={CgDarkMode}
              overline="Dark Mode"
              heading="Dark mode made easy"
              description="Design systems make it easy to scale your user interface and increase visual consistency. Pearl UI allows you define all aspects of a typical design system during development, giving you the power to update the entire look and feel of your app in minutes!"
              gradientColors={["#5C258D", "#4389A2"]}
            />
          </Container>
        </Layout>
      </ChakraProvider>
    </>
  );
}
