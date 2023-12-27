import { Text, Stack, VStack, PinInput } from "../../src";
import DemoSection from "./demo-section";

const PinInputDemo = () => {
  return (
    <Stack spacing="6">
      <DemoSection label="Pin Input Sizes">
        <VStack spacing="4">
          <Stack spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              xs
            </Text>
            <PinInput size="xs" />
          </Stack>

          <Stack spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              s
            </Text>
            <PinInput size="s" />
          </Stack>

          <Stack spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              m
            </Text>
            <PinInput size="m" />
          </Stack>

          <Stack spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              l
            </Text>
            <PinInput size="l" />
          </Stack>
        </VStack>
      </DemoSection>

      <DemoSection label="Pin Input Variants">
        <VStack spacing="4">
          <Stack spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Filled
            </Text>
            <PinInput variant="filled" />
          </Stack>

          <Stack spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Outline
            </Text>
            <PinInput variant="outline" />
          </Stack>
        </VStack>
      </DemoSection>

      <DemoSection label="Pin Input States">
        <VStack spacing="4">
          <Stack spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Focused
            </Text>
            <PinInput autoFocus />
          </Stack>

          <Stack spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Invalid
            </Text>
            <PinInput isInvalid />
          </Stack>

          <Stack spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Disabled
            </Text>
            <PinInput isDisabled />
          </Stack>
        </VStack>
      </DemoSection>
    </Stack>
  );
};

export default PinInputDemo;
