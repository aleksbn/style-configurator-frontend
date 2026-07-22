import type { Variants } from "framer-motion";

function animated(variants: Variants) {
  return {
    variants,
    initial: "initial",
    animate: "animate",
    exit: "exit",
  };
}

export { animated };
