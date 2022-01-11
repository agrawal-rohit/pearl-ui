import { getKeys } from "../theme/utils/typeHelpers";
import { StyleFunctionContainer } from "../theme/src/types";
import _ from "lodash";
import { useStyledProps } from "./useStyledProps";

export const useMotiWithStyleProps = (
  props: { [key: string]: any },
  styleFunctions: StyleFunctionContainer[]
) => {
  // Convert Moti Props using style props as well
  // From
  let fromStyleProps = useStyledProps(props.from, styleFunctions);
  fromStyleProps = { ...fromStyleProps, ...fromStyleProps.style };
  fromStyleProps = _.omit(fromStyleProps, ["style", "display", "shadowOffset"]);
  if (getKeys(fromStyleProps).length > 0) props.from = fromStyleProps;

  // Animate
  let animateStyleProps = useStyledProps(props.animate, styleFunctions);
  animateStyleProps = { ...animateStyleProps, ...animateStyleProps.style };
  animateStyleProps = _.omit(animateStyleProps, ["style", "display"]);
  if (getKeys(animateStyleProps).length > 0) props.animate = animateStyleProps;

  // Transition
  let transitionStyleProps = useStyledProps(props.transition, styleFunctions);
  transitionStyleProps = {
    ...transitionStyleProps,
    ...transitionStyleProps.style,
  };
  transitionStyleProps = _.omit(transitionStyleProps, ["style", "display"]);
  if (getKeys(transitionStyleProps).length > 0)
    props.transition = transitionStyleProps;

  // Exit
  let exitStyleProps = useStyledProps(props.exit, styleFunctions);
  exitStyleProps = { ...exitStyleProps, ...exitStyleProps.style };
  exitStyleProps = _.omit(exitStyleProps, ["style", "display"]);
  if (getKeys(exitStyleProps).length > 0) props.exit = exitStyleProps;

  // Exit Transform
  let exitTransitionStyleProps = useStyledProps(
    props.exitTransition,
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
    props.exitTransition = exitTransitionStyleProps;

  // TODO: Add transform to animation state

  return props;
};
