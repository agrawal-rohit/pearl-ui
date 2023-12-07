import { AtomicComponentConfig } from "../../../theme/src/types";
import { SpinnerProps } from "./spinner";
import { BallIndicatorProps } from "./indicators/ball";
import { BarIndicatorProps } from "./indicators/bar";
import { DotIndicatorProps } from "./indicators/dot";
import { PacmanIndicatorProps } from "./indicators/pacman";
import { PulseIndicatorProps } from "./indicators/pulse";
import { MaterialIndicatorProps } from "./indicators/material";
import { SkypeIndicatorProps } from "./indicators/skype";
import { ActivityIndicatorProps } from "./indicators/activity";
import { WaveIndicatorProps } from "./indicators/wave";

const BallConfig: SpinnerProps & BallIndicatorProps = { count: 8 };
const BarConfig: SpinnerProps & BarIndicatorProps = { count: 3 };
const DotConfig: SpinnerProps & DotIndicatorProps = {
  sizeMultiplier: 0.2,
  count: 4,
};
const MaterialConfig: SpinnerProps & MaterialIndicatorProps = {
  animationDuration: 3600,
};
const PacmanConfig: SpinnerProps & PacmanIndicatorProps = {};
const PulseConfig: SpinnerProps & PulseIndicatorProps = {};
const SkypeConfig: SpinnerProps & SkypeIndicatorProps = {
  animationDuration: 1600,
  count: 5,
  minScale: 0.2,
  maxScale: 1.0,
};
const ActivityConfig: SpinnerProps & ActivityIndicatorProps = { count: 12 };
const WaveConfig: SpinnerProps & WaveIndicatorProps = {
  animationDuration: 1600,
  count: 4,
  waveFactor: 0.54,
  waveMode: "fill",
};

const SpinnerConfig: AtomicComponentConfig<SpinnerProps> = {
  baseStyle: {
    color: "primary.500",
    animationDuration: 1200,
  },
  sizes: {
    xs: {
      rawSize: 10,
    },
    s: {
      rawSize: 15,
    },
    m: {
      rawSize: 20,
    },
    l: {
      rawSize: 30,
    },
  },
  variants: {
    ball: BallConfig,
    bar: BarConfig,
    dot: DotConfig,
    spinner: MaterialConfig,
    pacman: PacmanConfig,
    pulse: PulseConfig,
    skype: SkypeConfig,
    activity: ActivityConfig,
    wave: WaveConfig,
  },
  defaults: {
    size: "m",
    variant: "spinner",
  },
};

export default SpinnerConfig;
