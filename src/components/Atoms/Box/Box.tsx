import { createBox } from "@shopify/restyle";
import { PearlTheme } from "../../../theme/src/theme";

/**
 * Box is the most abstract component on top of which all other Pearl UI components are built. By default, it renders a <View> element.
 */
const Box = createBox<PearlTheme>();

export default Box;
