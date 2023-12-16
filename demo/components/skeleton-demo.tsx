import { useEffect, useState } from "react";
import {
  Text,
  Stack,
  VStack,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Radio,
  Button,
  Icon,
} from "../../src";
import DemoSection from "./demo-section";

const SkeletonDemo = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!isLoaded) {
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isLoaded]);

  return (
    <Stack spacing="6">
      <Button
        size="s"
        alignSelf="flex-end"
        isLoading={!isLoaded}
        leftIcon={<Icon iconFamily="Ionicons" iconName="reload" />}
        onPress={() => setIsLoaded(false)}
      >
        Reload
      </Button>

      <DemoSection label="Controlled Loading">
        <VStack spacing="4">
          <Stack spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Basic
            </Text>
            <Skeleton isLoaded={isLoaded}>
              <Stack direction="vertical">
                <Radio isChecked>Default Radio</Radio>
                <Radio isDisabled>Disabled Radio</Radio>
                <Radio isChecked>Checked Radio</Radio>
                <Radio isInvalid>Error Radio</Radio>
              </Stack>
            </Skeleton>
          </Stack>
        </VStack>
      </DemoSection>

      <DemoSection label="Skeleton Types">
        <VStack spacing="4">
          <Stack spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Basic
            </Text>
            <Skeleton w="100%" h={100} />
          </Stack>

          <Stack spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Circle
            </Text>
            <SkeletonCircle boxSize={100} />
          </Stack>

          <Stack spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Text
            </Text>
            <SkeletonText noOfLines={4} />
          </Stack>
        </VStack>
      </DemoSection>
    </Stack>
  );
};

export default SkeletonDemo;
