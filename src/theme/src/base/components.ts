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
import ImageConfig from "../../../components/molecules/image/image.config";
import InputConfig from "../../../components/molecules/input/input.config";
import ProgressConfig from "../../../components/molecules/progress/progress.config";
import RadioConfig from "../../../components/molecules/radio/radio.config";
import TextLinkConfig from "../../../components/molecules/text-link/text-link.config";

export default {
  None: { baseStyle: {} },
  Icon: IconConfig,
  Text: TextConfig,
  Skeleton: SkeletonConfig,
  Screen: ScreenConfig,
  Spinner: SpinnerConfig,
  Button: ButtonConfig,
  TextLink: TextLinkConfig,
  Input: InputConfig,
  CheckBox: CheckBoxConfig,
  Radio: RadioConfig,
  Badge: BadgeConfig,
  Divider: DividerConfig,
  Image: ImageConfig,
  Avatar: AvatarConfig,
  Progress: ProgressConfig,
};
