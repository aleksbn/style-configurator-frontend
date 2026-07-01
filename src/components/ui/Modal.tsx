import React from "react";
import { BackgroundOverlay } from "../style/Common.style";
import { cubicBezier, motion } from "framer-motion";
import styled, { css } from "styled-components";
import { SlideLeft, SlideRight } from "../../animations/Slide";

const Container = styled.div<{ position: "left" | "right" }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  min-width: 30%;
  max-width: 40%;
  height: 100%;
  background-color: #ffffff;
  padding: 80px 20px 80px 60px;
  position: absolute;
  top: 0;
  left: 0;

  & > .close-icon {
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
  }

  ${(props) => {
    return css`
      & > .close-icon {
        ${props.position == "left" ? "right" : "left"}: 20px;
      }
    `;
  }}

  @media (max-width: 1024px) {
    padding: 40px 20px 40px 20px;
    max-width: initial;
    width: 50svw;
  }

  @media (max-width: 575px) {
    width: 75svw;
  }

  @media (max-width: 480px) {
    width: 100svw;
  }
`;

export default function Modal({
  type,
  children,
  onClose,
}: {
  type: "left" | "right";
  children: React.ReactNode;
  onClose: () => void;
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
        variants={
          type === "left"
            ? SlideRight(0, 0, 0.5, 0.5, false, 500)
            : SlideLeft(0, 0, 0.5, 0.5, false, 500)
        }
        initial="initial"
        animate="animate"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
        position={type === "left" ? "left" : "right"}
      >
        {children}
      </Container>
    </BackgroundOverlay>
  );
}
