import { cubicBezier } from "framer-motion";

function negate(distance: number | string): number | string {
  return typeof distance === "string" ? `-${distance}` : -distance;
}

function SlideUp(
  delayIn = 0,
  delayOut = 0,
  durationIn = 1,
  durationOut = 1,
  withOpacity = false,
  distance: number | string = 100,
) {
  return {
    initial: {
      y: distance,
      opacity: withOpacity ? 0 : 1,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: durationIn,
        ease: cubicBezier(0.8, 0, 0.2, 1),
        delay: delayIn,
      },
    },
    exit: {
      opacity: withOpacity ? 0 : 1,
      y: distance,
      transition: {
        duration: durationOut,
        ease: cubicBezier(0.8, 0, 0.2, 1),
        delay: delayOut,
      },
    },
  };
}

function SlideRight(
  delayIn = 0,
  delayOut = 0,
  durationIn = 1,
  durationOut = 1,
  withOpacity = false,
  distance: number | string = 100,
) {
  return {
    initial: {
      x: negate(distance),
      opacity: withOpacity ? 0 : 1,
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: durationIn,
        ease: cubicBezier(0.8, 0, 0.2, 1),
        delay: delayIn,
      },
    },
    exit: {
      x: negate(distance),
      opacity: withOpacity ? 0 : 1,
      transition: {
        duration: durationOut,
        ease: cubicBezier(0.8, 0, 0.2, 1),
        delay: delayOut,
      },
    },
  };
}

function SlideLeft(
  delayIn = 0,
  delayOut = 0,
  durationIn = 1,
  durationOut = 1,
  withOpacity = false,
  distance: number | string = 100,
) {
  return {
    initial: {
      x: distance,
      opacity: withOpacity ? 0 : 1,
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: durationIn,
        ease: cubicBezier(0.8, 0, 0.2, 1),
        delay: delayIn,
      },
    },
    exit: {
      x: distance,
      opacity: withOpacity ? 0 : 1,
      transition: {
        duration: durationOut,
        ease: cubicBezier(0.8, 0, 0.2, 1),
        delay: delayOut,
      },
    },
  };
}

export { SlideUp, SlideRight, SlideLeft };
