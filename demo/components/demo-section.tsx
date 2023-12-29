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
      spacing="0"
      boxShadow="xs"
      borderWidth={1}
      borderRadius="m"
      bgColor={{ light: "white", dark: "neutral.900" }}
      borderColor={{ light: "neutral.300", dark: "neutral.600" }}
      transition={{
        type: "spring",
        dampingRatio: 1,
        duration: 100,
      }}
      {...props}
    >
      <Box
        px="5"
        py="3"
        borderBottomWidth={1}
        bgColor={{ light: "neutral.100", dark: "neutral.700" }}
        borderColor={{ light: "neutral.300", dark: "neutral.600" }}
        transition={{
          type: "spring",
          dampingRatio: 1,
          duration: 100,
        }}
      >
        <Text variant="h6" fontWeight="500">
          {label}
        </Text>
      </Box>
      <VStack p="5" spacing="6">
        {children}
      </VStack>
    </VStack>
  );
};

export default DemoSection;
