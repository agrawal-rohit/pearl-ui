import { useState } from "react";
import { VStack, Box, Button, Text, Collapse } from "../../src";
import { Platform } from "react-native";

const CollapseDemo = () => {
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

      <Collapse show={show}>
        <Box mb="4" p="4" bgColor="primary.500" borderRadius="m">
          <Text variant="p3" color="white">
            {Platform.OS === "web"
              ? `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla purus mi, aliquet sed augue ac, ullamcorper vulputate nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla purus mi, aliquet sed augue ac, ullamcorper vulputate nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla purus mi, aliquet sed augue ac, ullamcorper vulputate nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla purus mi, aliquet sed augue ac, ullamcorper vulputate nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla purus mi, aliquet sed augue ac, ullamcorper vulputate nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla purus mi, aliquet sed augue ac, ullamcorper vulputate nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla purus mi, aliquet sed augue ac, ullamcorper vulputate nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla purus mi, aliquet sed augue ac, ullamcorper vulputate nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla purus mi, aliquet sed augue ac, ullamcorper vulputate nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla purus mi, aliquet sed augue ac, ullamcorper vulputate nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla purus mi, aliquet sed augue ac, ullamcorper vulputate nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla purus mi, aliquet sed augue ac, ullamcorper vulputate nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla purus mi, aliquet sed augue ac, ullamcorper vulputate nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla purus mi, aliquet sed augue ac, ullamcorper vulputate nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla purus mi, aliquet sed augue ac, ullamcorper vulputate nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit.`
              : `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla purus mi, aliquet sed augue ac, ullamcorper vulputate nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla purus mi, aliquet sed augue ac, ullamcorper vulputate nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit.`}
          </Text>
        </Box>
      </Collapse>
    </VStack>
  );
};

export default CollapseDemo;
