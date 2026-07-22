import { Fragment } from "react";
import styled from "styled-components";
import type { IPrice } from "../../models/Cart";
import Spinner from "../../components/ui/Spinner";
import {
  PriceLabel,
  Price,
  Part as SharedPart,
  PriceInfoContainer,
  UnderlineBase,
} from "../../components/style/PriceList.style";
import { SlideLeft } from "../../animations/Slide";
import { animated } from "../../animations/Motion";
import { motion } from "framer-motion";
import { PriceBreakdownContainer } from "../../components/style/Common.style";

const PriceListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
`;

const Part = styled(SharedPart)`
  > span {
    font-style: italic;
    text-transform: lowercase;
  }
`;

const Underline = styled(UnderlineBase)`
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 8px;
  }
`;

const Note = styled.span`
  font-size: 0.8rem;
  font-style: italic;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export default function PriceBreakdownDisplay({
  allPrices,
  totalPrice,
  loading,
  isInModal = false,
}: {
  allPrices: IPrice[];
  totalPrice: { totalPrice: number; note: string };
  loading: boolean;
  isInModal?: boolean;
}) {
  if (loading) {
    return (
      <PriceBreakdownContainer>
        <Spinner />
      </PriceBreakdownContainer>
    );
  }

  const animation = !isInModal
    ? animated(SlideLeft(1, 0, 0.5, 0.5, true, 500))
    : {};

  return (
    <PriceBreakdownContainer
      className={isInModal ? "in-modal" : ""}
      as={motion.div}
      {...animation}
    >
      <PriceListContainer>
        {allPrices.map((price) => (
          <Fragment key={price.Name + price.Size + price.Quantity}>
            <Part>
              {price.Name + " - " + price.Size} <span>x {price.Quantity}</span>
            </Part>
            <PriceInfoContainer>
              <PriceLabel>Price per item:</PriceLabel>
              <Price>${price.PricePerItem.toFixed(2)}</Price>
            </PriceInfoContainer>
            <PriceInfoContainer>
              <PriceLabel>Total:</PriceLabel>
              <Price>${price.TotalPrice.toFixed(2)}</Price>
            </PriceInfoContainer>
            <Underline />
          </Fragment>
        ))}
        <Part className="total">{`Total (${allPrices.reduce((acc, curr) => acc + curr.Quantity, 0)} item${allPrices.reduce((acc, curr) => acc + curr.Quantity, 0) > 1 ? "s" : ""})`}</Part>
        <PriceInfoContainer className="total">
          <PriceLabel>Full price (with discount):</PriceLabel>
          <Price>${totalPrice?.totalPrice.toFixed(2)}</Price>
        </PriceInfoContainer>
        <Note>{totalPrice?.note}</Note>
        <Underline />
      </PriceListContainer>
    </PriceBreakdownContainer>
  );
}
