import { Fragment } from "react";
import styled from "styled-components";
import { SidePanelBase } from "../../components/style/Common.style";
import {
  PriceLabel,
  Price,
  Part,
  PriceInfoContainer,
  UnderlineBase,
} from "../../components/style/PriceList.style";
import { motion } from "framer-motion";
import { SlideLeft } from "../../animations/Slide";
import { animated } from "../../animations/Motion";
import { IoMdClose } from "react-icons/io";
import { getTotalPrice } from "../../helpers/price";
import ModalBackdrop from "../../components/ui/ModalBackdrop";
import type { IPriceBreakdown } from "../../models/Model";

const PriceBreakdownContainer = styled(SidePanelBase)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  min-width: 30%;
  max-width: 40%;
  height: 100%;

  @media (max-width: 1024px) {
    padding: 80px 20px 80px 20px;
    max-width: initial;
    width: 50svw;
  }

  @media (max-width: 575px) {
    width: 75svw;
  }

  @media (max-width: 480px) {
    padding: 80px 20px 80px 20px;
    width: 100svw;
  }
`;

const PriceListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding-right: 40px;

  @media (max-width: 1024px) {
    padding-right: 0;
  }
`;

const Title = styled.h2`
  text-align: center;
  padding-bottom: 60px;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const Underline = styled(UnderlineBase)`
  margin-bottom: 42px;
`;

export default function PriceBreakdown({
  name,
  price: priceObject,
  transitionTime = 0.3,
  onClose,
  numberOfItems,
}: {
  name: string;
  price: IPriceBreakdown;
  transitionTime?: number;
  onClose?: () => void;
  numberOfItems: number;
}) {
  return (
    <ModalBackdrop duration={transitionTime / 2} onClose={onClose}>
      <PriceBreakdownContainer
        as={motion.div}
        {...animated(SlideLeft(0, 0, 0.5, 0.5, false, "100%"))}
        onClick={(e) => e.stopPropagation()}
      >
        <IoMdClose onClick={onClose} size={30} className="close-icon" />
        <Title>{name}</Title>
        <PriceListContainer>
          <Part>Base price</Part>
          <PriceInfoContainer>
            <PriceLabel>Amount:</PriceLabel>
            <Price>${priceObject["Base price"]?.toFixed(2)}</Price>
          </PriceInfoContainer>
          <Underline />
          {Object.entries(priceObject).map(
            ([key, price]) =>
              key !== "Base price" &&
              key !== "Total price" && (
                <Fragment key={key}>
                  <Part>{key}</Part>
                  <PriceInfoContainer>
                    <PriceLabel>Amount:</PriceLabel>
                    <Price>${price.toFixed(2)}</Price>
                  </PriceInfoContainer>
                  <Underline />
                </Fragment>
              ),
          )}
          <Part>Per item</Part>
          <PriceInfoContainer>
            <PriceLabel>Amount:</PriceLabel>
            <Price>${priceObject["Total price"].toFixed(2)}</Price>
          </PriceInfoContainer>
          <Underline />
          <Part className="total">{`Total (${numberOfItems} item${numberOfItems > 1 ? "s" : ""})`}</Part>
          <PriceInfoContainer className="total">
            <PriceLabel>Amount:</PriceLabel>
            <Price>
              ${getTotalPrice(priceObject, numberOfItems).toFixed(2)}
            </Price>
          </PriceInfoContainer>
          <Underline />
        </PriceListContainer>
      </PriceBreakdownContainer>
    </ModalBackdrop>
  );
}
