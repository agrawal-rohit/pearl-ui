import { useState } from "react";
import { Text, Stack, HStack, VStack, Switch } from "../../src";
import DemoSection from "./demo-section";

const SwitchDemo = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <Stack spacing="6">
      <DemoSection label="Switch Sizes">
        <HStack w="100%" justifyContent="space-between">
          <Stack alignItems="center" spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              xs
            </Text>
            <Switch
              size="xs"
              isChecked={isChecked}
              onPress={() => setIsChecked(!isChecked)}
            />
          </Stack>

          <Stack alignItems="center" spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              s
            </Text>
            <Switch
              size="s"
              isChecked={isChecked}
              onPress={() => setIsChecked(!isChecked)}
            />
          </Stack>

          <Stack alignItems="center" spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              m
            </Text>
            <Switch
              size="m"
              isChecked={isChecked}
              onPress={() => setIsChecked(!isChecked)}
            />
          </Stack>

          <Stack alignItems="center" spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              l
            </Text>
            <Switch
              size="l"
              isChecked={isChecked}
              onPress={() => setIsChecked(!isChecked)}
            />
          </Stack>
        </HStack>
      </DemoSection>

      <DemoSection label="Color Schemes">
        <HStack w="100%" justifyContent="space-between">
          <Stack alignItems="center" spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Primary
            </Text>
            <Switch
              colorScheme="primary"
              isChecked={isChecked}
              onPress={() => setIsChecked(!isChecked)}
            />
          </Stack>

          <Stack alignItems="center" spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Warning
            </Text>
            <Switch
              colorScheme="warning"
              isChecked={isChecked}
              onPress={() => setIsChecked(!isChecked)}
            />
          </Stack>

          <Stack alignItems="center" spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Danger
            </Text>
            <Switch
              colorScheme="danger"
              isChecked={isChecked}
              onPress={() => setIsChecked(!isChecked)}
            />
          </Stack>
        </HStack>
      </DemoSection>

      <DemoSection label="Switch States">
        <VStack spacing="4">
          <Stack spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Unchecked
            </Text>
            <Switch isChecked={false} />
          </Stack>

          <Stack spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Checked
            </Text>
            <Switch isChecked />
          </Stack>

          <Stack spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Disabled
            </Text>
            <Switch isDisabled />
          </Stack>
        </VStack>
      </DemoSection>
    </Stack>
  );
};

export default SwitchDemo;
