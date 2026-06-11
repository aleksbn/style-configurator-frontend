import React from "react";
import styled from "styled-components";

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
  name,
  price: priceObject,
}: {
  name: string;
  price: { [key: string]: number };
}) {
  return (
    <StyledPriceContainer>
      <StyledTitle>{name}</StyledTitle>
      <StyledPart>Base price</StyledPart>
      <StyledPriceInfoContainer>
        <StyledPriceLabel>Amount:</StyledPriceLabel>
        <StyledPrice>${priceObject["Base price"]?.toFixed(2)}</StyledPrice>
      </StyledPriceInfoContainer>
      {Object.entries(priceObject).map(
        ([key, price]) =>
          key !== "Base price" &&
          key !== "Total price" && (
            <React.Fragment key={key}>
              <StyledPart>{key}</StyledPart>
              <StyledPriceInfoContainer>
                <StyledPriceLabel>Amount:</StyledPriceLabel>
                <StyledPrice>${price.toFixed(2)}</StyledPrice>
              </StyledPriceInfoContainer>
            </React.Fragment>
          ),
      )}
      <StyledPart>Total</StyledPart>
      <StyledPriceInfoContainer>
        <StyledPriceLabel>Amount:</StyledPriceLabel>
        <StyledPrice>${priceObject["Total price"].toFixed(2)}</StyledPrice>
      </StyledPriceInfoContainer>
    </StyledPriceContainer>
  );
}
