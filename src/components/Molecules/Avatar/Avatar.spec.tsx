import React from "react";
import { render } from "@testing-library/react-native";
import Avatar, { AvatarProps } from "./Avatar";
import { ThemeProvider } from "../../../theme/src/themeContext";
import Icon, { IconProps } from "../../Atoms/Icon/Icon";
import withBadge from "../Badge/withBadge";
import Stack from "../../Atoms/Stack/Stack";

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
});