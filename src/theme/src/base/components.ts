import DividerConfig from "../../../components/atoms/divider/divider.config";
import IconConfig from "../../../components/atoms/icon/icon.config";
import ScreenConfig from "../../../components/atoms/screen/screen.config";
import SkeletonConfig from "../../../components/atoms/skeleton/skeleton.config";
import SpinnerConfig from "../../../components/atoms/spinner/spinner.config";
import TextConfig from "../../../components/atoms/text/text.config";
import AvatarConfig from "../../../components/molecules/avatar/avatar.config";
import BadgeConfig from "../../../components/molecules/badge/badge.config";
import ButtonConfig from "../../../components/molecules/button/button.config";
import CheckBoxConfig from "../../../components/molecules/checkbox/checkbox.config";
import IconButtonConfig from "../../../components/molecules/icon-button/icon-button.config";
import ImageConfig from "../../../components/molecules/image/image.config";
import InputConfig from "../../../components/molecules/input/input.config";
import ProgressConfig from "../../../components/molecules/progress/progress.config";
import RadioConfig from "../../../components/molecules/radio/radio.config";
import SwitchConfig from "../../../components/molecules/switch/switch.config";
import VideoConfig from "../../../components/molecules/video/video.config";

interface Config {
  None: { baseStyle: {} };
  Icon: typeof IconConfig;
  Text: typeof TextConfig;
  Skeleton: typeof SkeletonConfig;
  Screen: typeof ScreenConfig;
  Spinner: typeof SpinnerConfig;
  Button: typeof ButtonConfig;
  IconButton: typeof IconButtonConfig;
  Input: typeof InputConfig;
  CheckBox: typeof CheckBoxConfig;
  Radio: typeof RadioConfig;
  Badge: typeof BadgeConfig;
  Divider: typeof DividerConfig;
  Switch: typeof SwitchConfig;
  Image: typeof ImageConfig;
  Video: typeof VideoConfig;
  Avatar: typeof AvatarConfig;
  Progress: typeof ProgressConfig;
}

export default {
  None: { baseStyle: {} },
  Icon: IconConfig,
  Text: TextConfig,
  Skeleton: SkeletonConfig,
  Screen: ScreenConfig,
  Spinner: SpinnerConfig,
  Button: ButtonConfig,
  IconButton: IconButtonConfig,
  Input: InputConfig,
  CheckBox: CheckBoxConfig,
  Radio: RadioConfig,
  Badge: BadgeConfig,
  Divider: DividerConfig,
  Switch: SwitchConfig,
  Image: ImageConfig,
  Video: VideoConfig,
  Avatar: AvatarConfig,
  Progress: ProgressConfig,
} as Config;
