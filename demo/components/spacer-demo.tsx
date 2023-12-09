import { Box, Text, Spacer, Center } from "../../src";

const SpacerDemo = () => {
  return (
    <Box flexDirection="row">
      <Center p="2" borderRadius="m" bgColor="primary.500">
        <Text color="white" variant="p3" fontWeight="500">
          A
        </Text>
      </Center>
      <Spacer
        p="2"
        alignItems="center"
        bgColor={{ light: "primary.100", dark: "primary.800" }}
      >
        <Text variant="p4" fontSize="2xs">
          Spacing
        </Text>
      </Spacer>
      <Center p="2" borderRadius="m" bgColor="primary.500">
        <Text color="white" variant="p3" fontWeight="500">
          B
        </Text>
      </Center>
      <Spacer
        p="2"
        alignItems="center"
        bgColor={{ light: "primary.100", dark: "primary.800" }}
      >
        <Text variant="p4" fontSize="2xs">
          Spacing
        </Text>
      </Spacer>
      <Center p="2" borderRadius="m" bgColor="primary.500">
        <Text color="white" variant="p3" fontWeight="500">
          A
        </Text>
      </Center>
    </Box>
  );
};

export default SpacerDemo;
