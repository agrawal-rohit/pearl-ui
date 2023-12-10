import { VStack, HStack, Icon, Text } from "../../src";
import DemoSection from "./demo-section";

const IconDemo = () => {
  return (
    <VStack spacing="6">
      <DemoSection label="Icon Sizes">
        <HStack w="100%" justifyContent="space-between">
          <VStack alignItems="center" spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              xs
            </Text>
            <Icon
              size="xs"
              color="#0061FE"
              iconFamily="Entypo"
              iconName="dropbox"
            />
          </VStack>

          <VStack alignItems="center" spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              s
            </Text>
            <Icon
              size="s"
              color="#0061FE"
              iconFamily="Entypo"
              iconName="dropbox"
            />
          </VStack>

          <VStack alignItems="center" spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              m
            </Text>
            <Icon
              size="m"
              color="#0061FE"
              iconFamily="Entypo"
              iconName="dropbox"
            />
          </VStack>

          <VStack alignItems="center" spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              l
            </Text>
            <Icon
              size="l"
              color="#0061FE"
              iconFamily="Entypo"
              iconName="dropbox"
            />
          </VStack>
        </HStack>
      </DemoSection>
    </VStack>
  );
};

export default IconDemo;
