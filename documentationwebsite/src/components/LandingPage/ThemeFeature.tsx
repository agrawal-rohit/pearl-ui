import { HStack, Img } from "@chakra-ui/react";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import Highlight, { defaultProps } from "prism-react-renderer";
import palenight from "prism-react-renderer/themes/palenight";
import React from "react";

const exampleCode = `(function someDemo() {
    var test = "Hello World!";
    console.log(test);
  })();
  return () => <App />;`;

const ThemeFeature = (props) => {
  return (
    <Tabs align="center" colorScheme="brand" variant="line">
      <TabList>
        <Tab outline={0} _focus={{ outline: 0 }} fontWeight="medium">
          Colors
        </Tab>
        <Tab outline={0} _focus={{ outline: 0 }} fontWeight="medium">
          Typography
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel px="0">
          <HStack spacing="5rem" display={{ base: "none", md: "flex" }}>
            <Img
              src="./img/feature_palette.png"
              w={{ base: "100%", md: "40%" }}
              boxShadow="xl"
              my="10"
              alignSelf="flex-start"
              rounded="xl"
            />
            <Highlight
              {...defaultProps}
              code={exampleCode}
              language="jsx"
              theme={palenight}
            >
              {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre className={className} style={{ ...style, padding: 20 }}>
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
          </HStack>
        </TabPanel>
        <TabPanel>
          <p>two!</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default ThemeFeature;
