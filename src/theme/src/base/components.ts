import DividerConfig from "../../../components/Atoms/Divider/Divider.config";
import IconConfig from "../../../components/Atoms/Icon/Icon.config";
import ScreenConfig from "../../../components/Atoms/Screen/Screen.config";
import SpinnerConfig from "../../../components/Atoms/Spinner/Spinner.config";
import TextConfig from "../../../components/Atoms/Text/Text.config";
import AvatarConfig from "../../../components/Molecules/Avatar/Avatar.config";
import BadgeConfig from "../../../components/Molecules/Badge/Badge.config";
import ButtonConfig from "../../../components/Molecules/Button/Button.config";
import CheckBoxConfig from "../../../components/Molecules/CheckBox/CheckBox.config";
import ImageConfig from "../../../components/Molecules/Image/Image.config";
import InputConfig from "../../../components/Molecules/Input/Input.config";
import RadioConfig from "../../../components/Molecules/Radio/Radio.config";
import TextLinkConfig from "../../../components/Molecules/TextLink/TextLink.config";
import { AtomicComponentConfig, MolecularComponentConfig } from "../types";

export default {
  Icon: IconConfig,
  Text: TextConfig,
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
} as Record<string, AtomicComponentConfig | MolecularComponentConfig>;
