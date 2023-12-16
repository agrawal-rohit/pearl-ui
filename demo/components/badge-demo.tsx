import {
  Text,
  Stack,
  HStack,
  VStack,
  Icon,
  Badge,
  IconProps,
  withBadge,
  AvatarProps,
  Avatar,
  Box,
} from "../../src";
import DemoSection from "./demo-section";

const BadgedIcon = withBadge<IconProps>(1, {
  size: "s",
  placement: "topRight",
  colorScheme: "danger",
})(Icon);

const BadgedIconTwo = withBadge<IconProps>(
  <Icon iconFamily="Ionicons" iconName="pencil" size="xs" color="white" />,
  {
    size: "s",
    placement: "bottomRight",
  }
)(Icon);

const OnlineAvatar = withBadge<AvatarProps>(undefined, {
  placement: "bottomRight",
  backgroundColor: "success.500",
  size: "s",
  minW: 15,
  h: 15,
  offset: -1,
})(Avatar);

const BadgeDemo = () => {
  return (
    <Stack spacing="6">
      <DemoSection label="Badge Sizes">
        <HStack w="100%" justifyContent="space-between">
          <Stack alignItems="center" spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              xs
            </Text>
            <Badge size="xs">Go</Badge>
          </Stack>

          <Stack alignItems="center" spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              s
            </Text>
            <Badge size="s">Go</Badge>
          </Stack>

          <Stack alignItems="center" spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              m
            </Text>
            <Badge size="m">Go</Badge>
          </Stack>

          <Stack alignItems="center" spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              l
            </Text>
            <Badge size="l">Go</Badge>
          </Stack>
        </HStack>
      </DemoSection>

      <DemoSection label="Badge Sizes">
        <HStack w="100%" justifyContent="space-between">
          <Stack alignItems="center" spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Rounded
            </Text>
            <Badge variant="rounded">Go</Badge>
          </Stack>

          <Stack alignItems="center" spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Square
            </Text>
            <Badge variant="square">Go</Badge>
          </Stack>
        </HStack>
      </DemoSection>

      <DemoSection label="Color Schemes">
        <HStack w="100%" justifyContent="space-between">
          <Stack alignItems="center" spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Primary
            </Text>
            <Badge colorScheme="primary">Start</Badge>
          </Stack>

          <Stack alignItems="center" spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Warning
            </Text>
            <Badge colorScheme="warning">Wait</Badge>
          </Stack>

          <Stack alignItems="center" spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Danger
            </Text>
            <Badge colorScheme="danger">Stop</Badge>
          </Stack>
        </HStack>
      </DemoSection>

      <DemoSection label="Badge Content">
        <VStack spacing="4">
          <Stack spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Empty
            </Text>
            <Badge />
          </Stack>

          <Stack spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Text/Number
            </Text>
            <Badge>123</Badge>
          </Stack>

          <Stack spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              Custom Component
            </Text>
            <Badge>
              <Icon
                size="xs"
                iconName="edit"
                iconFamily="Entypo"
                color="neutral.50"
              />
            </Badge>
          </Stack>
        </VStack>
      </DemoSection>

      <DemoSection label="Attached Badges">
        <Box
          w="100%"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <BadgedIcon size="l" iconFamily="FontAwesome" iconName="bell" />
          <OnlineAvatar
            size="s"
            isCached={false}
            src="https://pbs.twimg.com/profile_images/1419369145058041856/eshLFaDy_400x400.jpg"
          />
          <BadgedIconTwo size="l" iconFamily="FontAwesome" iconName="inbox" />
        </Box>
      </DemoSection>
    </Stack>
  );
};

export default BadgeDemo;
