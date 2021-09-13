import { ColorInput, TinyColor } from "@ctrl/tinycolor";

export interface IColors {
  [key: string]: string;
}

/**
 *
 * @param color Color to generate tints and shades for
 * @param label Identifier for the generated colors ('primary', 'secondary', etc). Eg, for a label of 'primary', the generated tints and shades be referred as 'primary100', 'primary200', etc.
 * @param count The number of color values to be generated
 * @returns
 */
export const generateTintsandShades = (
  color: ColorInput,
  label: string,
  count: number = 9
) => {
  const tinyColor = new TinyColor(color);
  const shades: IColors = {};

  // Even number of colors
  if (count % 2 == 0) {
    // Generate tints
    const numTints = count / 2;
    const tintStep = 100 / (numTints * 1.2);

    for (var i = 1; i <= numTints; i++) {
      const shadeLabel = label.concat(i.toString().concat("00"));
      shades[shadeLabel] = tinyColor
        .tint(tintStep * (numTints - i + 1))
        .toHexString();
    }

    // Generate dark shades
    const numShades = count / 2;
    var darkenStep = 100 / (numShades * 1.2);

    for (var i = 1; i <= numShades; i++) {
      const shadeLabel = label.concat((numTints + i).toString().concat("00"));
      shades[shadeLabel] = tinyColor.shade(darkenStep * i).toHexString();
    }
  }

  // Odd number of colors
  else {
    // Generate tints
    const numTints = Math.floor(count / 2);
    const tintStep = 100 / (numTints * 1.2);

    for (var i = 1; i <= numTints; i++) {
      const shadeLabel = label.concat(i.toString().concat("00"));
      shades[shadeLabel] = tinyColor
        .tint(tintStep * (numTints - i + 1))
        .toHexString();
    }

    // Middle shade
    const middleShadeIdx = Math.floor(count / 2) + 1;
    const middleShadeLabel = label.concat(
      middleShadeIdx.toString().concat("00")
    );
    shades[middleShadeLabel] = tinyColor.toHexString();

    // Generate dark shades
    const numShades = Math.floor(count / 2);
    var darkenStep = 100 / (numShades * 1.2);

    for (var i = 1; i <= numShades; i++) {
      const shadeLabel = label.concat(
        (middleShadeIdx + i).toString().concat("00")
      );
      shades[shadeLabel] = tinyColor.shade(darkenStep * i).toHexString();
    }
  }

  return shades;
};
