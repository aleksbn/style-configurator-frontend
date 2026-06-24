import React, { useEffect, useState } from "react";
import { cubicBezier, motion } from "framer-motion";
import styled from "styled-components";
import { HexColorPicker } from "react-colorful";
import { fadeAndIncrease } from "../../animations/Fade";
import { BackgroundOverlay } from "../../components/style/Common.style";
import { Api as ColorApi } from "../../Api/ColorApiHelper";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: fit-content;
  padding: 120px;
  background-color: rgba(240, 248, 255, 0.7);
  border-radius: 50px;

  & .react-colorful {
    height: 400px;
    width: 400px;

    & .react-colorful__hue {
      border-radius: 0;
    }
  }
`;

const ModalOkButton = styled.div`
  width: 100%;
  background-color: #000;
  color: #fff;
  padding: 24px 36px;
  border-radius: 10px 10px 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  cursor: pointer;
`;

const ModalCancelButton = styled.div`
  width: 100%;
  background-color: #fff;
  color: #000;
  padding: 24px 36px;
  border-radius: 0 0 10px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  cursor: pointer;
`;

const ColorPreview = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 12px 16px;
  margin-bottom: 16px;
  border-radius: 0 0 8px 8px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: rgba(255, 255, 255, 0.8);
`;

const ColorSwatch = styled.div<{ color: string }>`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
  border: 1px solid rgba(0, 0, 0, 0.15);
`;

const HexLabel = styled.span`
  font-family: monospace;
  font-size: 14px;
  letter-spacing: 0.05em;
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
  const [colorName, setColorName] = useState("");

  const getColorName = async (hex: string): Promise<string> => {
    const cleanHex = hex.replace("#", "");
    const response = await ColorApi.getColorName(cleanHex);
    console.log(response);
    return response.name.value;
  };

  useEffect(() => {
    let active = true;
    const timer = setTimeout(() => {
      getColorName(selectedColor)
        .then((name) => {
          if (active) setColorName(name);
        })
        .catch((err) => {
          if (active) setColorName(selectedColor);
        });
    }, 300);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [selectedColor]);

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
        <HexColorPicker
          color={selectedColor}
          onChange={(color) => setSelectedColor(color)}
        />
        <ColorPreview>
          <ColorSwatch color={selectedColor} />
          <HexLabel>{colorName}</HexLabel>
        </ColorPreview>
        <ModalOkButton
          onClick={() => {
            onChange(selectedColor);
            onClose?.();
          }}
        >
          OK
        </ModalOkButton>
        <ModalCancelButton onClick={onClose}>Cancel</ModalCancelButton>
      </Container>
    </BackgroundOverlay>
  );
}
