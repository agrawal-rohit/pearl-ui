import { ColorInput, TinyColor } from "@ctrl/tinycolor";

interface IShade {
  [key: string]: string;
}

export const generateTintsandShades = (
  color: ColorInput,
  label: string,
  count: number = 9
) => {
  const rgbColor = new TinyColor(color);
  const shades: IShade = {};

  // Even number of shades
  if (count % 2 == 0) {
  } else {
    // Generate tints
    const numTints = Math.floor(count / 2);
    const tintStep = 100 / (numTints * 1.2);

    for (var i = 1; i <= numTints; i++) {
      const shadeLabel = label.concat(i.toString().concat("00"));
      shades[shadeLabel] = rgbColor
        .tint(tintStep * (numTints - i + 1))
        .toHexString();
    }

    // Middle shade
    const middleShadeIdx = Math.floor(count / 2) + 1;
    const middleShadeLabel = label.concat(
      middleShadeIdx.toString().concat("00")
    );
    shades[middleShadeLabel] = rgbColor.toHexString();

    // Generate dark shades
    const numShades = Math.floor(count / 2);
    var darkenStep = 100 / (numShades * 1.2);

    for (var i = 1; i <= numShades; i++) {
      const shadeLabel = label.concat(
        (middleShadeIdx + i).toString().concat("00")
      );
      shades[shadeLabel] = rgbColor.shade(darkenStep * i).toHexString();
    }
  }

  return shades;
};
