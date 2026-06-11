import { cubicBezier } from "framer-motion";

function SlideUp(
  delayIn: number = 0,
  delayOut: number = 0,
  durationIn: number = 1,
  durationOut: number = 1,
  withOpacity: boolean = false,
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
  delayIn: number = 0,
  delayOut: number = 0,
  durationIn: number = 1,
  durationOut: number = 1,
  withOpacity: boolean = false,
  distance: number | string = 100,
) {
  return {
    initial: {
      x: -distance,
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
      x: -distance,
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
  delayIn: number = 0,
  delayOut: number = 0,
  durationIn: number = 1,
  durationOut: number = 1,
  withOpacity: boolean = false,
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
