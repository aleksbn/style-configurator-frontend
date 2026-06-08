import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import styled from "styled-components";
import { fade } from "../../animations/Fade";

const StyledContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  padding-top: 10vh;
  width: 100%;
  height: 100%;
`;

const StyledImage = styled.img`
  height: 500px;
`;

const StyledLabel = styled.span`
  font-size: 1.2rem;
  margin-right: 10px;
`;

const StyledPrice = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
`;

export default function ProductImage({ currentModel }) {
  const [isInitial, setIsInitial] = useState(true);
  return (
    <StyledContainer>
      {isInitial && (
        <>
          <StyledImage
            src={currentModel?.sketch}
            key={currentModel?.sketch}
            as={motion.img}
            variants={fade(1.5, 0, 0.5, 0.5)}
            initial="initial"
            animate="animate"
          />
          <motion.div
            key={currentModel?.sketch + "price"}
            variants={fade(1.5, 0, 0.5, 0.5)}
            initial="initial"
            animate="animate"
            onAnimationComplete={() => setIsInitial(false)}
          >
            <StyledLabel>Starting from:</StyledLabel>
            <StyledPrice key={currentModel?.price}>
              ${currentModel?.base_price}
            </StyledPrice>
          </motion.div>
        </>
      )}
      {!isInitial && (
        <AnimatePresence mode="wait" initial={false}>
          <StyledImage
            src={currentModel?.sketch}
            key={currentModel?.sketch}
            as={motion.img}
            variants={fade(0, 0, 0.5, 0.5)}
            initial="initial"
            animate="animate"
            exit="exit"
          />
          <motion.div
            key={currentModel?.sketch + "price"}
            variants={fade(0, 0, 0.5, 0.5)}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <StyledLabel>Starting from:</StyledLabel>
            <StyledPrice key={currentModel?.price}>
              ${currentModel?.base_price}
            </StyledPrice>
          </motion.div>
        </AnimatePresence>
      )}
    </StyledContainer>
  );
}
