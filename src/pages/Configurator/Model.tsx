import React from "react";
import type { IModel } from "../../models/Model";
import styled from "styled-components";
import { ReactSVG } from "react-svg";
import useBreakpoint from "../../hooks/useBreakpoints";

const ModelComponent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100svh - 240px);
  padding: 35px;
  gap: 16px;
  ${({ type }) => {
    switch (type) {
      case "final":
        return `
          height: 100%;
        `;
      default:
        return "";
    }
  }}
  & div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;

    @media (max-width: 1024px) {
      height: initial;
    }
  }
  & svg {
    max-width: 100%;
    max-height: 100%;
  }
`;

const Price = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
`;

export default function Model({
  model,
  price,
  numberOfItems,
  showPriceBreakdown,
  type = "",
}: {
  model: IModel | null;
  price: { [key: string]: number };
  numberOfItems: number;
  showPriceBreakdown: () => void;
  type: string;
}) {
  const breakpoint = useBreakpoint();
  if (!model) return null;
  return (
    <ModelComponent type={type}>
      <ReactSVG src={model?.url} alt={model?.name} />
      {breakpoint != "desktop" && (
        <Price onClick={showPriceBreakdown}>
          Total price: ${(price["Total price"] * numberOfItems).toFixed(2)}
        </Price>
      )}
    </ModelComponent>
  );
}
