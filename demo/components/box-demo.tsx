import { Box } from "../../src";

const BoxDemo = () => {
  return (
    <>
      <Box
        width="100%"
        height={200}
        backgroundColor="primary.500"
        marginBottom="4"
      />
      <Box
        width="100%"
        height={200}
        backgroundColor="secondary.500"
        borderRadius="full"
      />
      <Box
        width="100%"
        height={200}
        backgroundColor="white"
        borderWidth={1}
        borderRadius="s"
        marginTop="3"
      />
    </>
  );
};

export default BoxDemo;
