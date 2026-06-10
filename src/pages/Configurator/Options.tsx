import React from "react";
import styled from "styled-components";
import type { IModel, IOption } from "../../models/Model";

const StyledContainer = styled.div`
  padding-left: 20%;
`;

const StyledOptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  justify-content: center;
  align-items: flex-start;
  padding-left: 20%;
  width: 100%;
  height: calc(100svh - 240px);
`;

const StyledOptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledOption = styled.div`
  cursor: pointer;
  font-size: 1.4rem;
  text-transform: uppercase;

  &:hover {
    font-weight: bold;
  }

  &.selected {
    font-weight: bold;
  }
`;

const StyledUnderline = styled.div`
  width: 0%;
  height: 2px;
  background-color: #000000;
  transition: width 0.3s ease-in-out;

  &.selected {
    width: 100%;
  }
`;

export default function Options({
  options,
  setSelectedOption,
  selectedOption,
}: {
  options: IOption[];
  setSelectedOption: React.Dispatch<React.SetStateAction<IOption | null>>;
  selectedOption: IOption | null;
}) {
  return (
    <StyledContainer>
      <StyledOptionsContainer>
        {options.map((option) => (
          <StyledOptionContainer>
            <StyledOption
              key={option.code}
              onClick={() => setSelectedOption(option)}
              className={selectedOption?.code === option.code ? "selected" : ""}
            >
              {option.name}
            </StyledOption>
            <StyledUnderline
              className={selectedOption?.code === option.code ? "selected" : ""}
            />
          </StyledOptionContainer>
        ))}
      </StyledOptionsContainer>
    </StyledContainer>
  );
}
