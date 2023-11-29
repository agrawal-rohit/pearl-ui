import React from "react";
import { Video as ExpoVideo, VideoProps as ExpoVideoProps } from "expo-av";
import { pearl } from "../../../pearl";

/**
 * Video is the most abstract component on top of which all other Pearl UI components are built.
 */
const Video = pearl<ExpoVideoProps>(ExpoVideo, {
  componentName: "Video",
  type: "basic",
  animatable: true,
});

export type VideoProps = React.ComponentProps<typeof Video>;

Video.displayName = "Video";

export default Video;
