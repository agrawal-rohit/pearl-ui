import React from "react";
import { render } from "@testing-library/react-native";
import Badge from "./badge";
import { ThemeProvider } from "../../../theme/src/theme-context";
import Icon, { IconProps } from "../../atoms/icon/icon";
import withBadge from "./withBadge";

jest.useFakeTimers();

describe("Molecules/Badge", () => {
  it("passes the snapshot test for different sizes", () => {
    const tree = render(
      <ThemeProvider>
        <Badge size="xs">2</Badge>
        <Badge size="s">2</Badge>
        <Badge size="m">2</Badge>
        <Badge size="l">2</Badge>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("passes the snapshot test for different variants", () => {
    const tree = render(
      <ThemeProvider>
        <Badge variant="rounded" mb="s">
          2
        </Badge>
        <Badge variant="square" mb="s">
          NEW
        </Badge>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("passes the snapshot test for different color schemes", () => {
    const tree = render(
      <ThemeProvider>
        <Badge colorScheme="primary" mb="s">
          2
        </Badge>
        <Badge colorScheme="success" mb="s">
          2
        </Badge>

        <Badge colorScheme="warning" mb="s">
          2
        </Badge>

        <Badge colorScheme="info" mb="s">
          2
        </Badge>

        <Badge colorScheme="danger" mb="s">
          2
        </Badge>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("passes the snapshot test for different values types", () => {
    const tree = render(
      <ThemeProvider>
        <Badge></Badge>

        <Badge>23</Badge>

        <Badge>{2}+</Badge>

        <Badge>
          <Icon
            iconFamily="Entypo"
            iconName="edit"
            color="neutral.50"
            size="s"
          ></Icon>
        </Badge>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("withBadge HOC works as expected", () => {
    const Wrapper = () => {
      const BadgedIcon = withBadge<IconProps>("28", {
        placement: "topRight",
        size: "s",
      })(Icon);

      const BadgedIconTwo = withBadge<IconProps>(
        <Icon iconFamily="Ionicons" iconName="pencil" size="s" color="white" />,
        {
          placement: "bottomRight",
          size: "m",
        }
      )(Icon);

      return (
        <>
          <BadgedIcon
            iconFamily="FontAwesome"
            iconName="inbox"
            size="m"
            mb="l"
          ></BadgedIcon>

          <BadgedIconTwo
            iconFamily="FontAwesome"
            iconName="inbox"
            size="m"
          ></BadgedIconTwo>
        </>
      );
    };

    const root = render(
      <ThemeProvider>
        <Wrapper />
      </ThemeProvider>
    );

    const tree = root.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("withBadge HOC works as expected with different placements", () => {
    const Wrapper = () => {
      const BadgedIconTopLeft = withBadge<IconProps>(28, {
        placement: "topLeft",
        size: "s",
      })(Icon);
      const BadgedIconTopRight = withBadge<IconProps>(28, {
        placement: "topRight",
        size: "s",
      })(Icon);
      const BadgedIconBottomLeft = withBadge<IconProps>(28, {
        placement: "bottomLeft",
        size: "s",
      })(Icon);
      const BadgedIconBottomRight = withBadge<IconProps>(28, {
        placement: "bottomRight",
        size: "s",
      })(Icon);

      return (
        <>
          <BadgedIconTopLeft
            iconFamily="FontAwesome"
            iconName="inbox"
            size="m"
            mb="l"
          ></BadgedIconTopLeft>
          <BadgedIconTopRight
            iconFamily="FontAwesome"
            iconName="inbox"
            size="m"
            mb="l"
          ></BadgedIconTopRight>
          <BadgedIconBottomLeft
            iconFamily="FontAwesome"
            iconName="inbox"
            size="m"
            mb="l"
          ></BadgedIconBottomLeft>
          <BadgedIconBottomRight
            iconFamily="FontAwesome"
            iconName="inbox"
            size="m"
            mb="l"
          ></BadgedIconBottomRight>
        </>
      );
    };

    const root = render(
      <ThemeProvider>
        <Wrapper />
      </ThemeProvider>
    );

    const tree = root.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
