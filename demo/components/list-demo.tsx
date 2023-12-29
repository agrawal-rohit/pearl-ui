import {
  Text,
  Stack,
  VStack,
  List,
  UnorderedList,
  OrderedList,
  Icon,
} from "../../src";
import DemoSection from "./demo-section";

const ListDemo = () => {
  return (
    <Stack spacing="6">
      <DemoSection label="List Variants">
        <VStack spacing="4">
          <Stack spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Unordered
            </Text>
            <UnorderedList>
              <Text variant="p3">Item 1</Text>
              <Text variant="p3">Item 2</Text>
              <Text variant="p3">Item 3</Text>
              <Text variant="p3">Item 4</Text>
              <Text variant="p3">Item 5</Text>
            </UnorderedList>
          </Stack>

          <Stack spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Ordered
            </Text>
            <OrderedList>
              <Text variant="p3">First Item</Text>
              <Text variant="p3">Second Item</Text>
              <Text variant="p3">Third Item</Text>
              <Text variant="p3">Fourth Item</Text>
              <Text variant="p3">Fifth Item</Text>
            </OrderedList>
          </Stack>

          <Stack spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Custom icon
            </Text>
            <List
              renderIcon={() => (
                <Icon
                  mt="0.75"
                  size="xs"
                  iconName="star"
                  iconFamily="AntDesign"
                  color="primary.500"
                />
              )}
            >
              <Text variant="p3">First Item</Text>
              <Text variant="p3">Second Item</Text>
              <Text variant="p3">Third Item</Text>
              <Text variant="p3">Fourth Item</Text>
              <Text variant="p3">Fifth Item</Text>
            </List>
          </Stack>
        </VStack>
      </DemoSection>
    </Stack>
  );
};

export default ListDemo;
