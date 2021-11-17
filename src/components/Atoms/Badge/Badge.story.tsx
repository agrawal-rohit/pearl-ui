import React from "react";
import { storiesOf } from "@storybook/react-native";
import Screen from "../Screen/Screen";
import Badge from "./Badge";
import Text from "../Text/Text";
import Icon, { IconProps } from "../Icon/Icon";
import { withBadge } from "./withBadge";

storiesOf("Badge", module)
  .addDecorator((getStory) => <Screen>{getStory()}</Screen>)
  .add("Sizes", () => (
    <>
      <Badge size="s" mb="s">
        2
      </Badge>
      <Badge size="m" mb="s">
        2
      </Badge>

      <Badge size="l" mb="s">
        2
      </Badge>

      <Badge size="xl" mb="s">
        2
      </Badge>
    </>
  ))
  .add("Variants", () => (
    <>
      <Badge variant="primary" mb="s">
        2
      </Badge>
      <Badge variant="success" mb="s">
        2
      </Badge>

      <Badge variant="warning" mb="s">
        2
      </Badge>

      <Badge variant="info" mb="s">
        2
      </Badge>

      <Badge variant="error" mb="s">
        2
      </Badge>
    </>
  ))
  .add("Content type", () => (
    <>
      <Badge mb="s">23</Badge>

      <Badge>
        <Icon
          iconFamily="Entypo"
          iconName="edit"
          color="neutral.50"
          size="s"
        ></Icon>
      </Badge>
    </>
  ))
  .add("Attaching to a component", () => {
    const BadgedIcon = withBadge<IconProps>(1, {
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
          testID="inbox"
        ></BadgedIcon>

        <BadgedIconTwo
          iconFamily="FontAwesome"
          iconName="inbox"
          size="xl"
        ></BadgedIconTwo>
      </>
    );
  });
