import { Center, Text } from "../../src";

const CenterDemo = () => {
  return (
    <>
      <Center
        width="100%"
        height={200}
        backgroundColor="primary.500"
        marginBottom="4"
      >
        <Text color="neutral.100" variant="p3">
          I am centered
        </Text>
      </Center>

      <Center
        width="70%"
        height={100}
        backgroundColor={{ light: "neutral.300", dark: "neutral.600" }}
      >
        <Text variant="p3">I am also centered</Text>
      </Center>
    </>
  );
};

export default CenterDemo;
