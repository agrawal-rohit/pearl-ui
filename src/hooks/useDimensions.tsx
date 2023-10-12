import { useContext } from "react";
import { DimensionsContext } from "../theme/src/dimensions-context";

/**
 * Hook to get the value of the dimensions context
 */
export const useDimensions = () => useContext(DimensionsContext);
