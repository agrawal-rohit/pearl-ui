import React from "react";
import { storiesOf } from "@storybook/react-native";
import Screen from "../../Atoms/Screen/Screen";
import OfflineNotice from "./OfflineNotice";

storiesOf("OfflineNotice", module)
  .addDecorator((getStory) => <Screen>{getStory()}</Screen>)
  .add("no internet", () => <OfflineNotice />);
