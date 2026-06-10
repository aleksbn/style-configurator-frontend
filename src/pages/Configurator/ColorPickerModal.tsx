import React, { useState } from "react";
import { cubicBezier, motion } from "framer-motion";
import styled from "styled-components";
import { HexColorPicker } from "react-colorful";
import { fadeAndIncrease } from "../../animations/Fade";

const StyledBackgroundOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100svh;
  background-color: rgba(0, 0, 0, 0);
  z-index: 100;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: fit-content;
  padding: 120px;
  background-color: rgba(240, 248, 255, 0.7);
  border-radius: 50px;
  gap: 32px;

  & .react-colorful {
    height: 400px;
    width: 400px;
  }
`;

const StyledModalOkButton = styled.div`
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
`;

export default function ColorPickerModal({
  transitionTime = 0.3,
  onChange,
  color,
  onClose,
}: {
  transitionTime?: number;
  onChange: (color: string) => void;
  color: string;
  onClose?: () => void;
}) {
  const [selectedColor, setSelectedColor] = useState(color);
  return (
    <StyledBackgroundOverlay
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
      <StyledContainer
        as={motion.div}
        variants={fadeAndIncrease(0, 0, 0.3, 0.3)}
        initial="initial"
        animate="animate"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
      >
        <HexColorPicker
          color={color}
          onChange={(color) => setSelectedColor(color)}
        />
        <StyledModalOkButton
          onClick={() => {
            onChange(selectedColor);
            onClose?.();
          }}
        >
          OK
        </StyledModalOkButton>
      </StyledContainer>
    </StyledBackgroundOverlay>
  );
}
