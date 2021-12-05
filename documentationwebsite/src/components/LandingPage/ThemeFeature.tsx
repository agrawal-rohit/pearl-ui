import {
  Flex,
  HStack,
  Icon,
  Img,
  useColorModeValue,
  Wrap,
} from "@chakra-ui/react";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import Highlight, { defaultProps } from "prism-react-renderer";
import palenight from "prism-react-renderer/themes/palenight";
import React from "react";
import { BiTransfer } from "react-icons/bi";

const colorCode = `const palette = {
    neutral: {
        50: "#FFFFFF",
        100: "#F7F9FC",
        200: "#EDF1F7",
        300: "#E4E9F2",
        400: "#C5CEE0",
        500: "#8F9BB3",
        600: "#58617A",
        700: "#2E3A59",
        800: "#222B45",
        900: "#1A2138",
    },

    primary: {
        50: "#F0F2FF",
        100: "#E1E6FF",
        200: "#C3CCFF",
        300: "#A5B1FF",
        400: "#8F9DFF",
        500: "#6A7BFF",
        600: "#4D5BDB",
        700: "#3541B7",
        800: "#212A93",
        900: "#141B7A",
    },

    secondary: {
        50: "#FFF1F4",
        100: "#FFE1E7",
        200: "#FFC3D6",
        300: "#FFA5CB",
        400: "#FF8FC9",
        500: "#FF6AC6",
        600: "#DB4DB3",
        700: "#B7359F",
        800: "#93218A",
        900: "#78147A",
    },
    ...
}`;

const typographyCode = `const fontSizes = {
  "2xs": 10,
  xs: 12,
  ...
  "11xl": 40,
  "12xl": 42,
};

const lineHeights = {
  "2xs": 14,
  xs: 16,
  ...
  "11xl": 44,
  "12xl": 46,
};

const fontWeights = {
  hairline: "100",
  thin: "200",
  light: "300",
  normal: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
  extrabold: "800",
  black: "900",
}`;

const spacingCode = `const spacing = {
  hairline: 2,
  "2xs": 4,
  xs: 8,
  s: 12,
  m: 16,
  l: 24,
  xl: 32,
  "2xl": 40,
  "3xl": 48,
  "4xl": 56,
  "5xl": 64,
  "6xl": 72,
  "7xl": 80,
  "8xl": 88,
  "9xl": 96,
}`;

const elevationCode = `const elevation = {
  xs: {
    shadowColor: "#1A2138",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  s: {
    shadowColor: "#1A2138",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 4,
  },
  ...
  "3xl": {
    shadowColor: "#1A2138",
    shadowOffset: {
      width: 0,
      height: 24,
    },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 24,
  },
  "4xl": {
    shadowColor: "#1A2138",
    shadowOffset: {
      width: 0,
      height: 28,
    },
    shadowOpacity: 0.16,
    shadowRadius: 28,
    elevation: 28,
  },
}`;

