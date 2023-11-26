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
  Button,
} from "@chakra-ui/react";
import Link from "@docusaurus/Link";
import React from "react";

interface FeatureSectionProps {
  icon: React.FunctionComponent;
  overline: string;
  heading: string;
  gradientColors: string[];
  description: string;
  ctaLink?: string;
  visualElement?: React.ReactElement;
}

const FeatureSection: React.FC<FeatureSectionProps> = (props) => {
  return (
    <Box as="section" mb={{ base: "0", md: "10rem" }}>
      <Flex justify="space-between" direction="column">
        <Box maxW={{ base: "100%", lg: "75%" }} mb={{ base: "3rem" }}>
          <HStack mb={-6} justifyContent={{ base: "center", lg: "flex-start" }}>
            <Icon
              as={props.icon}
              boxSize={30}
              marginBottom={-10}
              color={props.gradientColors[0]}
            />
            <Heading
              fontSize={{ base: 18, md: "xl" }}
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
            fontSize={{ base: 28, sm: "2xl", md: "3xl", lg: "5xl" }}
            textAlign={{ base: "center", lg: "left" }}
            fontWeight="extrabold"
            lineHeight="1.2"
            color={useColorModeValue("gray.700", "white")}
          >
            {props.heading}
          </Heading>

          <Text
            fontSize={{ base: 17, md: "lg" }}
            textAlign={{ base: "center", lg: "left" }}
            mt="8"
            fontWeight="400"
            lineHeight="7"
            color={useColorModeValue("gray.600", "gray.400")}
          >
            {props.description}
          </Text>

          {props.ctaLink && (
            <Flex justifyContent={{ base: "center", md: "flex-start" }}>
              <Button
                size="md"
                mt="7"
                as={Link}
                to={props.ctaLink}
                fontWeight="medium"
                variant="outline"
                borderColor={props.gradientColors[0]}
                color={props.gradientColors[0]}
                sx={{
                  "&:hover": {
                    borderColor: props.gradientColors[1],
                    backgroundColor: "inherit",
                    color: props.gradientColors[1],
                  },
                }}
              >
                Know More
              </Button>
            </Flex>
          )}
        </Box>

        <Box width="100%">
          {props.visualElement && React.cloneElement(props.visualElement)}
        </Box>
      </Flex>
    </Box>
  );
};

export default FeatureSection;
