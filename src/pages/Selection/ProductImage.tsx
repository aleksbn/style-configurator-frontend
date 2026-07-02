import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";
import { fade } from "../../animations/Fade";
import useBreakpoint from "../../hooks/useBreakpoints";
import type { IModelWithPrice } from "../../models/Model";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 10vh;
  padding-bottom: 10vh;
  width: 100%;
  height: calc(100svh - 140px);
  gap: 16px;
  position: relative;

  @media (max-width: 1024px) {
    justify-content: center;
  }
`;

const Image = styled.img`
  max-height: 500px;
  max-width: 500px;

  @media (max-width: 1024px) {
    max-height: 50svh;
    max-width: 50svh;
  }

  @media (max-width: 768px) {
    max-height: 45svh;
    max-width: 45svh;
  }

  @media (max-width: 480px) {
    max-height: 35svh;
    max-width: 35svh;
  }
`;

const PriceContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 10svh;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
`;

const Label = styled.span`
  font-size: 1.2rem;
  margin-right: 10px;
`;

const Price = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
`;

export default function ProductImage({
  currentModel,
  swipeLeft,
  swipeRight,
}: {
  currentModel: IModelWithPrice | null;
  swipeLeft: () => void;
  swipeRight: () => void;
}) {
  const [isInitial, setIsInitial] = useState(true);
  const breakpoint = useBreakpoint();
  return (
    <Container>
      {isInitial && (
        <>
          <Image
            src={currentModel?.sketch}
            key={currentModel?.sketch}
            as={motion.img}
            variants={fade(1.5, 0, 0.5, 0.5)}
            initial="initial"
            animate="animate"
          />
          <PriceContainer
            as={motion.div}
            key={currentModel?.sketch + "price"}
            variants={fade(1.5, 0, 0.5, 0.5)}
            initial="initial"
            animate="animate"
            onAnimationComplete={() => setIsInitial(false)}
          >
            <Label>Starting from:</Label>
            <Price key={currentModel?.sketch}>
              ${currentModel?.base_price}
            </Price>
          </PriceContainer>
        </>
      )}
      {!isInitial && (
        <AnimatePresence mode="wait" initial={false}>
          <Image
            src={currentModel?.sketch}
            key={currentModel?.sketch}
            as={motion.img}
            variants={fade(0, 0, 0.5, 0.5)}
            initial="initial"
            animate="animate"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0}
            onDragEnd={(_, info) => {
              if (info.offset.x < -50) {
                if (breakpoint === "mobile") swipeLeft();
              }
              if (info.offset.x > 50) {
                if (breakpoint === "mobile") swipeRight();
              }
            }}
          />
          <PriceContainer
            as={motion.div}
            key={currentModel?.sketch + "price"}
            variants={fade(0, 0, 0.5, 0.5)}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Label>Starting from:</Label>
            <Price key={currentModel?.price}>
              ${currentModel?.base_price.toFixed(2)}
            </Price>
          </PriceContainer>
        </AnimatePresence>
      )}
    </Container>
  );
}
