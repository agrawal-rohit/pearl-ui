import React from "react";
import { render } from "@testing-library/react-native";
import Video from "./video";
import { ThemeProvider } from "../../../theme/src/theme-context";
import { ResizeMode } from "expo-av";

jest.useFakeTimers();

describe("Atoms/Video", () => {
  it("passes the snapshot test", () => {
    const tree = render(
      <ThemeProvider>
        <Video
          source={{
            uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
          }}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
        />
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
