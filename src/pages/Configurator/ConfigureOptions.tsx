import React, { useState } from "react";
import type { IModel, IOption } from "../../models/Model";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding-left: 20%;
  width: 100%;
  height: calc(100svh - 240px);

  @media (max-width: 1280px) {
    padding-left: 0;
  }
`;

const Title = styled.h2`
  padding-left: 20%;

  @media (max-width: 1280px) {
    padding-left: 10%;
  }
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

  @media (max-width: 1280px) {
    padding-left: 10%;
    padding-right: 10%;
  }
`;

const MainContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 12px;
  position: relative;
`;

const ColorLabel = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-top: 24px;
  gap: 8px;
`;

const ColorCircle = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: 5px solid #000;
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

const Label = styled.label`
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
  padding: 0 40px 0 16px;
  font-size: 16px;
  color: #1f2937;
  background-color: #ffffff;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  cursor: pointer;
  outline: none;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease-in-out;

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

const PriceContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding-left: 20%;

  @media (max-width: 1280px) {
    padding-left: 10%;
  }

  @media (max-width: 1024px) {
    visibility: hidden;
  }
`;

const NumberOfItemsInput = styled.input`
  width: 100%;
  height: 46px;
  padding: 0 16px;
  font-size: 16px;
  color: #1f2937;
  background-color: #ffffff;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  cursor: pointer;
  outline: none;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease-in-out;
`;

const Price = styled.span`
  font-weight: bold;
`;

const Error = styled.span`
  color: red;
  font-style: italic;
  font-size: 0.8rem;
  position: absolute;
  bottom: -24px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  display: none;
  &.visible {
    display: block;
  }
`;

export default function ConfigureOptions({
  selectedOption,
  update_parts,
  model,
  price,
  numberOfItems,
  setNumberOfItems,
  setSize,
  cartItem,
  setPriceBreakdownOpened,
  colorPickerOpened,
  setColorPickerOpened,
  selectedColor,
}: {
  selectedOption: IOption | null;
  update_parts: (partid: string, partvalue: string) => void;
  model: IModel | null;
  price: { [key: string]: number };
  numberOfItems: number;
  setNumberOfItems: React.Dispatch<React.SetStateAction<number>>;
  setSize: React.Dispatch<React.SetStateAction<string>>;
  cartItem: string[] | undefined;
  setPriceBreakdownOpened: React.Dispatch<React.SetStateAction<boolean>>;
  colorPickerOpened: boolean;
  setColorPickerOpened: React.Dispatch<React.SetStateAction<boolean>>;
  selectedColor: string;
}) {
  const [inputValue, setInputValue] = useState(String(numberOfItems));
  const [errorDisplayed, setErrorDisplayed] = useState(false);
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

  const handleNumberOfItemsChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setInputValue(e.target.value);
    setErrorDisplayed(false);
  };

  const handleNumberOfItemsBlur = () => {
    const desiredNumber = Number(inputValue);
    if (isNaN(desiredNumber) || desiredNumber < 1) {
      setNumberOfItems(1);
      setInputValue("1");
      setErrorDisplayed(true);
    } else if (desiredNumber > 10) {
      setNumberOfItems(10);
      setInputValue("10");
      setErrorDisplayed(true);
    } else {
      setNumberOfItems(desiredNumber);
      setInputValue(String(desiredNumber));
      setErrorDisplayed(false);
    }
  };

  return (
    <Container>
      <Title>{selectedOption?.name}</Title>
      <Body>
        <MainContainer>
          {selectedOption?.multi_option_type &&
            selectedOption.multi_option_type.map((option) => (
              <>
                <Label
                  onClick={() =>
                    update_parts(selectedOption?.code || "", option.code)
                  }
                >
                  {option.name}
                </Label>
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
          <Label>Size:</Label>
          <SizeSelectorContainer>
            <SizeSelector onChange={(e) => setSize(e.target.value)}>
              {model?.sizes.map((sizeValue) => (
                <SizeOption
                  key={sizeValue}
                  selected={
                    sizeValue == cartItem?.[1] ||
                    sizeValue === model?.selected_size
                  }
                >
                  {sizeValue}
                </SizeOption>
              ))}
            </SizeSelector>
            <Arrow />
          </SizeSelectorContainer>
          <Label>Number of items:</Label>
          <NumberOfItemsInput
            type="number"
            min="1"
            max="10"
            step="1"
            value={inputValue}
            onChange={handleNumberOfItemsChange}
            onBlur={handleNumberOfItemsBlur}
          />
          <Error className={errorDisplayed ? "visible" : ""}>
            You can only select between 1 and 10 items
          </Error>
        </MainContainer>
      </Body>
      <PriceContainer onClick={() => setPriceBreakdownOpened(true)}>
        <Label>Total price:</Label>
        <Price>${(price["Total price"] * numberOfItems).toFixed(2)}</Price>
      </PriceContainer>
    </Container>
  );
}
