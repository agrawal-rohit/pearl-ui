import {
  Flex,
  Heading,
  SimpleGrid,
  Text,
  Box,
  BoxProps,
  Img,
  Icon,
  useColorModeValue,
  HStack,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
import palenight from "prism-react-renderer/themes/palenight";

const exampleCode = `
(function someDemo() {
  var test = "Hello World!";
  console.log(test);
})();

return () => <App />;
`;

const FeatureImage = (props: BoxProps) => (
  <Box flex="1" {...props}>
    <Img
      objectFit="cover"
      h="100%"
      w="100%"
      src="https://images.unsplash.com/photo-1573878737226-4f9572c22b69?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
      alt=""
    />
  </Box>
);

interface FeatureSectionProps {
  icon: React.FunctionComponent;
  overline: string;
  heading: string;
  gradientColors: string[];
  description: string;
  ctaLink?: string;
}

const FeatureSection: React.FC<FeatureSectionProps> = (props) => {
  return (
    <Box as="section">
      <Flex justify="space-between" direction={{ base: "column", lg: "row" }}>
        <Box maxW={{ base: "100%", lg: "45%" }} mb={{ lg: "8rem" }}>
          <HStack mb={-6}>
            <Icon
              as={props.icon}
              boxSize={30}
              marginBottom={-10}
              color={props.gradientColors[0]}
            />
            <Heading
              fontSize={{ base: 20, md: "xl" }}
              bgGradient={`linear(to-r, ${props.gradientColors[0]}, ${props.gradientColors[1]})`}
              bgClip="text"
              fontWeight="bold"
              textTransform="uppercase"
            >
              {props.overline}
            </Heading>
          </HStack>

          <Heading
            as="h2"
            fontSize={{ base: 32, sm: "4xl", md: "4xl", lg: "4xl" }}
            fontWeight="bold"
            lineHeight="1.2"
            color={useColorModeValue("gray.700", "white")}
          >
            {props.heading}
          </Heading>

          <Text
            fontSize={{ base: 17, md: "lg" }}
            mt="4"
            fontWeight="400"
            lineHeight="7"
            color={useColorModeValue("gray.600", "gray.400")}
          >
            {props.description}
          </Text>

          <Highlight
            {...defaultProps}
            code={exampleCode}
            language="jsx"
            theme={palenight}
          >
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
              <pre className={className} style={style}>
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
        </Box>

        <FeatureImage
          maxW={{ base: "100%", lg: "40%" }}
          my={{ base: "14", lg: "0" }}
        />
      </Flex>
    </Box>
  );
};

export default FeatureSection;
