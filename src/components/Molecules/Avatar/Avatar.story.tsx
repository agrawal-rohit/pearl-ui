import React from "react";
import { storiesOf } from "@storybook/react-native";
import Screen from "../../Atoms/Screen/Screen";
import Avatar, { AvatarProps } from "./Avatar";
import Stack from "../../Atoms/Stack/Stack";
import Icon from "../../Atoms/Icon/Icon";
import withBadge from "../Badge/withBadge";

storiesOf("Avatar", module)
  .addDecorator((getStory) => <Screen>{getStory()}</Screen>)
  .add("Sizes", () => (
    <>
      <Stack direction="horizontal" spacing="s">
        <Avatar
          src="https://pbs.twimg.com/profile_images/1419369145058041856/eshLFaDy_400x400.jpg"
          size="s"
        />
        <Avatar
          src="https://pbs.twimg.com/profile_images/1419369145058041856/eshLFaDy_400x400.jpg"
          size="m"
        />
        <Avatar
          src="https://pbs.twimg.com/profile_images/1419369145058041856/eshLFaDy_400x400.jpg"
          size="l"
        />
        <Avatar
          src="https://pbs.twimg.com/profile_images/1419369145058041856/eshLFaDy_400x400.jpg"
          size="xl"
        />
      </Stack>

      <Stack direction="horizontal" spacing="s" mt="s">
        <Avatar name="Rohit Agrawal" size="s" />
        <Avatar name="John" size="m" />
        <Avatar name="Some guy" size="l" />
        <Avatar name="YOYO" size="xl" />
      </Stack>
    </>
  ))
  .add("Fallbacks", () => (
    <Stack direction="horizontal" spacing="s">
      <Avatar name="Rohit Agrawal" backgroundColor="cyan" />
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
    </Stack>
  ))
  .add("With Badge", () => {
    const OnlineAvatar = withBadge<AvatarProps>(undefined, {
      placement: "bottomRight",
      backgroundColor: "success.500",
      size: "s",
      minW: 15,
      h: 15,
      offset: 0,
    })(Avatar);

    const OfflineAvatar = withBadge<AvatarProps>(0, {
      placement: "bottomRight",
      backgroundColor: "danger.500",
      size: "s",
      minW: 15,
      h: 15,
      offset: 0,
    })(Avatar);

    const AvatarWithEdit = withBadge<AvatarProps>(
      <Icon iconFamily="Ionicons" iconName="pencil" size="s" color="white" />,
      {
        placement: "bottomRight",
        size: "m",
      }
    )(Avatar);

    return (
      <Stack direction="horizontal" spacing="s">
        <OnlineAvatar src="https://pbs.twimg.com/profile_images/1419369145058041856/eshLFaDy_400x400.jpg" />

        <OfflineAvatar name="Rohit Agrawal" />

        <AvatarWithEdit />
      </Stack>
    );
  });
