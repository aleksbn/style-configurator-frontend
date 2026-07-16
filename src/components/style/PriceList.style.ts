import styled from "styled-components";

const PriceLabel = styled.span``;

const Price = styled.span``;

const Part = styled.div`
  text-transform: uppercase;
  padding-bottom: 14px;
  letter-spacing: 0.1em;

  &.total {
    font-weight: 700;
  }
`;

const PriceInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  padding-left: 40px;
  width: 100%;
  padding-bottom: 8px;

  &.total {
    font-weight: 700;
  }
`;

const UnderlineBase = styled.div`
  width: 100%;
  height: 3px;
  background-color: rgba(0, 0, 0, 0.2);
  flex-shrink: 0;
`;

export { PriceLabel, Price, Part, PriceInfoContainer, UnderlineBase };
