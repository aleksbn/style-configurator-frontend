import { motion } from "framer-motion";
import styled from "styled-components";
import { fadeAndIncrease } from "../../animations/Fade";
import { Button } from "../style/Buttons.style";
import ModalBackdrop from "./ModalBackdrop";

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

  @media (max-width: 600px) {
    width: 88%;
    height: auto;
    max-height: 80svh;
    padding: 10% 6% 32px 6%;
  }
`;

const Title = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin: 0 0 48px 0;
  text-align: center;

  @media (max-width: 600px) {
    font-size: 1.4rem;
    margin-bottom: 24px;
  }
`;

const Desc = styled.div`
  font-size: 1.4rem;
  text-align: center;
  margin-bottom: 32px;

  @media (max-width: 600px) {
    font-size: 1rem;
    margin-bottom: 24px;
  }
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

  @media (max-width: 600px) {
    position: static;
    transform: none;
    flex-direction: column;
    gap: 16px;
    width: 100%;
    min-width: unset;
    max-width: 100%;
  }
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
    <ModalBackdrop duration={transitionTime / 2} onClose={onClose}>
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
          <Button type="tertiary" onClick={onYes}>
            {onYesText}
          </Button>
          <Button type="quaternary" onClick={onNo}>
            {onNoText}
          </Button>
        </ButtonContainer>
      </Container>
    </ModalBackdrop>
  );
}
