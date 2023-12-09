import { VStack, Divider, HStack } from "../../src";
import DemoSection from "./demo-section";

const DividerDemo = () => {
  return (
    <VStack spacing="6">
      <DemoSection label="Horizontal">
        <VStack spacing="3.5">
          <Divider />
          <Divider bgColor="violet" />
          <Divider length="50%" />
          <Divider length="50%" thickness={5} />
        </VStack>
      </DemoSection>

      <DemoSection label="Vertical">
        <HStack height={200} spacing="3.5">
          <Divider orientation="vertical" />
          <Divider orientation="vertical" bgColor="violet" />
          <Divider orientation="vertical" length="50%" />
          <Divider orientation="vertical" length="50%" thickness={5} />
        </HStack>
      </DemoSection>
    </VStack>
  );
};

export default DividerDemo;
