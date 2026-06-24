import React from "react";
import { BackgroundOverlay } from "../style/Common.style";
import { cubicBezier, motion } from "framer-motion";
import styled from "styled-components";
import { fadeAndIncrease } from "../../animations/Fade";
import { Button } from "../style/Buttons.style";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: fit-content;
  height: 60%;
  width: 60%;
  padding: 5% 10% 10% 10%;
  background-color: rgba(240, 248, 255, 1);
  border-radius: 50px;
  position: relative;
`;

const ModalAddMoreButton = styled(Button)`
  width: 100%;
  background-color: #000;
  color: #fff;
  padding: 24px 36px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #fff;
    color: #000000;
  }
`;

const ModalCheckoutButton = styled(Button)`
  width: 100%;
  background-color: #fff;
  color: #000;
  padding: 24px 36px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  cursor: pointer;
`;

const Title = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin: 0 0 48px 0;
  text-align: center;
`;

const Desc = styled.div`
  font-size: 1.4rem;
  text-align: center;
  margin-bottom: 32px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 48px;
  min-width: 50%;
  max-width: 70%;
  position: absolute;
  bottom: 48px;
  left: 50%;
  transform: translateX(-50%);
`;

export default function YesNoDialog({
  transitionTime = 0.3,
  title,
  description,
  onClose,
  onYes,
  onNo,
  onYesText,
  onNoText,
}: {
  transitionTime?: number;
  title: string;
  description: string;
  onClose?: () => void;
  onYes?: () => void;
  onNo?: () => void;
  onYesText: string;
  onNoText: string;
}) {
  return (
    <BackgroundOverlay
      as={motion.div}
      initial={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
      animate={{
        backgroundColor: "rgba(0, 0, 0, 0.75)",
        transition: {
          duration: transitionTime / 2,
          ease: cubicBezier(0.85, 0, 0.15, 1),
        },
      }}
      exit={{
        backgroundColor: "rgba(0, 0, 0, 0)",
        transition: {
          duration: transitionTime / 2,
          ease: cubicBezier(0.85, 0, 0.15, 1),
        },
      }}
      onClick={onClose}
    >
      <Container
        as={motion.div}
        variants={fadeAndIncrease(0, 0, 0.3, 0.3)}
        initial="initial"
        animate="animate"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
      >
        <Title>{title}</Title>
        <Desc>{description}</Desc>
        <div></div>
        <ButtonContainer>
          <ModalAddMoreButton type="primary" onClick={onYes}>
            {onYesText}
          </ModalAddMoreButton>
          <ModalCheckoutButton type="secondary" onClick={onNo}>
            {onNoText}
          </ModalCheckoutButton>
        </ButtonContainer>
      </Container>
    </BackgroundOverlay>
  );
}
