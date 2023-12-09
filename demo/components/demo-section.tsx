import { Box, VStack, Text, StackProps } from "../../src";

type DemoSectionProps = StackProps & {
  label: string;
};

const DemoSection: React.FC<DemoSectionProps> = ({
  children,
  label,
  ...props
}) => {
  return (
    <VStack
      spacing="3"
      boxShadow="xs"
      borderWidth={1}
      borderRadius="m"
      bgColor={{ light: "white", dark: "neutral.900" }}
      borderColor={{ light: "neutral.200", dark: "neutral.600" }}
      {...props}
    >
      <Box
        px="5"
        py="3"
        bgColor={{ light: "neutral.100", dark: "neutral.700" }}
        borderBottomWidth={1}
        borderColor={{ light: "neutral.200", dark: "neutral.600" }}
      >
        <Text variant="h6">{label}</Text>
      </Box>
      <VStack p="5" spacing="6">
        {children}
      </VStack>
    </VStack>
  );
};

export default DemoSection;
