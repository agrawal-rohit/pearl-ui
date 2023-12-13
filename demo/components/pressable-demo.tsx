import { useState } from "react";
import { Text, Stack, Pressable, HStack } from "../../src";

const PressableDemo = () => {
  const [count, setCount] = useState(0);

  return (
    <Stack spacing="8">
      <HStack spacing="0" alignItems="center">
        <Text variant="h5">Count: </Text>
        <Text variant="p2" lineHeight="3xl">
          {count}
        </Text>
      </HStack>

      <Stack spacing="3">
        <Pressable
          p="4"
          w="100%"
          borderRadius="m"
          backgroundColor="primary.500"
          _pressed={{
            opacity: 0.7,
          }}
          onPress={() => {
            setCount(count + 1);
          }}
        >
          <Text variant="p4" fontWeight="500" color="white">
            Increase by 1
          </Text>
        </Pressable>

        <Pressable
          p="4"
          w="100%"
          borderRadius="m"
          backgroundColor="secondary.500"
          _pressed={{
            opacity: 0.7,
          }}
          onPress={() => {
            setCount(count + 5);
          }}
        >
          <Text variant="p4" fontWeight="500" color="white">
            Increase by 5
          </Text>
        </Pressable>

        <Pressable
          p="4"
          w="100%"
          borderRadius="m"
          backgroundColor="red"
          isDisabled
          _disabled={{
            opacity: 0.3,
          }}
          onPress={() => {
            setCount(count + 5);
          }}
        >
          <Text variant="p4" fontWeight="500" color="white">
            I am disabled
          </Text>
        </Pressable>
      </Stack>
    </Stack>
  );
};

export default PressableDemo;
