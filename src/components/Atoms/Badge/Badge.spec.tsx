import React from "react";
import { render } from "@testing-library/react-native";
import Badge from "./Badge";
import { ThemeProvider } from "../../../theme/src/themeContext";
import Icon, { IconProps } from "../Icon/Icon";
import { withBadge } from "./withBadge";

jest.useFakeTimers();

describe("Atoms/Badge", () => {
  it("passes the snapshot test for different sizes", () => {
    const tree = render(
      <ThemeProvider>
        <Badge size="s">2</Badge>
        <Badge size="m">2</Badge>
        <Badge size="l">2</Badge>
        <Badge size="xl">2</Badge>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("passes the snapshot test for different variants", () => {
    const tree = render(
      <ThemeProvider>
        <Badge variant="primary"></Badge>
        <Badge variant="success"></Badge>
        <Badge variant="warning">2</Badge>
        <Badge variant="info">2</Badge>
        <Badge variant="error">2</Badge>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("passes the snapshot test for different values types", () => {
    const tree = render(
      <ThemeProvider>
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
      const BadgedIcon = withBadge<IconProps>(28, {
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
            size="xl"
            mb="l"
          ></BadgedIcon>

          <BadgedIconTwo
            iconFamily="FontAwesome"
            iconName="inbox"
            size="xl"
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
    expect(root.getByText("28")).toBeTruthy();
  });
});
