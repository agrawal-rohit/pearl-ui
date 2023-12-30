import { MolecularComponentConfig } from "../../../theme/src/types";
import {
  AccordionButtonProps,
  AccordionItemProps,
  AccordionPanelProps,
  BaseAccordionProps,
} from "./accordion";

export type AccordionAtoms = {
  container: BaseAccordionProps;
  item: AccordionItemProps;
  button: AccordionButtonProps;
  panel: AccordionPanelProps;
};

const AccordionConfig: MolecularComponentConfig<AccordionAtoms> = {
  parts: ["container", "item", "button", "panel"],
  baseStyle: {
    container: {
      spacing: 0,
    },
    item: {
      py: 3,
      px: 1,
      spacing: 0,
      borderBottomWidth: 1,
      borderColor: {
        light: "neutral.300",
        dark: "neutral.600",
      },
    },
    panel: { pt: "4" },
    button: {
      w: "100%",
      _disabled: {
        opacity: 0.5,
      },
    },
  },
};

export default AccordionConfig;
