import { useMemo } from "react";
import { getKeys } from "../theme/utils/typeHelpers";

import { useTheme } from "./useTheme";
import { StyleFunctionContainer } from "../theme/src/types";
import { useDimensions } from "./useDimensions";
import { buildFinalStyleProps, composeStyleProps } from "./utils/utils";
import _ from "lodash";

/**
 * Hook to convert the received style props to appropriate React Native styles
 * @param props Raw props passed to the component where the hook is being used
 * @param styleFunctions List of style functions to use for computing the received style props
 * @returns
 */
export const useStyleProps = (
  props: Record<string, any>,
  styleFunctions: StyleFunctionContainer[]
) => {
  const { theme } = useTheme();
  const dimensions = useDimensions();

  const buildStyleProperties = useMemo(
    () => composeStyleProps(styleFunctions),
    [styleFunctions]
  );

  if (!props) return { style: {} };

  return buildFinalStyleProps(props, buildStyleProperties, {
    theme,
    dimensions,
  });
};
