import { useMemo } from "react";
import { StyleFunctionContainer } from "../theme/src/types";
import { useDimensions } from "./useDimensions";
import { useTheme } from "./useTheme";
import { composeCleanStyleProps, composeStyleProps } from "./utils/utils";

export const useStateWithStyleProps = (
  props: Record<string, any>,
  styleFunctions: StyleFunctionContainer[]
) => {
  const { theme } = useTheme();
  const dimensions = useDimensions();

  const buildStyleProperties = useMemo(
    () => composeStyleProps(styleFunctions),
    [styleFunctions]
  );

  // From
  if (!props) return {};

  return composeCleanStyleProps(props, buildStyleProperties, {
    theme,
    dimensions,
  });
};
