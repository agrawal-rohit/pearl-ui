import {
  VStack,
  Avatar,
  Text,
  HStack,
  Icon,
  withBadge,
  AvatarProps,
} from "../../src";
import DemoSection from "./demo-section";

const OnlineAvatar = withBadge<AvatarProps>(undefined, {
  placement: "bottomRight",
  backgroundColor: "success.500",
  size: "s",
  minW: 15,
  h: 15,
  offset: -1,
})(Avatar);

const OfflineAvatar = withBadge<AvatarProps>(0, {
  placement: "topRight",
  backgroundColor: "red",
  size: "s",
  offset: 0,
})(Avatar);

const AvatarWithEdit = withBadge<AvatarProps>(
  <Icon iconFamily="Ionicons" iconName="pencil" rawSize={10} color="white" />,
  {
    size: "s",
    placement: "bottomRight",
    transition: {
      type: "timing",
      duration: 100,
    },
    offset: 0,
    _pressed: { backgroundColor: "primary.400" },
  }
)(Avatar);

const AvatarDemo = () => {
  return (
    <VStack spacing="6">
      <DemoSection label="Sizes">
        <HStack w="100%" justifyContent="space-between">
          <VStack alignItems="center" spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              xs
            </Text>
            <Avatar
              size="xs"
              isCached={false}
              src="https://pbs.twimg.com/profile_images/1419369145058041856/eshLFaDy_400x400.jpg"
            />
          </VStack>

          <VStack alignItems="center" spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              s
            </Text>
            <Avatar
              size="s"
              isCached={false}
              src="https://pbs.twimg.com/profile_images/1419369145058041856/eshLFaDy_400x400.jpg"
            />
          </VStack>

          <VStack alignItems="center" spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              m
            </Text>
            <Avatar
              size="m"
              isCached={false}
              src="https://pbs.twimg.com/profile_images/1419369145058041856/eshLFaDy_400x400.jpg"
            />
          </VStack>

          <VStack alignItems="center" spacing="3.5">
            <Text variant="p4" textDecorationLine="underline">
              l
            </Text>
            <Avatar
              size="l"
              isCached={false}
              src="https://pbs.twimg.com/profile_images/1419369145058041856/eshLFaDy_400x400.jpg"
            />
          </VStack>
        </HStack>
      </DemoSection>

      <DemoSection label="Fallback Support">
        <VStack spacing="3.5">
          <Text variant="p4" textDecorationLine="underline">
            Name initials
          </Text>
          <Avatar name="Rohit Agrawal" />
        </VStack>

        <VStack spacing="3.5">
          <Text variant="p4" textDecorationLine="underline">
            Fallback image
          </Text>
          <Avatar
            src="https://4kwallpapers.com/imas/wallpapers/macos-big-sur-apple-layers-fluidic-colorful-wwdc-stock-2560x1440-1455.jpg"
            fallbackSource={{
              uri: "https://thumbs.dreamstime.com/b/person-gray-photo-placeholder-man-shirt-white-background-person-gray-photo-placeholder-man-132818487.jpg",
            }}
          />
        </VStack>

        <VStack spacing="3.5">
          <Text variant="p4" textDecorationLine="underline">
            Fallback component
          </Text>
          <Avatar
            backgroundColor="neutral.200"
            fallbackComponent={
              <Icon
                iconFamily="FontAwesome"
                iconName="user-circle"
                color="neutral.600"
                rawSize={55}
              />
            }
          />
        </VStack>
      </DemoSection>

      <DemoSection label="With Attached Badges">
        <VStack spacing="3.5">
          <Text variant="p4" textDecorationLine="underline">
            Online indiciator
          </Text>
          <OnlineAvatar
            isCached={false}
            src="https://pbs.twimg.com/profile_images/1419369145058041856/eshLFaDy_400x400.jpg"
          />
        </VStack>

        <VStack spacing="3.5">
          <Text variant="p4" textDecorationLine="underline">
            Notification counter
          </Text>
          <OfflineAvatar name="Rohit Agrawal" />
        </VStack>

        <VStack spacing="3.5">
          <Text variant="p4" textDecorationLine="underline">
            Edit icon
          </Text>
          <AvatarWithEdit
            isCached={false}
            backgroundColor="neutral.200"
            fallbackComponent={
              <Icon
                iconFamily="FontAwesome"
                iconName="user-circle"
                color="neutral.600"
                rawSize={55}
              />
            }
          />
        </VStack>
      </DemoSection>
    </VStack>
  );
};

export default AvatarDemo;
