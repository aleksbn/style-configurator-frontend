import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";
import { SlideRight } from "../../animations/Slide";

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 10vh;
  width: 100%;
  height: 100%;
`;

const StyledHeader = styled.h2`
  font-size: 1.2rem;
`;

const StyledItem = styled.div`
  cursor: pointer;
  padding-left: 25px;
`;

const StyledList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

export default function ProductList({ models, setCurrentModel }) {
  let delayIn = 0.5;
  return (
    <StyledContainer>
      <StyledList>
        {Object.values(models).map((model) => (
          <motion.li
            key={model.name}
            variants={SlideRight((delayIn += 0.2), 0, 0.5, 0.5, true)}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <StyledHeader>{model.name.toUpperCase()}</StyledHeader>
            {Object.values(model.options).map((option) => (
              <StyledItem key={option.name}>
                <p
                  onClick={() => setCurrentModel(option)}
                >{`${option.name}`}</p>
              </StyledItem>
            ))}
          </motion.li>
        ))}
      </StyledList>
    </StyledContainer>
  );
}
