import React from "react";
import styled from "styled-components";
import { BackgroundOverlay } from "../../components/style/Common.style";
import { cubicBezier, motion } from "framer-motion";
import { SlideUp } from "../../animations/Slide";
import { Button } from "../../components/style/Buttons.style";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #ffffff;
  padding: 20px;
  gap: 8px;
  position: absolute;
  bottom: 0;
  left: 0;

  > .button {
    width: 50svw;
  }

  @media (max-width: 480px) {
    > .button {
      width: 75svw;
    }
  }
`;

export default function MobileMore({
  onClose,
  actions,
}: {
  onClose: () => void;
  actions: { label: string; onClick: () => void }[];
}) {
  return (
    <BackgroundOverlay
      as={motion.div}
      initial={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
      animate={{
        backgroundColor: "rgba(0, 0, 0, 0.75)",
        transition: {
          duration: 0.3,
          ease: cubicBezier(0.85, 0, 0.15, 1),
        },
      }}
      exit={{
        backgroundColor: "rgba(0, 0, 0, 0)",
        transition: {
          duration: 0.3,
          ease: cubicBezier(0.85, 0, 0.15, 1),
        },
      }}
      onClick={onClose}
    >
      <Container
        as={motion.div}
        variants={SlideUp(0, 0, 0.5, 0.5, false, 400)}
        initial="initial"
        animate="animate"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
      >
        {actions.map((action, index) => (
          <Button
            key={index}
            type="secondary"
            onClick={action.onClick}
            className="button"
          >
            {action.label}
          </Button>
        ))}
      </Container>
    </BackgroundOverlay>
  );
}
