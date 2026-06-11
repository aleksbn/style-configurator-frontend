import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import styled from "styled-components";
import { fade } from "../../animations/Fade";

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  padding-top: 10vh;
  width: 100%;
  height: 100%;
  gap: 16px;
`;

const Image = styled.img`
  height: 500px;
`;

const Label = styled.span`
  font-size: 1.2rem;
  margin-right: 10px;
`;

const Price = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
`;

export default function ProductImage({ currentModel }) {
  const [isInitial, setIsInitial] = useState(true);
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
          <motion.div
            key={currentModel?.sketch + "price"}
            variants={fade(1.5, 0, 0.5, 0.5)}
            initial="initial"
            animate="animate"
            onAnimationComplete={() => setIsInitial(false)}
          >
            <Label>Starting from:</Label>
            <Price key={currentModel?.price}>${currentModel?.base_price}</Price>
          </motion.div>
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
          />
          <motion.div
            key={currentModel?.sketch + "price"}
            variants={fade(0, 0, 0.5, 0.5)}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Label>Starting from:</Label>
            <Price key={currentModel?.price}>${currentModel?.base_price}</Price>
          </motion.div>
        </AnimatePresence>
      )}
    </Container>
  );
}
