import { cubicBezier, motion } from "framer-motion";
import type { ReactNode } from "react";
import { BackgroundOverlay } from "../style/Common.style";

/** The dim-and-fade backdrop shared by every modal/dialog; fades to 75% black behind the modal content. */
export default function ModalBackdrop({
  duration = 0.3,
  onClose,
  children,
}: {
  duration?: number;
  onClose?: () => void;
  children: ReactNode;
}) {
  return (
    <BackgroundOverlay
      as={motion.div}
      initial={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
      animate={{
        backgroundColor: "rgba(0, 0, 0, 0.75)",
        transition: { duration, ease: cubicBezier(0.85, 0, 0.15, 1) },
      }}
      exit={{
        backgroundColor: "rgba(0, 0, 0, 0)",
        transition: { duration, ease: cubicBezier(0.85, 0, 0.15, 1) },
      }}
      onClick={onClose}
    >
      {children}
    </BackgroundOverlay>
  );
}
