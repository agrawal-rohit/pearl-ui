import { Text, Stack, VStack, Spinner, HStack, Box } from "../../src";
import DemoSection from "./demo-section";

const SpinnerDemo = () => {
  return (
    <Stack spacing="6">
      <DemoSection label="Spinner Sizes">
        <HStack w="100%" justifyContent="space-between">
          <Stack alignItems="center" spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              xs
            </Text>
            <Spinner size="xs" />
          </Stack>

          <Stack alignItems="center" spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              s
            </Text>
            <Spinner size="s" />
          </Stack>

          <Stack alignItems="center" spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              m
            </Text>
            <Spinner size="m" />
          </Stack>

          <Stack alignItems="center" spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              l
            </Text>
            <Spinner size="l" />
          </Stack>
        </HStack>
      </DemoSection>

      <DemoSection label="Spinner Variants">
        <VStack spacing="4">
          <Stack spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Activity
            </Text>
            <Spinner variant="activity" />
          </Stack>

          <Stack spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Ball
            </Text>
            <Spinner variant="ball" />
          </Stack>

          <Stack spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Bar
            </Text>
            <Spinner variant="bar" />
          </Stack>

          <Stack spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Dot
            </Text>
            <Spinner variant="dot" />
          </Stack>

          <Stack spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Pacman
            </Text>
            <Spinner variant="pacman" />
          </Stack>

          <Stack spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Pulse
            </Text>
            <Spinner variant="pulse" />
          </Stack>

          <Stack spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Skype
            </Text>
            <Spinner variant="skype" />
          </Stack>

          <Stack spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Spinner
            </Text>
            <Spinner variant="spinner" />
          </Stack>

          <Stack spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Wave
            </Text>
            <Spinner variant="wave" />
          </Stack>
        </VStack>
      </DemoSection>

      <DemoSection label="Color Schemes">
        <HStack w="100%" justifyContent="space-between">
          <Stack alignItems="center" spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Primary
            </Text>
            <Spinner colorScheme="primary">Start</Spinner>
          </Stack>

          <Stack alignItems="center" spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Warning
            </Text>
            <Spinner colorScheme="warning">Wait</Spinner>
          </Stack>

          <Stack alignItems="center" spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Danger
            </Text>
            <Spinner colorScheme="danger">Stop</Spinner>
          </Stack>
        </HStack>
      </DemoSection>

      <DemoSection label="Expanded Spinner">
        <Stack spacing="3.5">
          <Box w={200} h={200} backgroundColor="neutral.200" borderRadius="m">
            <Spinner isExpanded />
          </Box>
        </Stack>
      </DemoSection>
    </Stack>
  );
};

export default SpinnerDemo;
