import { ColorInput, TinyColor } from "@ctrl/tinycolor";
import { ColorPalette } from "../src/types";

/**
 * Generate a number of tints and shades from a single color
 * @param color Color to generate tints and shades for
 * @param label Identifier for the generated colors ('primary', 'secondary', etc). Eg, for a label of 'primary', the generated tints and shades be referred as 'primary.100', 'primary.200', etc.
 * @param count The number of color values to be generated
 * @param similarity The similarity between the generated colors
 * @returns
 */
export const generatePalette = (
  color: ColorInput,
  label: string,
  count: number = 9,
  similarity: number = 1.4
) => {
  const tinyColor = new TinyColor(color);
  const shades: ColorPalette = {};

  // Even number of colors
  if (count % 2 == 0) {
    // Generate tints
    const numTints = count / 2;
    const tintStep = 100 / (numTints * similarity);

    for (var i = 1; i <= numTints; i++) {
      const shadeLabel = parseInt(i.toString().concat("00"));
      shades[shadeLabel] = tinyColor
        .tint(tintStep * (numTints - i + 1))
        .toHexString();
    }

    // Generate dark shades
    const numShades = count / 2;
    var darkenStep = 100 / (numShades * similarity);

    for (var i = 1; i <= numShades; i++) {
      const shadeLabel = parseInt((numTints + i).toString().concat("00"));
      shades[shadeLabel] = tinyColor.shade(darkenStep * i).toHexString();
    }
  }

  // Odd number of colors
  else {
    // Generate tints
    const numTints = Math.floor(count / 2);
    const tintStep = 100 / (numTints * similarity);

    for (var i = 1; i <= numTints; i++) {
      const shadeLabel = parseInt(i.toString().concat("00"));
      shades[shadeLabel] = tinyColor
        .tint(tintStep * (numTints - i + 1))
        .toHexString();
    }

    // Middle shade
    const middleShadeIdx = Math.floor(count / 2) + 1;
    const middleShadeLabel = parseInt(middleShadeIdx.toString().concat("00"));
    shades[middleShadeLabel] = tinyColor.toHexString();

    // Generate dark shades
    const numShades = Math.floor(count / 2);
    var darkenStep = 100 / (numShades * similarity);

    for (var i = 1; i <= numShades; i++) {
      const shadeLabel = parseInt((middleShadeIdx + i).toString().concat("00"));
      shades[shadeLabel] = tinyColor.shade(darkenStep * i).toHexString();
    }
  }

  return {
    [label]: shades,
  };
};
