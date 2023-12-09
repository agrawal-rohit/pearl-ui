import { VStack, Divider, HStack, Icon, Text } from "../../src";
import DemoSection from "./demo-section";

const IconDemo = () => {
  return (
    <VStack spacing="6">
      <DemoSection label="Icon Sizes">
        <VStack spacing="3.5">
          <Text variant="p4" textDecorationLine="underline">
            Extra Small
          </Text>
          <Icon
            size="xs"
            color="#0061FE"
            iconFamily="Entypo"
            iconName="dropbox"
          />
        </VStack>

        <VStack spacing="3.5">
          <Text variant="p4" textDecorationLine="underline">
            Small
          </Text>
          <Icon
            size="s"
            color="#0061FE"
            iconFamily="Entypo"
            iconName="dropbox"
          />
        </VStack>

        <VStack spacing="3.5">
          <Text variant="p4" textDecorationLine="underline">
            Medium
          </Text>
          <Icon
            size="m"
            color="#0061FE"
            iconFamily="Entypo"
            iconName="dropbox"
          />
        </VStack>

        <VStack spacing="3.5">
          <Text variant="p4" textDecorationLine="underline">
            Large
          </Text>
          <Icon
            size="l"
            color="#0061FE"
            iconFamily="Entypo"
            iconName="dropbox"
          />
        </VStack>
      </DemoSection>
    </VStack>
  );
};

export default IconDemo;
