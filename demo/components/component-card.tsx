import { ImageSourcePropType } from "react-native";
import { Stack, Image, Text, Box, Pressable, PressableProps } from "../../src";

type ComponentCardProps = PressableProps & {
  label: string;
  imageSrc: ImageSourcePropType;
};

const ComponentCard: React.FC<ComponentCardProps> = ({
  label,
  imageSrc,
  ...props
}) => {
  return (
    <Pressable
      flex={1}
      margin="2.5"
      borderRadius="m"
      borderWidth={1}
      borderColor={{ light: "neutral.300", dark: "neutral.600" }}
      bgColor={{ light: "white", dark: "neutral.700" }}
      boxShadow="none"
      _hovered={{
        borderColor: "primary.500",
        boxShadow: "s",
      }}
      _pressed={{
        borderColor: "primary.500",
        boxShadow: "s",
      }}
      {...props}
    >
      <Stack spacing="0" borderRadius="m" overflow="hidden">
        <Image
          w="100%"
          aspectRatio={1}
          borderRadius="none"
          borderTopLeftRadius="m"
          borderTopRightRadius="m"
          source={imageSrc}
        />
        <Box py="1.5" px="3">
          <Text fontSize={13} lineHeight="2xl" fontWeight="medium">
            {label}
          </Text>
        </Box>
      </Stack>
    </Pressable>
  );
};

export default ComponentCard;
