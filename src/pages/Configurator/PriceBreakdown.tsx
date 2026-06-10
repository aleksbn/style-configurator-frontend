import React from "react";
import styled from "styled-components";
import type { IModel, IOption } from "../../models/Model";
import calculateOneItemPrice from "../../helpers/priceHelper";

const StyledPriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding-left: 20%;
  width: 100%;
  height: calc(100svh - 240px);
`;

const StyledTitle = styled.h2`
  text-align: center;
`;

const StyledPart = styled.p``;

const StyledPriceInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
  width: 100%;
`;

const StyledPriceLabel = styled.span``;

const StyledPrice = styled.span``;

export default function PriceBreakdown({
  model,
  options,
}: {
  model: IModel | null;
  options: IOption[];
}) {
  return (
    <StyledPriceContainer>
      <StyledTitle>{model?.name}</StyledTitle>
      <StyledPart>Base price</StyledPart>
      <StyledPriceInfoContainer>
        <StyledPriceLabel>Amount:</StyledPriceLabel>
        <StyledPrice>${model?.base_price.toFixed(2)}</StyledPrice>
      </StyledPriceInfoContainer>
      {Object.values(model?.options).map((option: IOption) => (
        <>
          <StyledPart key={option.code}>{option.name}</StyledPart>
          <StyledPriceInfoContainer>
            <StyledPriceLabel>Amount:</StyledPriceLabel>
            <StyledPrice>
              ${calculateOneItemPrice(option).toFixed(2)}
            </StyledPrice>
          </StyledPriceInfoContainer>
        </>
      ))}
      <StyledPart>Total</StyledPart>
      <StyledPriceInfoContainer>
        <StyledPriceLabel>Amount:</StyledPriceLabel>
        <StyledPrice>
          $
          {(
            options.reduce((acc, option) => acc + calculatePrice(option), 0) +
            model?.base_price
          ).toFixed(2)}
        </StyledPrice>
      </StyledPriceInfoContainer>
    </StyledPriceContainer>
  );
}
