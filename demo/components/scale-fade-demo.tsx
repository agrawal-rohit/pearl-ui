import { useState } from "react";
import { VStack, Box, Button, Text, ScaleFade } from "../../src";

const ScaleFadeDemo = () => {
  const [show, setShow] = useState(true);

  return (
    <VStack spacing="6">
      <Button
        size="s"
        variant="outline"
        alignSelf="flex-end"
        onPress={() => setShow(!show)}
      >
        {show ? "Hide" : "Show"}
      </Button>

      <ScaleFade show={show}>
        <Box mb="4" p="4" bgColor="primary.500" borderRadius="m">
          <Text variant="p3" color="white">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla purus
            mi, aliquet sed augue ac, ullamcorper vulputate nisi.
          </Text>
        </Box>
      </ScaleFade>
    </VStack>
  );
};

export default ScaleFadeDemo;
