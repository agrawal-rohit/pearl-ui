import { useState } from "react";
import { Text, Stack, VStack, Icon, Input } from "../../src";
import DemoSection from "./demo-section";

const InputDemo = () => {
  const [value, setValue] = useState("");

  return (
    <Stack spacing="6">
      <DemoSection label="Input Sizes">
        <VStack spacing="4">
          <Stack spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              xs
            </Text>
            <Input
              size="xs"
              value={value}
              placeholder="Enter a value"
              onChangeText={(val) => setValue(val)}
            />
          </Stack>

          <Stack spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              s
            </Text>
            <Input
              size="s"
              value={value}
              placeholder="Enter a value"
              onChangeText={(val) => setValue(val)}
            />
          </Stack>

          <Stack spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              m
            </Text>
            <Input
              size="m"
              value={value}
              placeholder="Enter a value"
              onChangeText={(val) => setValue(val)}
            />
          </Stack>

          <Stack spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              l
            </Text>
            <Input
              size="l"
              value={value}
              placeholder="Enter a value"
              onChangeText={(val) => setValue(val)}
            />
          </Stack>
        </VStack>
      </DemoSection>

      <DemoSection label="Input Variants">
        <VStack spacing="4">
          <Stack spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Filled
            </Text>
            <Input
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
            <Input
              variant="outline"
              value={value}
              placeholder="Enter a value"
              onChangeText={(val) => setValue(val)}
            />
          </Stack>
        </VStack>
      </DemoSection>

      <DemoSection label="Input with Icons">
        <VStack spacing="4">
          <Stack spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Left icon
            </Text>
            <Input
              value={value}
              placeholder="Enter a value"
              onChangeText={(val) => setValue(val)}
              leftIcon={
                <Icon iconFamily="Ionicons" iconName="md-lock-closed" />
              }
            />
          </Stack>

          <Stack spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Right icon
            </Text>
            <Input
              value={value}
              placeholder="Enter a value"
              onChangeText={(val) => setValue(val)}
              rightIcon={<Icon iconFamily="Ionicons" iconName="eye" />}
            />
          </Stack>
        </VStack>
      </DemoSection>

      <DemoSection label="Input States">
        <VStack spacing="4">
          <Stack spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Focused
            </Text>
            <Input autoFocus value={value} placeholder="Auto-focused input" />
          </Stack>

          <Stack spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Invalid
            </Text>
            <Input isInvalid value={value} placeholder="Invalid input" />
          </Stack>

          <Stack spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Disabled
            </Text>
            <Input isDisabled value={value} placeholder="Disabled input" />
          </Stack>
        </VStack>
      </DemoSection>
    </Stack>
  );
};

export default InputDemo;
