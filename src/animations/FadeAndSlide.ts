import { cubicBezier } from "framer-motion";
import { negate } from "./animationHelper";

function fadeInSlideSideOut(
  delayIn = 0,
  delayOut = 0,
  durationIn = 1,
  durationOut = 1,
  distance: number | string = 100,
  direction: "left" | "right" = "right",
) {
  return {
    initial: {
      opacity: 0,
      x: 0,
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: durationIn,
        ease: cubicBezier(0.8, 0, 0.2, 1),
        delay: delayIn,
      },
    },
    exit: {
      opacity: 0,
      x: direction === "right" ? distance : negate(distance),
      transition: {
        duration: durationOut,
        ease: cubicBezier(0.8, 0, 0.2, 1),
        delay: delayOut,
      },
    },
  };
}

export { fadeInSlideSideOut };
