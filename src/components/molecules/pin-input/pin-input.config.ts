import { MolecularComponentConfig } from "../../../theme/src/types";
import { HStackProps } from "../../atoms/stack/stack";
import { BasePinInputProps } from "./pin-input";

export type PinInputAtoms = {
  container: HStackProps;
  input: BasePinInputProps;
};

const PinInputConfig: MolecularComponentConfig<PinInputAtoms> = {
  parts: ["container", "input"],
  baseStyle: {},
  sizes: {
    xs: {
      input: { size: "xs", w: 30 },
    },
    s: {
      input: { size: "s", w: 30 },
    },
    m: {
      input: { size: "m", w: 35 },
    },
    l: {
      input: { size: "l", w: 50 },
    },
  },
  variants: {
    filled: {
      input: {
        variant: "filled",
      },
    },
    outline: {
      input: {
        variant: "outline",
      },
    },
  },
  defaults: {
    size: "m",
    variant: "filled",
  },
};

export default PinInputConfig;
