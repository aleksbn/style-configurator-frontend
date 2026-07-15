import { cubicBezier } from "framer-motion";

function fade(
  delayIn = 0,
  delayOut = 0,
  durationIn = 1,
  durationOut = 1,
) {
  return {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: durationIn,
        ease: cubicBezier(0.8, 0, 0.2, 1),
        delay: delayIn,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: durationOut,
        ease: cubicBezier(0.8, 0, 0.2, 1),
        delay: delayOut,
      },
    },
  };
}

function fadeAndIncrease(
  delayIn = 0,
  delayOut = 0,
  durationIn = 1,
  durationOut = 1,
) {
  return {
    initial: {
      opacity: 0,
      scale: 0.7,
    },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: durationIn,
        ease: cubicBezier(0.8, 0, 0.2, 1),
        delay: delayIn,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.7,
      transition: {
        duration: durationOut,
        ease: cubicBezier(0.8, 0, 0.2, 1),
        delay: delayOut,
      },
    },
  };
}

export { fade, fadeAndIncrease };
