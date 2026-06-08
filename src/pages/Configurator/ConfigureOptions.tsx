import React, { useState } from "react";
import type { IOption } from "../../models/Model";
import styled from "styled-components";
import ColorPickerModal from "./ColorPickerModal";
import { AnimatePresence } from "framer-motion";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding-left: 20%;
  width: 100%;
  height: calc(100svh - 240px);
`;

const Title = styled.h2`
  text-align: center;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding-left: 20%;
  width: 100%;
  gap: 40px;
`;

const ColorContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  gap: 24px;
`;

const ColorLabel = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const ColorCircle = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: 5px solid #000;
  // add glassy effect, like the color is behind a glass
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(4px);
  cursor: pointer;
`;

const StyledMultiOptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  gap: 8px;
`;

const StyledRadioContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const StyledRadio = styled.input`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  cursor: pointer;
`;

const StyledRadioLabel = styled.label`
  cursor: pointer;
`;

export default function ConfigureOptions({
  selectedOption,
  update_color,
  update_parts,
}: {
  selectedOption: IOption | null;
  update_color: (partid: string, color: string) => void;
  update_parts: (partid: string, partvalue: string) => void;
}) {
  const [colorPickerOpened, setColorPickerOpened] = useState(false);
  const selectedColor = selectedOption?.value || selectedOption?.default_value;
  let invertedColor = selectedColor
    ? `#${selectedColor
        .replace("#", "")
        .split("")
        .map((char) => (15 - parseInt(char, 16)).toString(16))
        .join("")}`
    : "#000000";
  if (invertedColor === "#ffffff") {
    invertedColor = "#aaaaaa";
  }

  const handleColorChange = (color: string) => {
    update_color(selectedOption?.code || "", color);
  };

  return (
    <Container>
      <Title>{selectedOption?.name}</Title>
      <Body>
        {selectedOption?.multi_option_type && (
          <StyledMultiOptionContainer>
            {selectedOption.multi_option_type.map((option) => (
              <StyledRadioContainer
                key={option.code}
                onClick={() =>
                  update_parts(selectedOption?.code || "", option.code)
                }
              >
                <StyledRadioLabel>{option.name}</StyledRadioLabel>
                <StyledRadio
                  type="radio"
                  key={option.value}
                  value={option.value}
                  checked={option.value === selectedOption.selected_type}
                />
              </StyledRadioContainer>
            ))}
          </StyledMultiOptionContainer>
        )}
        <AnimatePresence>
          {colorPickerOpened && (
            <ColorPickerModal
              onChange={handleColorChange}
              color={`#${selectedColor}`}
              transitionTime={0.3}
              onClose={() => setColorPickerOpened(false)}
            />
          )}
        </AnimatePresence>
        <ColorContainer>
          <ColorLabel>Selected color:</ColorLabel>
          <ColorCircle
            style={{
              backgroundColor: `#${selectedColor}`,
              borderColor: invertedColor,
            }}
            onClick={() => setColorPickerOpened(!colorPickerOpened)}
          />
        </ColorContainer>
      </Body>
      <div></div>
    </Container>
  );
}
