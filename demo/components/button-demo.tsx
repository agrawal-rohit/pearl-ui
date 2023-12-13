import {
  Text,
  Stack,
  HStack,
  Button,
  VStack,
  Icon,
  ButtonGroup,
} from "../../src";
import DemoSection from "./demo-section";

const ButtonDemo = () => {
  return (
    <Stack spacing="6">
      <DemoSection label="Button Sizes">
        <HStack w="100%" justifyContent="space-between">
          <Stack alignItems="center" spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              xs
            </Text>
            <Button size="xs">Go</Button>
          </Stack>

          <Stack alignItems="center" spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              s
            </Text>
            <Button size="s">Go</Button>
          </Stack>

          <Stack alignItems="center" spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              m
            </Text>
            <Button size="m">Go</Button>
          </Stack>

          <Stack alignItems="center" spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              l
            </Text>
            <Button size="l">Go</Button>
          </Stack>
        </HStack>
      </DemoSection>

      <DemoSection label="Button Variants">
        <HStack w="100%" justifyContent="space-between">
          <Stack alignItems="center" spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Filled
            </Text>
            <Button variant="filled">Start</Button>
          </Stack>

          <Stack alignItems="center" spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Outline
            </Text>
            <Button variant="outline">Start</Button>
          </Stack>

          <Stack alignItems="center" spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Ghost
            </Text>
            <Button variant="ghost">Start</Button>
          </Stack>

          <Stack alignItems="center" spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Link
            </Text>
            <Button variant="link">Start</Button>
          </Stack>
        </HStack>
      </DemoSection>

      <DemoSection label="Button with Icons">
        <HStack w="100%" justifyContent="space-between">
          <Stack alignItems="center" spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Left icon
            </Text>
            <Button
              leftIcon={
                <Icon iconFamily="Ionicons" iconName="md-lock-closed" />
              }
            >
              Lock
            </Button>
          </Stack>

          <Stack alignItems="center" spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Right icon
            </Text>
            <Button rightIcon={<Icon iconFamily="Ionicons" iconName="eye" />}>
              Show
            </Button>
          </Stack>
        </HStack>
      </DemoSection>

      <DemoSection label="Color Schemes">
        <HStack w="100%" justifyContent="space-between">
          <Stack alignItems="center" spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Primary
            </Text>
            <Button colorScheme="primary">Start</Button>
          </Stack>

          <Stack alignItems="center" spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Warning
            </Text>
            <Button colorScheme="warning">Wait</Button>
          </Stack>

          <Stack alignItems="center" spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Danger
            </Text>
            <Button colorScheme="danger">Stop</Button>
          </Stack>
        </HStack>
      </DemoSection>

      <DemoSection label="Grouped Buttons">
        <VStack spacing="4">
          <Stack spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Basic group
            </Text>
            <ButtonGroup variant="outline">
              <Button colorScheme="primary">Save</Button>
              <Button
                colorScheme="danger"
                rightIcon={
                  <Icon iconFamily="Ionicons" iconName="md-lock-closed" />
                }
              >
                Lock
              </Button>
            </ButtonGroup>
          </Stack>

          <Stack spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Attached group
            </Text>
            <ButtonGroup variant="outline" isAttached>
              <Button colorScheme="primary">Save</Button>
              <Button
                colorScheme="danger"
                rightIcon={
                  <Icon iconFamily="Ionicons" iconName="md-lock-closed" />
                }
              >
                Lock
              </Button>
            </ButtonGroup>
          </Stack>
        </VStack>
      </DemoSection>

      <DemoSection label="Button States">
        <VStack spacing="4">
          <Stack spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Loading
            </Text>
            <Button isLoading>Loading</Button>
          </Stack>

          <Stack spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Loading (with text)
            </Text>
            <Button isLoading loadingText="Loading">
              Loading
            </Button>
          </Stack>

          <Stack spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Disabled
            </Text>
            <Button isDisabled>I am disabled</Button>
          </Stack>
        </VStack>
      </DemoSection>
    </Stack>
  );
};

export default ButtonDemo;
