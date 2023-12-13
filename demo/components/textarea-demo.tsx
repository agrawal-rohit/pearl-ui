import { useState } from "react";
import { Text, Stack, VStack, Icon, Textarea } from "../../src";
import DemoSection from "./demo-section";

const TextareaDemo = () => {
  const [value, setValue] = useState("");

  return (
    <Stack spacing="6">
      <DemoSection label="Textarea Variants">
        <VStack spacing="4">
          <Stack spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Filled
            </Text>
            <Textarea
              variant="filled"
              value={value}
              placeholder="Enter a value"
              onChangeText={(val) => setValue(val)}
            />
          </Stack>

          <Stack spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Outline
            </Text>
            <Textarea
              variant="outline"
              value={value}
              placeholder="Enter a value"
              onChangeText={(val) => setValue(val)}
            />
          </Stack>
        </VStack>
      </DemoSection>

      <DemoSection label="Textarea States">
        <VStack spacing="4">
          <Stack spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Focused
            </Text>
            <Textarea
              autoFocus
              value={value}
              placeholder="Auto-focused textarea"
            />
          </Stack>

          <Stack spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Invalid
            </Text>
            <Textarea isInvalid value={value} placeholder="Invalid textarea" />
          </Stack>

          <Stack spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Disabled
            </Text>
            <Textarea
              isDisabled
              value={value}
              placeholder="Disabled textarea"
            />
          </Stack>
        </VStack>
      </DemoSection>
    </Stack>
  );
};

export default TextareaDemo;
