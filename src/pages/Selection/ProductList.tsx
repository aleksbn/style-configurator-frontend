import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";
import { SlideRight } from "../../animations/Slide";

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding-top: 10vh;
  padding-left: 40%;
  width: 100%;
  height: calc(100svh - 140px);
`;

const Header = styled.h2`
  font-size: 1.2rem;
`;

const Item = styled.div`
  cursor: pointer;
  padding-left: 25px;

  &:last-child {
    padding-bottom: 20px;
  }
`;

const List = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

export default function ProductList({ models, setCurrentModel, currentModel }) {
  let delayIn = 0.5;
  return (
    <Container>
      <List>
        {Object.values(models).map((model) => (
          <motion.li
            key={model.name}
            variants={SlideRight((delayIn += 0.2), 0, 0.5, 0.5, true)}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Header>{model.name.toUpperCase()}</Header>
            {Object.values(model.options).map((option) => (
              <Item key={option.name}>
                <p
                  onClick={() => setCurrentModel(option)}
                  style={{
                    fontWeight:
                      currentModel?.name === option.name ? "bold" : "normal",
                  }}
                >{`${option.name}`}</p>
              </Item>
            ))}
          </motion.li>
        ))}
      </List>
    </Container>
  );
}
