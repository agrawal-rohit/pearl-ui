import { useEffect, useState } from "react";
import { Text, Stack, VStack, Progress } from "../../src";
import DemoSection from "./demo-section";

const ProgressDemo = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const progressTimer = setInterval(() => {
      if (progress < 100) setProgress(progress + 10);
    }, 500);
    return () => clearInterval(progressTimer);
  }, [progress]);

  return (
    <Stack spacing="6">
      <DemoSection label="Progress Sizes">
        <VStack spacing="4">
          <Stack spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              xs
            </Text>
            <Progress size="xs" value={progress} />
          </Stack>

          <Stack spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              s
            </Text>
            <Progress size="s" value={progress} />
          </Stack>

          <Stack spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              m
            </Text>
            <Progress size="m" value={progress} />
          </Stack>

          <Stack spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              l
            </Text>
            <Progress size="l" value={progress} />
          </Stack>
        </VStack>
      </DemoSection>

      <DemoSection label="Progress Variants">
        <VStack spacing="4">
          <Stack spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Filled
            </Text>
            <Progress variant="filled" value={progress} />
          </Stack>

          <Stack spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Outline
            </Text>
            <Progress variant="outline" value={progress} />
          </Stack>
        </VStack>
      </DemoSection>

      <DemoSection label="Color Schemes">
        <VStack spacing="4">
          <Stack spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Primary
            </Text>
            <Progress value={progress} colorScheme="primary" />
          </Stack>

          <Stack spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Warning
            </Text>
            <Progress value={progress} colorScheme="warning" />
          </Stack>

          <Stack spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Danger
            </Text>
            <Progress value={progress} colorScheme="danger" />
          </Stack>
        </VStack>
      </DemoSection>
    </Stack>
  );
};

export default ProgressDemo;