const ThemeFeature = (props) => {
  return (
    <Tabs isFitted align="center" colorScheme="brand" variant="line" {...props}>
      <TabList>
        <Wrap>
          <Tab outline={0} _focus={{ outline: 0 }} fontWeight="medium">
            Colors
          </Tab>
          <Tab outline={0} _focus={{ outline: 0 }} fontWeight="medium">
            Typography
          </Tab>
          <Tab outline={0} _focus={{ outline: 0 }} fontWeight="medium">
            Spacing
          </Tab>
          <Tab outline={0} _focus={{ outline: 0 }} fontWeight="medium">
            Elevation
          </Tab>
        </Wrap>
      </TabList>
      <TabPanels>
        {/* PALETTE */}
        <TabPanel px="0" py="10">
          <Flex
            direction="row"
            alignItems="center"
            justifyContent="center"
            display={{ base: "none", md: "flex" }}
          >
            <Img
              src="./img/feature_palette.png"
              w="50%"
              boxShadow="xl"
              alignSelf="center"
              zIndex="2"
              rounded="xl"
            />

            <Icon
              as={BiTransfer}
              boxSize="10"
              color={useColorModeValue("gray.400", "gray.500")}
              mx="50"
            />

            <Highlight
              {...defaultProps}
              code={colorCode}
              language="jsx"
              theme={palenight}
            >
              {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre
                  className={className}
                  style={{
                    ...style,
                    width: "40%",
                    textAlign: "left",
                    padding: 20,
                    paddingLeft: 40,
                  }}
                >
                  {tokens.map((line, i) => (
                    <div {...getLineProps({ line, key: i })}>
                      {line.map((token, key) => (
                        <span {...getTokenProps({ token, key })} />
                      ))}
                    </div>
                  ))}
                </pre>
              )}
            </Highlight>
          </Flex>
          <Tabs
            align="end"
            size="sm"
            colorScheme="neutral"
            variant="solid-rounded"
            display={{ base: "inherit", md: "none" }}
          >
            <TabList>
              <Tab fontWeight="medium">Design</Tab>
              <Tab fontWeight="medium">Code</Tab>
            </TabList>
            <TabPanels>
              <TabPanel px="0">
                <Img
                  src="./img/feature_palette.png"
                  w="100%"
                  boxShadow="xl"
                  alignSelf="flex-start"
                  zIndex="2"
                  rounded="xl"
                />
              </TabPanel>
              <TabPanel>
                <Highlight
                  {...defaultProps}
                  code={colorCode}
                  language="jsx"
                  theme={palenight}
                >
                  {({
                    className,
                    style,
                    tokens,
                    getLineProps,
                    getTokenProps,
                  }) => (
                    <pre
                      className={className}
                      style={{
                        ...style,
                        width: "100%",
                        textAlign: "left",
                        fontSize: "0.8rem",
                        padding: 20,
                      }}
                    >
                      {tokens.map((line, i) => (
                        <div {...getLineProps({ line, key: i })}>
                          {line.map((token, key) => (
                            <span {...getTokenProps({ token, key })} />
                          ))}
                        </div>
                      ))}
                    </pre>
                  )}
                </Highlight>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </TabPanel>

        {/* TYPOGRAPHY */}
        <TabPanel px="0" py="10">
          <Flex
            direction="row"
            alignItems="center"
            justifyContent="center"
            display={{ base: "none", md: "flex" }}
          >
            <Img
              src="./img/feature_typography.png"
              w="50%"
              boxShadow="xl"
              alignSelf="center"
              zIndex="2"
              rounded="xl"
            />

            <Icon
              as={BiTransfer}
              boxSize="10"
              color={useColorModeValue("gray.400", "gray.500")}
              mx="50"
            />

            <Highlight
              {...defaultProps}
              code={typographyCode}
              language="jsx"
              theme={palenight}
            >
              {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre
                  className={className}
                  style={{
                    ...style,
                    width: "40%",
                    textAlign: "left",
                    padding: 20,
                    paddingLeft: 40,
                  }}
                >
                  {tokens.map((line, i) => (
                    <div {...getLineProps({ line, key: i })}>
                      {line.map((token, key) => (
                        <span {...getTokenProps({ token, key })} />
                      ))}
                    </div>
                  ))}
                </pre>
              )}
            </Highlight>
          </Flex>
          <Tabs
            align="end"
            size="sm"
            colorScheme="neutral"
            variant="solid-rounded"
            display={{ base: "inherit", md: "none" }}
          >
            <TabList>
              <Tab fontWeight="medium">Design</Tab>
              <Tab fontWeight="medium">Code</Tab>
            </TabList>
            <TabPanels>
              <TabPanel px="0">
                <Img
                  src="./img/feature_typography.png"
                  w="100%"
                  boxShadow="xl"
                  alignSelf="flex-start"
                  zIndex="2"
                  rounded="xl"
                />
              </TabPanel>
              <TabPanel>
                <Highlight
                  {...defaultProps}
                  code={typographyCode}
                  language="jsx"
                  theme={palenight}
                >
                  {({
                    className,
                    style,
                    tokens,
                    getLineProps,
                    getTokenProps,
                  }) => (
                    <pre
                      className={className}
                      style={{
                        ...style,
                        width: "100%",
                        textAlign: "left",
                        fontSize: "0.8rem",
                        padding: 20,
                      }}
                    >
                      {tokens.map((line, i) => (
                        <div {...getLineProps({ line, key: i })}>
                          {line.map((token, key) => (
                            <span {...getTokenProps({ token, key })} />
                          ))}
                        </div>
                      ))}
                    </pre>
                  )}
                </Highlight>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </TabPanel>

        {/* SPACING */}
        <TabPanel px="0" py="10">
          <Flex
            direction="row"
            alignItems="center"
            justifyContent="center"
            display={{ base: "none", md: "flex" }}
          >
            <Img
              src="./img/feature_spacing.png"
              w="40%"
              boxShadow="xl"
              alignSelf="center"
              zIndex="2"
              rounded="xl"
            />

            <Icon
              as={BiTransfer}
              boxSize="10"
              color={useColorModeValue("gray.400", "gray.500")}
              mx="50"
            />

            <Highlight
              {...defaultProps}
              code={spacingCode}
              language="jsx"
              theme={palenight}
            >
              {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre
                  className={className}
                  style={{
                    ...style,
                    width: "40%",
                    textAlign: "left",
                    padding: 20,
                    paddingLeft: 40,
                  }}
                >
                  {tokens.map((line, i) => (
                    <div {...getLineProps({ line, key: i })}>
                      {line.map((token, key) => (
                        <span {...getTokenProps({ token, key })} />
                      ))}
                    </div>
                  ))}
                </pre>
              )}
            </Highlight>
          </Flex>
          <Tabs
            align="end"
            size="sm"
            colorScheme="neutral"
            variant="solid-rounded"
            display={{ base: "inherit", md: "none" }}
          >
            <TabList>
              <Tab fontWeight="medium">Design</Tab>
              <Tab fontWeight="medium">Code</Tab>
            </TabList>
            <TabPanels>
              <TabPanel px="0">
                <Img
                  src="./img/feature_spacing.png"
                  w="100%"
                  boxShadow="xl"
                  alignSelf="flex-start"
                  zIndex="2"
                  rounded="xl"
                />
              </TabPanel>
              <TabPanel>
                <Highlight
                  {...defaultProps}
                  code={spacingCode}
                  language="jsx"
                  theme={palenight}
                >
                  {({
                    className,
                    style,
                    tokens,
                    getLineProps,
                    getTokenProps,
                  }) => (
                    <pre
                      className={className}
                      style={{
                        ...style,
                        width: "100%",
                        textAlign: "left",
                        fontSize: "0.8rem",
                        padding: 20,
                      }}
                    >
                      {tokens.map((line, i) => (
                        <div {...getLineProps({ line, key: i })}>
                          {line.map((token, key) => (
                            <span {...getTokenProps({ token, key })} />
                          ))}
                        </div>
                      ))}
                    </pre>
                  )}
                </Highlight>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </TabPanel>

        {/* ELEVATION */}
        <TabPanel px="0" py="10">
          <Flex
            direction="row"
            alignItems="center"
            justifyContent="center"
            display={{ base: "none", md: "flex" }}
          >
            <Img
              src="./img/feature_elevation.png"
              w="40%"
              boxShadow="xl"
              alignSelf="center"
              zIndex="2"
              rounded="xl"
            />

            <Icon
              as={BiTransfer}
              boxSize="10"
              color={useColorModeValue("gray.400", "gray.500")}
              mx="50"
            />

            <Highlight
              {...defaultProps}
              code={elevationCode}
              language="jsx"
              theme={palenight}
            >
              {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre
                  className={className}
                  style={{
                    ...style,
                    width: "40%",
                    textAlign: "left",
                    padding: 20,
                    paddingLeft: 40,
                  }}
                >
                  {tokens.map((line, i) => (
                    <div {...getLineProps({ line, key: i })}>
                      {line.map((token, key) => (
                        <span {...getTokenProps({ token, key })} />
                      ))}
                    </div>
                  ))}
                </pre>
              )}
            </Highlight>
          </Flex>
          <Tabs
            align="end"
            size="sm"
            colorScheme="neutral"
            variant="solid-rounded"
            display={{ base: "inherit", md: "none" }}
          >
            <TabList>
              <Tab fontWeight="medium">Design</Tab>
              <Tab fontWeight="medium">Code</Tab>
            </TabList>
            <TabPanels>
              <TabPanel px="0">
                <Img
                  src="./img/feature_elevation.png"
                  w="100%"
                  boxShadow="xl"
                  alignSelf="flex-start"
                  zIndex="2"
                  rounded="xl"
                />
              </TabPanel>
              <TabPanel>
                <Highlight
                  {...defaultProps}
                  code={elevationCode}
                  language="jsx"
                  theme={palenight}
                >
                  {({
                    className,
                    style,
                    tokens,
                    getLineProps,
                    getTokenProps,
                  }) => (
                    <pre
                      className={className}
                      style={{
                        ...style,
                        width: "100%",
                        textAlign: "left",
                        fontSize: "0.8rem",
                        padding: 20,
                      }}
                    >
                      {tokens.map((line, i) => (
                        <div {...getLineProps({ line, key: i })}>
                          {line.map((token, key) => (
                            <span {...getTokenProps({ token, key })} />
                          ))}
                        </div>
                      ))}
                    </pre>
                  )}
                </Highlight>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default ThemeFeature;
