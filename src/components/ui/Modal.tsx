import { type ReactNode } from "react";
import { motion } from "framer-motion";
import styled, { css } from "styled-components";
import { SlideLeft, SlideRight } from "../../animations/Slide";
import { animated } from "../../animations/Motion";
import ModalBackdrop from "./ModalBackdrop";

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
  children: ReactNode;
  onClose: () => void;
}) {
  return (
    <ModalBackdrop onClose={onClose}>
      <Container
        as={motion.div}
        {...animated(
          type === "left"
            ? SlideRight(0, 0, 0.5, 0.5, false, 500)
            : SlideLeft(0, 0, 0.5, 0.5, false, 500),
        )}
        onClick={(e) => e.stopPropagation()}
        position={type === "left" ? "left" : "right"}
      >
        {children}
      </Container>
    </ModalBackdrop>
  );
}
