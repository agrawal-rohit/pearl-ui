import { VStack, Text } from "../../src";
import DemoSection from "./demo-section";

const TextDemo = () => {
  return (
    <VStack spacing="6">
      <DemoSection label="Heading">
        <Text variant="h1">(h1) Heading 1</Text>
        <Text variant="h2">(h2) Heading 2</Text>
        <Text variant="h3">(h3) Heading 3</Text>
        <Text variant="h4">(h4) Heading 4</Text>
        <Text variant="h5">(h5) Heading 5</Text>
        <Text variant="h6">(h6) Heading 6</Text>
      </DemoSection>

      <DemoSection label="Paragraph">
        <Text variant="p1">(p1) Paragraph 1</Text>
        <Text variant="p2">(p2) Paragraph 2</Text>
        <Text variant="p3">(p3) Paragraph 3</Text>
        <Text variant="p4">(p4) Paragraph 4</Text>
      </DemoSection>
    </VStack>
  );
};

export default TextDemo;
