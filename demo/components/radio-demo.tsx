import { useState } from "react";
import {
  Text,
  Stack,
  HStack,
  VStack,
  CheckBox,
  Radio,
  RadioGroup,
} from "../../src";
import DemoSection from "./demo-section";

const RadioDemo = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [radioGroupValue, setRadioGroupValue] = useState("B");

  return (
    <Stack spacing="6">
      <DemoSection label="Radio Sizes">
        <VStack spacing="4">
          <Stack spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              xs
            </Text>
            <Radio
              size="xs"
              isChecked={isChecked}
              onPress={() => setIsChecked(!isChecked)}
            >
              Check me out!
            </Radio>
          </Stack>

          <Stack spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              s
            </Text>
            <Radio
              size="s"
              isChecked={isChecked}
              onPress={() => setIsChecked(!isChecked)}
            >
              Check me out!
            </Radio>
          </Stack>

          <Stack spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              m
            </Text>
            <Radio
              size="m"
              isChecked={isChecked}
              onPress={() => setIsChecked(!isChecked)}
            >
              Check me out!
            </Radio>
          </Stack>

          <Stack spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              l
            </Text>
            <Radio
              size="l"
              isChecked={isChecked}
              onPress={() => setIsChecked(!isChecked)}
            >
              Check me out!
            </Radio>
          </Stack>
        </VStack>
      </DemoSection>

      <DemoSection label="Radio Variants">
        <VStack spacing="4">
          <Stack spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Filled
            </Text>
            <Radio
              variant="filled"
              isChecked={isChecked}
              onPress={() => setIsChecked(!isChecked)}
            >
              Check me out!
            </Radio>
          </Stack>

          <Stack spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Outline
            </Text>
            <Radio
              variant="outline"
              isChecked={isChecked}
              onPress={() => setIsChecked(!isChecked)}
            >
              Check me out!
            </Radio>
          </Stack>
        </VStack>
      </DemoSection>

      <DemoSection label="Grouping Radios">
        <VStack spacing="4">
          <HStack>
            <Text variant="p3">Current value: </Text>
            <Text variant="p3">{`"${radioGroupValue}"`}</Text>
          </HStack>
          <RadioGroup
            value={radioGroupValue}
            onChange={(newVal) => setRadioGroupValue(newVal)}
          >
            <Radio value="A">A</Radio>
            <Radio value="B">B</Radio>
            <Radio value="C">C</Radio>
          </RadioGroup>
        </VStack>
      </DemoSection>

      <DemoSection label="Color Schemes">
        <HStack w="100%" justifyContent="space-between">
          <Stack alignItems="center" spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Primary
            </Text>
            <Radio
              colorScheme="primary"
              isChecked={isChecked}
              onPress={() => setIsChecked(!isChecked)}
            />
          </Stack>

          <Stack alignItems="center" spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Warning
            </Text>
            <Radio
              colorScheme="warning"
              isChecked={isChecked}
              onPress={() => setIsChecked(!isChecked)}
            />
          </Stack>

          <Stack alignItems="center" spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Danger
            </Text>
            <Radio
              colorScheme="danger"
              isChecked={isChecked}
              onPress={() => setIsChecked(!isChecked)}
            />
          </Stack>
        </HStack>
      </DemoSection>

      <DemoSection label="Radio States">
        <VStack spacing="4">
          <Stack spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Unchecked
            </Text>
            <Radio isChecked={false}>I am unchecked</Radio>
          </Stack>

          <Stack spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Checked
            </Text>
            <Radio isChecked>I am checked</Radio>
          </Stack>

          <Stack spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Disabled
            </Text>
            <Radio isDisabled>I am disabled</Radio>
          </Stack>

          <Stack spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Invalid
            </Text>
            <Radio isInvalid>I have an error</Radio>
          </Stack>
        </VStack>
      </DemoSection>
    </Stack>
  );
};

export default RadioDemo;
