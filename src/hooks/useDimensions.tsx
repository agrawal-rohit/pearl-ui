import { useContext } from "react";
import { DimensionsContext } from "../theme/src/dimensionsContext";

/**
 * Hook to get the value of the dimensions context
 */
export const useDimensions = () => useContext(DimensionsContext);
