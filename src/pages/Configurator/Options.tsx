import React from "react";
import styled from "styled-components";
import type { IOption } from "../../models/Model";

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const StyledPriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding-left: 20%;
  width: 100%;
  height: calc(100svh - 240px);
`;

const StyledOptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding-left: 20%;
  width: 100%;
  height: calc(100svh - 240px);
`;

export default function Options({
  options,
  setSelectedOption,
}: {
  options: IOption[];
  setSelectedOption: React.Dispatch<React.SetStateAction<IOption | null>>;
}) {
  return (
    <StyledContainer>
      <StyledPriceContainer>Price</StyledPriceContainer>
      <StyledOptionsContainer>
        {options.map((option) => (
          <ul key={option.code}>
            <li onClick={() => setSelectedOption(option)}>{option.name}</li>
          </ul>
        ))}
      </StyledOptionsContainer>
    </StyledContainer>
  );
}
