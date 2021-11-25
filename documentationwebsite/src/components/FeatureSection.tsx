import {
  Flex,
  Heading,
  SimpleGrid,
  Text,
  Box,
  BoxProps,
  Img,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { mode } from "@chakra-ui/theme-tools";

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

const FeatureSection: React.FC = () => {
  return (
    <Box as="section">
      <Flex justify="space-between" direction={{ base: "column", lg: "row" }}>
        <Box mb={{ lg: "8rem" }}>
          <Heading
            lineHeight="shorter"
            size="2xl"
            letterSpacing="tight"
            color={useColorModeValue("gray.900", "white")}
            fontWeight="extrabold"
          >
            Manage <br />
            <Box as="span" color={useColorModeValue("blue.600", "blue.400")}>
              everything
            </Box>
          </Heading>
          <Text
            mt="4"
            fontSize="lg"
            color={useColorModeValue("gray.600", "gray.400")}
            maxW={{ lg: "md" }}
          >
            One mission control for your business, wherever you go.
          </Text>
        </Box>

        <FeatureImage
          my={{ base: "14", lg: "0" }}
          display={{ base: "block", lg: "none" }}
        />
        <SimpleGrid
          flex="1"
          columns={{ base: 1, md: 2 }}
          spacing={{ base: "3rem", md: "2rem" }}
        ></SimpleGrid>
        <FeatureImage
          maxW={{ lg: "560px" }}
          display={{ base: "none", lg: "block" }}
        />
      </Flex>
    </Box>
  );
};

export default FeatureSection;
