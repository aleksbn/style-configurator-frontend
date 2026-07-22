import { motion } from "framer-motion";
import styled from "styled-components";
import { SlideRight } from "../../animations/Slide";
import { animated } from "../../animations/Motion";
import type { IModel } from "../../models/Model";
import type { Dispatch, SetStateAction } from "react";

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-top: 10svh;
  padding-bottom: 10svh;
  padding-left: 40%;
  width: 100%;
  height: calc(100svh - 140px);

  @media (max-width: 768px) {
    padding-left: 10%;
    padding-bottom: 5svh;
    padding-top: 5svh;
  }
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

export default function ProductList({
  models,
  setCurrentModel,
  currentModel,
}: {
  models: Record<string, { name: string; options: Record<string, IModel> }>;
  currentModel: IModel | null;
  setCurrentModel: Dispatch<SetStateAction<IModel | null>>;
}) {
  let delayIn = 0.5;
  return (
    <Container>
      <List>
        {Object.values(models).map((model) => (
          <motion.li
            key={model.name}
            {...animated(SlideRight((delayIn += 0.2), 0, 0.5, 0.5, true))}
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
