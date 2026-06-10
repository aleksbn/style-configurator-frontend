import React, { useState } from "react";
import type { IModel, IOption } from "../../models/Model";
import styled from "styled-components";
import ColorPickerModal from "./ColorPickerModal";
import { AnimatePresence } from "framer-motion";
import calculateOneItemPrice from "../../helpers/priceHelper";

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
  padding-left: 20%;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding-left: 20%;
  padding-right: 20%;
  width: 100%;
  gap: 40px;
`;

const MainContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 12px;
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
  margin-top: 24px;
`;

const Radio = styled.input`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  cursor: pointer;
`;

const RadioLabel = styled.label`
  cursor: pointer;
`;

const SizeSelectorLabel = styled.label`
  cursor: pointer;
`;

const SizeSelectorContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 96px;
`;

const Arrow = styled.div`
  position: absolute;
  top: 50%;
  right: 16px;
  transform: translateY(-50%);
  width: 10px;
  height: 10px;
  border-right: 2px solid #6b7280;
  border-bottom: 2px solid #6b7280;
  transform: translateY(-70%) rotate(45deg);
  pointer-events: none;
  transition: border-color 0.2s ease;
`;

const SizeSelector = styled.select`
  width: 100%;
  height: 46px;
  padding: 0 40px 0 16px; /* Extra right padding protects text from overlapping the arrow */
  font-size: 16px;
  color: #1f2937;
  background-color: #ffffff;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  cursor: pointer;
  outline: none;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease-in-out;

  /* Hides default native browser arrow across modern engines */
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  &:hover {
    border-color: #9ca3af;
  }

  &:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.5);

    + ${Arrow} {
      border-color: #2563eb;
    }
  }
`;

const SizeOption = styled.option`
  cursor: pointer;
`;

const TotalPriceContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding-left: 20%;
`;

const TotalPriceLabel = styled.label`
  cursor: pointer;
`;

const TotalPrice = styled.span``;

export default function ConfigureOptions({
  selectedOption,
  update_color,
  update_parts,
  model,
}: {
  selectedOption: IOption | null;
  update_color: (partid: string, color: string) => void;
  update_parts: (partid: string, partvalue: string) => void;
  model: IModel | null;
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
      <Title>{selectedOption?.name}</Title>
      <Body>
        <MainContainer>
          {selectedOption?.multi_option_type &&
            selectedOption.multi_option_type.map((option) => (
              <>
                <RadioLabel
                  onClick={() =>
                    update_parts(selectedOption?.code || "", option.code)
                  }
                >
                  {option.name}
                </RadioLabel>
                <Radio
                  type="radio"
                  key={option.value}
                  value={option.value}
                  checked={option.value === selectedOption.selected_type}
                  onClick={() =>
                    update_parts(selectedOption?.code || "", option.code)
                  }
                />
              </>
            ))}
          <ColorLabel>Select color:</ColorLabel>
          <ColorCircle
            style={{
              backgroundColor: `#${selectedColor}`,
              borderColor: invertedColor,
            }}
            onClick={() => setColorPickerOpened(!colorPickerOpened)}
          />

          <SizeSelectorLabel>Size:</SizeSelectorLabel>
          <SizeSelectorContainer>
            <SizeSelector>
              {model?.sizes.map((size) => (
                <SizeOption
                  key={size}
                  onClick={() => console.log(size)}
                  selected={size === model?.selected_size}
                >
                  {size}
                </SizeOption>
              ))}
            </SizeSelector>
            <Arrow />
          </SizeSelectorContainer>
        </MainContainer>
      </Body>
      <TotalPriceContainer>
        <TotalPriceLabel>Total price:</TotalPriceLabel>
        <TotalPrice>
          $
          {(
            Object.values(model?.options).reduce(
              (acc, option) => acc + calculateOneItemPrice(option),
              0,
            ) + model?.base_price
          ).toFixed(2)}
        </TotalPrice>
      </TotalPriceContainer>
    </Container>
  );
}
