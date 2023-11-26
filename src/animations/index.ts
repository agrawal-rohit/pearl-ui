import { useAnimationState } from "../hooks/useAnimationState";

/**
 * Custom hook for creating a fade animation state.
 * This hook uses the useAnimationState hook to create an animation state that transitions from an opacity of 0 to an opacity of 1.
 * This creates a fade-in effect.
 *
 * @returns An animation state that creates a fade-in effect.
 */
export const useFade = () => {
  // Define the initial and final states for the fade animation.
  // The animation will start with an opacity of 0 (completely transparent) and end with an opacity of 1 (completely opaque).
  const fadeAnimationState = useAnimationState({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  });

  // Return the fade animation state.
  return fadeAnimationState;
};

/**
 * Custom hook for creating a scale and fade animation state.
 * This hook uses the useAnimationState hook to create an animation state that transitions from a scale of 0.5 and opacity of 0 to a scale of 1 and opacity of 1.
 * This creates a combined effect of scaling and fading in.
 *
 * @returns An animation state that creates a scale and fade-in effect.
 */
export const useScaleFade = () => {
  // Define the initial and final states for the scale and fade animation.
  // The animation will start with a scale of 0.5 (half the original size) and opacity of 0 (completely transparent)
  // and end with a scale of 1 (original size) and opacity of 1 (completely opaque).
  const scaleFadeAnimationState = useAnimationState({
    from: {
      scale: 0.9,
      opacity: 0,
    },
    to: {
      scale: 1,
      opacity: 1,
    },
  });

  // Return the scale and fade animation state.
  return scaleFadeAnimationState;
};

/**
 * Custom hook for creating a slide animation state.
 * This hook uses the useAnimationState hook to create an animation state that transitions from a translateX of -100 to a translateX of 0.
 * This creates a slide-in effect.
 *
 * @returns An animation state that creates a slide-in effect.
 */
export const useSlide = () => {
  // Define the initial and final states for the slide animation.
  // The animation will start with a translateX of -100 (completely off-screen to the left) and end with a translateX of 0 (original position).
  const slideAnimationState = useAnimationState({
    from: {
      translateY: -100,
    },
    to: {
      translateY: 0,
    },
  });

  // Return the slide animation state.
  return slideAnimationState;
};

/**
 * Custom hook for creating a slide and fade animation state.
 * This hook uses the useAnimationState hook to create an animation state that transitions from a translateX of -100 and opacity of 0 to a translateX of 0 and opacity of 1.
 * This creates a combined effect of sliding and fading in.
 *
 * @returns An animation state that creates a slide and fade-in effect.
 */
export const useSlideFade = () => {
  // Define the initial and final states for the slide and fade animation.
  // The animation will start with a translateX of -100 (completely off-screen to the left) and opacity of 0 (completely transparent)
  // and end with a translateX of 0 (original position) and opacity of 1 (completely opaque).
  const slideFadeAnimationState = useAnimationState({
    from: {
      opacity: 0,
      translateY: 10,
    },
    to: {
      opacity: 1,
      translateY: 0,
    },
  });

  // Return the slide and fade animation state.
  return slideFadeAnimationState;
};

/**
 * Custom hook for creating a collapse animation state.
 * This hook uses the useAnimationState hook to create an animation state that transitions from a scaleY of 1 to a scaleY of 0.
 * This creates a collapse effect.
 *
 * @returns An animation state that creates a collapse effect.
 */
export const useCollapse = () => {
  // Define the initial and final states for the collapse animation.
  // The animation will start with a scaleY of 1 (original size) and end with a scaleY of 0 (collapsed).
  const collapseAnimationState = useAnimationState({
    from: {
      opacity: 0,
      height: 0,
    },
    to: {
      opacity: 1,
      height: 100,
    },
  });

  // Return the collapse animation state.
  return collapseAnimationState;
};
