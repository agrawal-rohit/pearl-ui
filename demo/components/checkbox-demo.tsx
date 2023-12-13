import { useState } from "react";
import {
  Text,
  Stack,
  HStack,
  VStack,
  CheckBox,
  CheckBoxGroup,
} from "../../src";
import DemoSection from "./demo-section";

const CheckboxDemo = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [checkboxGroupValue, setCheckboxGroupValue] = useState(["B"]);

  return (
    <Stack spacing="6">
      <DemoSection label="Checkbox Sizes">
        <VStack spacing="4">
          <Stack spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              xs
            </Text>
            <CheckBox
              size="xs"
              isChecked={isChecked}
              onPress={() => setIsChecked(!isChecked)}
            >
              Check me out!
            </CheckBox>
          </Stack>

          <Stack spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              s
            </Text>
            <CheckBox
              size="s"
              isChecked={isChecked}
              onPress={() => setIsChecked(!isChecked)}
            >
              Check me out!
            </CheckBox>
          </Stack>

          <Stack spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              m
            </Text>
            <CheckBox
              size="m"
              isChecked={isChecked}
              onPress={() => setIsChecked(!isChecked)}
            >
              Check me out!
            </CheckBox>
          </Stack>

          <Stack spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              l
            </Text>
            <CheckBox
              size="l"
              isChecked={isChecked}
              onPress={() => setIsChecked(!isChecked)}
            >
              Check me out!
            </CheckBox>
          </Stack>
        </VStack>
      </DemoSection>

      <DemoSection label="Checkbox Variants">
        <VStack spacing="4">
          <Stack spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Filled
            </Text>
            <CheckBox
              variant="filled"
              isChecked={isChecked}
              onPress={() => setIsChecked(!isChecked)}
            >
              Check me out!
            </CheckBox>
          </Stack>

          <Stack spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Outline
            </Text>
            <CheckBox
              variant="outline"
              isChecked={isChecked}
              onPress={() => setIsChecked(!isChecked)}
            >
              Check me out!
            </CheckBox>
          </Stack>
        </VStack>
      </DemoSection>

      <DemoSection label="Checkbox Shapes">
        <HStack w="100%" justifyContent="space-between">
          <Stack alignItems="center" spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Square
            </Text>
            <CheckBox
              shape="square"
              isChecked={isChecked}
              onPress={() => setIsChecked(!isChecked)}
            />
          </Stack>

          <Stack alignItems="center" spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Circle
            </Text>
            <CheckBox
              shape="circle"
              isChecked={isChecked}
              onPress={() => setIsChecked(!isChecked)}
            />
          </Stack>
        </HStack>
      </DemoSection>

      <DemoSection label="Grouping Checkboxes">
        <VStack spacing="4">
          <HStack>
            <Text variant="p3">Checked values: </Text>
            <Text variant="p3">
              {!checkboxGroupValue.length
                ? "(None)"
                : checkboxGroupValue.map((val) => `"${val}"`).join(", ")}
            </Text>
          </HStack>
          <CheckBoxGroup
            value={checkboxGroupValue}
            onChange={(newVal) => setCheckboxGroupValue(newVal)}
          >
            <CheckBox value="A">A</CheckBox>
            <CheckBox value="B">B</CheckBox>
            <CheckBox value="C">C</CheckBox>
          </CheckBoxGroup>
        </VStack>
      </DemoSection>

      <DemoSection label="Color Schemes">
        <HStack w="100%" justifyContent="space-between">
          <Stack alignItems="center" spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Primary
            </Text>
            <CheckBox
              colorScheme="primary"
              isChecked={isChecked}
              onPress={() => setIsChecked(!isChecked)}
            />
          </Stack>

          <Stack alignItems="center" spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Warning
            </Text>
            <CheckBox
              colorScheme="warning"
              isChecked={isChecked}
              onPress={() => setIsChecked(!isChecked)}
            />
          </Stack>

          <Stack alignItems="center" spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Danger
            </Text>
            <CheckBox
              colorScheme="danger"
              isChecked={isChecked}
              onPress={() => setIsChecked(!isChecked)}
            />
          </Stack>
        </HStack>
      </DemoSection>

      <DemoSection label="Checkbox States">
        <VStack spacing="4">
          <Stack spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Unchecked
            </Text>
            <CheckBox isChecked={false}>I am unchecked</CheckBox>
          </Stack>

          <Stack spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Checked
            </Text>
            <CheckBox isChecked>I am checked</CheckBox>
          </Stack>

          <Stack spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Indeterminate
            </Text>
            <CheckBox isIndeterminate isChecked>
              I am indeterminate
            </CheckBox>
          </Stack>

          <Stack spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Disabled
            </Text>
            <CheckBox isDisabled>I am disabled</CheckBox>
          </Stack>

          <Stack spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Invalid
            </Text>
            <CheckBox isInvalid>I have an error</CheckBox>
          </Stack>
        </VStack>
      </DemoSection>
    </Stack>
  );
};

export default CheckboxDemo;
