import React, { useEffect, useLayoutEffect, useState } from "react";
import type { ICartItem } from "../../models/Cart";
import styled from "styled-components";
import type { IModel } from "../../models/Model";
import Model from "../Configurator/Model";
import { redoModel, redoReduxModel } from "../../helpers/modelHelper";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { fade } from "../../animations/Fade";
import { createSearchParams, useNavigate } from "react-router-dom";
import { Button } from "../../components/style/Buttons.style";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5%;
  width: 100%;
  height: calc(100svh - 240px);
  overflow-y: hidden;
  position: relative;
`;

const None = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  letter-spacing: 1px;
  text-transform: uppercase;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 2.5rem;
`;

const Size = styled.span`
  font-weight: normal;
  font-style: italic;
`;

const ModelContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 20px;
`;

export default function CartItemDisplay({
  selectedCartItem,
  allModels,
}: {
  selectedCartItem: ICartItem | null;
  allModels: IModel[];
}) {
  const [selectedModel, setSelectedModel] = useState<IModel | null>(null);
  const [modelKey, setModelKey] = useState<string>("");
  const [modelName, setModelName] = useState<string>("");
  const [size, setSize] = useState<string>("");
  const navigate = useNavigate();

  const buttonStyle = {
    position: "absolute",
    bottom: "0px",
    left: "50%",
    transform: "translateX(-50%)",
  };

  useLayoutEffect(() => {
    if (selectedCartItem) {
      setSelectedModel(null);
      setModelKey("");
      setModelName("");
      setSize("");

      setTimeout(() => {
        const newModel = redoReduxModel(allModels, selectedCartItem.configKey);
        setSelectedModel(newModel || null);
        setModelKey(newModel?.id || "");
        setModelName(newModel?.name || "");
        setSize(selectedCartItem.size);
      }, 300);
    }
  }, [selectedCartItem]);

  useEffect(() => {
    if (selectedModel) {
      setTimeout(() => {
        redoModel(selectedModel);
      }, 50);
    }
  }, [selectedModel]);

  if (!selectedCartItem)
    return (
      <Container>
        <None>Click on a cart item to see details</None>
      </Container>
    );

  return (
    <Container>
      <AnimatePresence mode="wait">
        {selectedModel && (
          <>
            <Title
              key={modelKey + "Title"}
              as={motion.h1}
              variants={fade(0, 0, 0.3, 0.3)}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {modelName} - <Size>{size}</Size>
            </Title>
            <ModelContainer
              as={motion.div}
              key={modelKey}
              variants={fade(0, 0, 0.3, 0.3)}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Model model={selectedModel} type="final" />
            </ModelContainer>
          </>
        )}
      </AnimatePresence>
      <Button
        as={motion.div}
        variants={fade(0.3, 0, 0.3, 0.3)}
        initial="initial"
        animate="animate"
        style={buttonStyle}
        onClick={() => {
          navigate({
            pathname: "/compose",
            search: `${createSearchParams({ cartItem: `${selectedCartItem.configKey}|${selectedCartItem.size}|${selectedCartItem.quantity}` })}`,
          });
        }}
        type="primary"
      >
        Configure again
      </Button>
    </Container>
  );
}
