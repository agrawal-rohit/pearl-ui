import { Box, VStack, HStack, ZStack, Divider, Text } from "../../src";
import DemoSection from "./demo-section";

const StackDemo = () => {
  return (
    <VStack spacing="10">
      <DemoSection label="Horizontal">
        <VStack spacing="3.5">
          <Text variant="p3">Basic</Text>
          <HStack spacing="3">
            <Box w={20} h={20} backgroundColor="primary.500" />
            <Box w={20} h={20} backgroundColor="primary.500" />
            <Box w={20} h={20} backgroundColor="primary.500" />
            <Box w={20} h={20} backgroundColor="primary.500" />
          </HStack>
        </VStack>

        <VStack spacing="3.5">
          <Text variant="p3">With Divider</Text>
          <HStack spacing="3" divider={<Divider bgColor="primary.300" />}>
            <Box w={20} h={100} backgroundColor="primary.500" />
            <Box w={20} h={20} backgroundColor="primary.500" />
            <Box w={20} h={20} backgroundColor="primary.500" />
            <Box w={20} h={20} backgroundColor="primary.500" />
          </HStack>
        </VStack>
      </DemoSection>

      <DemoSection label="Vertical">
        <VStack spacing="3.5">
          <Text variant="p3">Basic</Text>
          <VStack spacing="3">
            <Box w={20} h={20} backgroundColor="primary.500" />
            <Box w={20} h={20} backgroundColor="primary.500" />
            <Box w={20} h={20} backgroundColor="primary.500" />
            <Box w={20} h={20} backgroundColor="primary.500" />
          </VStack>
        </VStack>

        <VStack spacing="3.5">
          <Text variant="p3">With Divider</Text>
          <VStack spacing="3" divider={<Divider bgColor="primary.300" />}>
            <Box w={100} h={20} backgroundColor="primary.500" />
            <Box w="40%" h={20} backgroundColor="primary.500" />
            <Box w={20} h={20} backgroundColor="primary.500" />
            <Box w={20} h={20} backgroundColor="primary.500" />
          </VStack>
        </VStack>
      </DemoSection>

      <DemoSection label="Depth">
        <VStack spacing="3.5">
          <Text variant="p3">Basic</Text>
          <ZStack spacing="30">
            <Box w={50} h={50} backgroundColor="primary.300" />
            <Box w={50} h={50} backgroundColor="primary.400" />
            <Box w={50} h={50} backgroundColor="primary.500" />
          </ZStack>
        </VStack>

        <VStack spacing="3.5">
          <Text variant="p3">Custom Stacking Order</Text>
          <ZStack spacing="30">
            <Box w={50} h={50} backgroundColor="primary.300" />
            <Box w={50} h={50} zIndex="docked" backgroundColor="primary.400" />
            <Box w={50} h={50} backgroundColor="primary.500" />
          </ZStack>
        </VStack>
      </DemoSection>
    </VStack>
  );
};

export default StackDemo;
