import React from "react";
import { render } from "@testing-library/react-native";
import Avatar, { AvatarProps } from "./avatar";
import { ThemeProvider } from "../../../theme/src/theme-context";
import Icon, { IconProps } from "../../atoms/icon/icon";
import withBadge from "../badge/withBadge";
import Stack from "../../atoms/stack/stack";
import AvatarGroup from "./avatar-group";

jest.useFakeTimers();

describe("Molecules/Avatar", () => {
  it("passes the snapshot test for different sizes", () => {
    const tree = render(
      <ThemeProvider>
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
            <Avatar backgroundColor="red" name="Rohit Agrawal" size="s" />
            <Avatar backgroundColor="red" name="John" size="m" />
            <Avatar backgroundColor="red" name="Some guy" size="l" />
            <Avatar backgroundColor="red" name="YOYO" size="xl" />
          </Stack>
        </>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("passes the snapshot test for fallback support", () => {
    const tree = render(
      <ThemeProvider>
        <Stack direction="horizontal" spacing="s">
          <Avatar backgroundColor="red" name="Rohit Agrawal" />
          <Avatar
            src="https://4kwallpapers.com/imas/wallpapers/macos-big-sur-apple-layers-fluidic-colorful-wwdc-stock-2560x1440-1455.jpg"
            backgroundColor="red"
            fallbackSource={{
              uri: "https://cdn.segmentnext.com/wp-content/themes/segmentnext/images/no-image-available.jpg",
            }}
          />
          <Avatar
            backgroundColor="neutral.200"
            fallbackComponent={
              <Icon
                iconFamily="FontAwesome"
                iconName="user-circle"
                color="neutral.600"
                rawSize={40}
              />
            }
          />
        </Stack>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("withBadge HOC works as expected", () => {
    const Wrapper = () => {
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
        offset: 0,
      })(Avatar);

      const AvatarWithEdit = withBadge<AvatarProps>(
        <Icon iconFamily="Ionicons" iconName="pencil" size="s" color="white" />,
        {
          placement: "bottomRight",
          size: "m",
          onPress: () => {
            console.log("PRESSED!");
          },
        }
      )(Avatar);
      return (
        <Stack direction="horizontal" spacing="s">
          <OnlineAvatar
            backgroundColor="cyan"
            src="https://pbs.twimg.com/profile_images/1419369145058041856/eshLFaDy_400x400.jpg"
          />

          <OfflineAvatar backgroundColor="cyan" name="Rohit Agrawal" />

          <AvatarWithEdit backgroundColor="red" />
        </Stack>
      );
    };

    const root = render(
      <ThemeProvider>
        <Wrapper />
      </ThemeProvider>
    );

    const tree = root.toJSON();

    expect(tree).toMatchSnapshot();
    expect(root.getByText("0")).toBeTruthy();
  });

  it("passes the snapshot test when used in a group", () => {
    const tree = render(
      <ThemeProvider>
        <AvatarGroup
          spacing="2xl"
          max={2}
          truncatedBackgroundColor="neutral.200"
        >
          <Avatar
            name="Rohit Agrawal"
            src="https://pbs.twimg.com/profile_images/1419369145058041856/eshLFaDy_400x400.jpg"
          />
          <Avatar
            name="Rohit Agrawal"
            src="https://avatars.githubusercontent.com/u/29514438?s=400&u=d194d5de8df93f55038130ccc66429f94f8f900f&v=4"
          />
          <Avatar
            name="Rohit Agrawal"
            src="https://instagram.fdel1-3.fna.fbcdn.net/v/t51.2885-19/s320x320/160616189_1075891466264003_198594308312142696_n.jpg?_nc_ht=instagram.fdel1-3.fna.fbcdn.net&_nc_cat=111&_nc_ohc=-URhWepekUsAX_wt_-J&edm=ABfd0MgBAAAA&ccb=7-4&oh=00_AT-caDqy7XqUUTkGv5_QytlFTxtdZ2wVhZDgB4vU3Jl2qQ&oe=61DF5972&_nc_sid=7bff83"
          />
        </AvatarGroup>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
