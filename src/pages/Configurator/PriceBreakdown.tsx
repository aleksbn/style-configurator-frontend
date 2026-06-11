import React from "react";
import styled from "styled-components";
import { BackgroundOverlay } from "../../components/style/Common.style";
import { cubicBezier, motion } from "framer-motion";
import { SlideLeft } from "../../animations/Slide";
import { IoMdClose } from "react-icons/io";

const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding-left: 20%;
  min-width: 30%;
  max-width: 40%;
  height: 100%;
  background-color: rgb(131, 238, 229);
  padding: 80px 60px;
  position: absolute;
  top: 0;
  right: 0;

  & > .close-icon {
    position: absolute;
    top: 20px;
    left: 20px;
    cursor: pointer;
  }
`;

const Title = styled.h2`
  text-align: center;
  padding-bottom: 60px;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const Part = styled.div`
  text-transform: uppercase;
  padding-bottom: 20px;
  letter-spacing: 0.1em;
`;

const PriceInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 40px;
  width: 100%;
  padding-bottom: 8px;
`;

const Underline = styled.div`
  width: 100%;
  height: 3px;
  background-color: rgba(0, 0, 0, 0.2);
  margin-bottom: 42px;
`;

const PriceLabel = styled.span``;

const Price = styled.span``;

export default function PriceBreakdown({
  name,
  price: priceObject,
  transitionTime = 0.3,
  onClose,
}: {
  name: string;
  price: { [key: string]: number };
  transitionTime?: number;
  onClose?: () => void;
}) {
  return (
    <BackgroundOverlay
      as={motion.div}
      initial={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
      animate={{
        backgroundColor: "rgba(0, 0, 0, 0.75)",
        transition: {
          duration: transitionTime / 2,
          ease: cubicBezier(0.85, 0, 0.15, 1),
        },
      }}
      exit={{
        backgroundColor: "rgba(0, 0, 0, 0)",
        transition: {
          duration: transitionTime / 2,
          ease: cubicBezier(0.85, 0, 0.15, 1),
        },
      }}
      onClick={onClose}
    >
      <PriceContainer
        as={motion.div}
        variants={SlideLeft(0, 0, 0.5, 0.5, false, "100%")}
        initial="initial"
        animate="animate"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
      >
        <IoMdClose onClick={onClose} size={30} className="close-icon" />
        <Title>{name}</Title>
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
              <React.Fragment key={key}>
                <Part>{key}</Part>
                <PriceInfoContainer>
                  <PriceLabel>Amount:</PriceLabel>
                  <Price>${price.toFixed(2)}</Price>
                </PriceInfoContainer>
                <Underline />
              </React.Fragment>
            ),
        )}
        <Part>Total</Part>
        <PriceInfoContainer>
          <PriceLabel>Amount:</PriceLabel>
          <Price>${priceObject["Total price"].toFixed(2)}</Price>
        </PriceInfoContainer>
        <Underline />
      </PriceContainer>
    </BackgroundOverlay>
  );
}
