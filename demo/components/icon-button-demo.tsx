import {
  Text,
  Stack,
  HStack,
  VStack,
  Icon,
  ButtonGroup,
  IconButton,
} from "../../src";
import DemoSection from "./demo-section";

const IconButtonDemo = () => {
  return (
    <Stack spacing="6">
      <DemoSection label="Icon Button Sizes">
        <HStack w="100%" justifyContent="space-between">
          <Stack alignItems="center" spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              xs
            </Text>
            <IconButton
              size="xs"
              icon={<Icon iconFamily="AntDesign" iconName="heart" />}
            />
          </Stack>

          <Stack alignItems="center" spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              s
            </Text>
            <IconButton
              size="s"
              icon={<Icon iconFamily="AntDesign" iconName="heart" />}
            />
          </Stack>

          <Stack alignItems="center" spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              m
            </Text>
            <IconButton
              size="m"
              icon={<Icon iconFamily="AntDesign" iconName="heart" />}
            />
          </Stack>

          <Stack alignItems="center" spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              l
            </Text>
            <IconButton
              size="l"
              icon={<Icon iconFamily="AntDesign" iconName="heart" />}
            />
          </Stack>
        </HStack>
      </DemoSection>

      <DemoSection label="Icon Button Variants">
        <HStack w="100%" justifyContent="space-between">
          <Stack alignItems="center" spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Filled
            </Text>
            <IconButton
              variant="filled"
              icon={<Icon iconFamily="AntDesign" iconName="heart" />}
            />
          </Stack>

          <Stack alignItems="center" spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Outline
            </Text>
            <IconButton
              variant="outline"
              icon={<Icon iconFamily="AntDesign" iconName="heart" />}
            />
          </Stack>

          <Stack alignItems="center" spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Ghost
            </Text>
            <IconButton
              variant="ghost"
              icon={<Icon iconFamily="AntDesign" iconName="heart" />}
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
            <IconButton
              colorScheme="primary"
              icon={<Icon iconFamily="AntDesign" iconName="heart" />}
            />
          </Stack>

          <Stack alignItems="center" spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Warning
            </Text>
            <IconButton
              colorScheme="warning"
              icon={<Icon iconFamily="AntDesign" iconName="heart" />}
            />
          </Stack>

          <Stack alignItems="center" spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Danger
            </Text>
            <IconButton
              colorScheme="danger"
              icon={<Icon iconFamily="AntDesign" iconName="heart" />}
            />
          </Stack>
        </HStack>
      </DemoSection>

      <DemoSection label="Grouped Icon Buttons">
        <VStack spacing="4">
          <Stack spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Basic group
            </Text>
            <ButtonGroup variant="outline">
              <IconButton
                icon={<Icon iconFamily="AntDesign" iconName="heart" />}
                colorScheme="primary"
              />
              <IconButton
                colorScheme="danger"
                icon={<Icon iconFamily="AntDesign" iconName="pause" />}
              />
            </ButtonGroup>
          </Stack>

          <Stack spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Attached group
            </Text>
            <ButtonGroup variant="outline" isAttached>
              <IconButton
                icon={<Icon iconFamily="AntDesign" iconName="heart" />}
                colorScheme="primary"
              />
              <IconButton
                colorScheme="danger"
                icon={<Icon iconFamily="AntDesign" iconName="pause" />}
              />
            </ButtonGroup>
          </Stack>
        </VStack>
      </DemoSection>

      <DemoSection label="Icon Button States">
        <VStack spacing="4">
          <Stack spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Loading
            </Text>
            <IconButton
              isLoading
              icon={<Icon iconFamily="AntDesign" iconName="heart" />}
            />
          </Stack>

          <Stack spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Disabled
            </Text>
            <IconButton
              isDisabled
              icon={<Icon iconFamily="AntDesign" iconName="heart" />}
            />
          </Stack>
        </VStack>
      </DemoSection>
    </Stack>
  );
};

export default IconButtonDemo;
