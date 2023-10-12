import { PixelRatio, Dimensions } from "react-native";

const pixelRatio = PixelRatio.get();
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

/**
 * Returns a responsive size based on the device's pixel ratio and dimensions.
 * @param size - The size to be scaled.
 * @returns The scaled size.
 */
const responsiveSize = (size?: number) => {
  // If no size is provided, return 0.
  if (!size) return 0;

  // Scale size based on pixel ratio and device dimensions.
  if (pixelRatio >= 2 && pixelRatio < 3) {
    // iphone 5s and older Androids
    if (deviceWidth < 360) {
      // Scale size down by 5%.
      return size * 0.95;
    }
    // iphone 5
    if (deviceHeight < 667) {
      // Do not scale size.
      return size;
    }

    // iphone 6-6s
    if (deviceHeight >= 667 && deviceHeight <= 735) {
      // Scale size up by 15%.
      return size * 1.15;
    }
    // older phablets
    return size * 1.15;
  }
  if (pixelRatio >= 3 && pixelRatio < 3.5) {
    // catch Android font scaling on small machines
    // where pixel ratio / font scale ratio => 3:3
    if (deviceWidth <= 360) {
      // Do not scale size.
      return size;
    }
    // Catch other weird android width sizings
    if (deviceHeight < 667) {
      // Scale size up by 15%.
      return size * 1.15;
    }
    // catch in-between size Androids and scale font up
    // a tad but not too much
    if (deviceHeight >= 667 && deviceHeight <= 735) {
      // Scale size up by 20%.
      return size * 1.2;
    }
    // catch larger devices
    // ie iphone 6s plus / 7 plus / mi note 等等
    return size * 1.15;
  }
  if (pixelRatio >= 3.5) {
    // catch Android font scaling on small machines
    // where pixel ratio / font scale ratio => 3:3
    if (deviceWidth <= 360) {
      // Do not scale size.
      return size;
    }

    // Catch other smaller android height sizings
    if (deviceHeight < 667) {
      // Scale size up by 20%.
      return size * 1.2;
    }

    // catch in-between size Androids and scale font up
    // a tad but not too much
    if (deviceHeight >= 667 && deviceHeight <= 735) {
      // Scale size up by 25%.
      return size * 1.25;
    }
    // catch larger phablet devices
    return size * 1.4;
  }
  // If pixel ratio is less than 2, return the original size.
  return size;
};

export default responsiveSize;
