import { useMemo } from "react";
import { useTheme } from "./useTheme";
import composeStyleProps from "../theme/src/composeStyleProps";
import { StyleFunctionContainer } from "../theme/src/types";
import { useDimensions } from "./useDimensions";
import { filterStyledProps } from "./utils/utils";
import { useStyledProps } from "./useStyledProps";
import _ from "lodash";
import { getKeys } from "../theme/utils/typeHelpers";

// export type KeyValueObject = {
//   [key: string]: number | boolean | string | KeyValueObject;
// };

// export const isKeyValueObject = (
//   obj1: number | boolean | string | KeyValueObject
// ): obj1 is KeyValueObject => typeof obj1 === "object" && obj1 !== null;

// export const commonValues = (
//   obj1: KeyValueObject,
//   obj2: KeyValueObject
// ): KeyValueObject =>
//   Object.keys(obj1).reduce(
//     (result, key) =>
//       obj1[key] && obj1[key] === obj2[key]
//         ? { ...result, [key]: obj1[key] }
//         : isKeyValueObject(obj1[key]) && isKeyValueObject(obj2[key])
//         ? {
//             ...result,
//             [key]: commonValues(
//               obj1[key] as KeyValueObject,
//               obj2[key] as KeyValueObject
//             ),
//           }
//         : result,
//     {}
//   );

/**
 * Hook to convert the received style props to appropriate React Native styles
 * @param props Raw props passed to the component where the hook is being used
 * @param styleFunctions List of style functions to use for computing the received style props
 * @returns
 */
export const useStyledPropsWithMoti = (
  props: { [key: string]: any },
  styleFunctions: StyleFunctionContainer[]
) => {
  const { theme } = useTheme();
  const dimensions = useDimensions();

  const buildStyleProperties = useMemo(
    () => composeStyleProps(styleFunctions),
    [styleFunctions]
  );

  const coreVisualStyle = buildStyleProperties.buildStyle(props, {
    theme,
    dimensions,
  });
  const cleanStyleProps = filterStyledProps(
    props,
    buildStyleProperties.properties
  );

  // Convert Moti Props using style props as well

  // From
  let fromStyleProps = useStyledProps(cleanStyleProps.from, styleFunctions);
  fromStyleProps = { ...fromStyleProps, ...fromStyleProps.style };
  fromStyleProps = _.omit(fromStyleProps, ["style", "display", "shadowOffset"]);
  if (getKeys(fromStyleProps).length > 0) cleanStyleProps.from = fromStyleProps;

  // Animate
  let animateStyleProps = useStyledProps(
    cleanStyleProps.animate,
    styleFunctions
  );
  animateStyleProps = { ...animateStyleProps, ...animateStyleProps.style };
  animateStyleProps = _.omit(animateStyleProps, ["style", "display"]);
  if (getKeys(animateStyleProps).length > 0)
    cleanStyleProps.animate = animateStyleProps;

  // Transition
  let transitionStyleProps = useStyledProps(
    cleanStyleProps.transition,
    styleFunctions
  );
  transitionStyleProps = {
    ...transitionStyleProps,
    ...transitionStyleProps.style,
  };
  transitionStyleProps = _.omit(transitionStyleProps, ["style", "display"]);
  if (getKeys(transitionStyleProps).length > 0)
    cleanStyleProps.transition = transitionStyleProps;

  // Exit
  let exitStyleProps = useStyledProps(cleanStyleProps.exit, styleFunctions);
  exitStyleProps = { ...exitStyleProps, ...exitStyleProps.style };
  exitStyleProps = _.omit(exitStyleProps, ["style", "display"]);
  if (getKeys(exitStyleProps).length > 0) cleanStyleProps.exit = exitStyleProps;

  // Exit Transform
  let exitTransitionStyleProps = useStyledProps(
    cleanStyleProps.exitTransition,
    styleFunctions
  );
  exitTransitionStyleProps = {
    ...exitTransitionStyleProps,
    ...exitTransitionStyleProps.style,
  };
  exitTransitionStyleProps = _.omit(exitTransitionStyleProps, [
    "style",
    "display",
  ]);
  if (getKeys(exitTransitionStyleProps).length > 0)
    cleanStyleProps.exitTransition = exitTransitionStyleProps;

  cleanStyleProps.style = { ...coreVisualStyle, ...props.style };
  return cleanStyleProps;
};
