import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { HexColorPicker } from "react-colorful";
import { fadeAndIncrease } from "../../animations/Fade";
import ColorApi from "../../Api/ColorApiHelper";
import { Button } from "../../components/style/Buttons.style";
import ModalBackdrop from "../../components/ui/ModalBackdrop";

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

  @media (max-width: 1024px) {
    background-color: rgba(240, 248, 255, 0.9);
  }

  @media (max-width: 768px) {
    padding: 40px;
    border-radius: 40px;
    height: 80svh;
    width: 80svw;

    & .react-colorful {
      height: 60svh;
      width: 60svw;
    }

    & .button {
      width: 60svw;
    }
  }

  @media (max-width: 480px) {
    padding: 0;
    border-radius: 0;
    height: 100svh;
    width: 100svw;

    & .react-colorful {
      height: 75svw;
      width: 75svw;
    }

    & .button {
      width: 75svw;
    }
  }
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

  @media (max-width: 768px) {
    width: 60svw;
  }

  @media (max-width: 480px) {
    width: 75svw;
  }
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
    return response.name.value;
  };

  useEffect(() => {
    let active = true;
    const timer = setTimeout(() => {
      getColorName(selectedColor)
        .then((name) => {
          if (active) setColorName(name);
        })
        .catch(() => {
          if (active) setColorName(selectedColor);
        });
    }, 300);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [selectedColor]);

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
        <HexColorPicker
          color={selectedColor}
          onChange={(color) => setSelectedColor(color)}
        />
        <ColorPreview>
          <ColorSwatch color={selectedColor} />
          <HexLabel>{colorName}</HexLabel>
        </ColorPreview>
        <Button
          type="tertiary"
          className="button"
          style={{
            borderRadius: "10px 10px 0 0",
            borderWidth: "0px",
          }}
          onClick={() => {
            onChange(selectedColor);
            onClose?.();
          }}
        >
          OK
        </Button>
        <Button
          type="quaternary"
          className="button"
          style={{
            borderRadius: "0 0 10px 10px",
            borderWidth: "0px",
          }}
          onClick={onClose}
        >
          Cancel
        </Button>
      </Container>
    </ModalBackdrop>
  );
}
