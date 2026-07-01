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
import { useAppDispatch } from "../../store/hooks";
import { removeFromCart } from "../../store/slices/cartSlice";
import YesNoDialog from "../../components/ui/YesNoDialog";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 30px;
  width: 100%;
  height: calc(100svh - 240px);
  overflow-y: hidden;
  position: relative;

  @media (max-width: 1024px) {
    padding: 20px;
  }

  @media (max-width: 768px) {
    padding: 10px;
  }

  @media (max-width: 480px) {
    padding: 5px;
  }
`;

const None = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  letter-spacing: 1px;
  text-transform: uppercase;
  text-align: center;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 2.5rem;

  @media (max-width: 1024px) {
    font-size: 1.8rem;
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
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

  @media (max-width: 1024px) {
    height: calc(100% - 50px);
  }
`;

const ButtonsContainer = styled.div`
  position: absolute;
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function CartItemDisplay({
  selectItem,
  selectedCartItem,
  allModels,
  isFirstInteraction,
  smallerThan768px,
}: {
  selectItem: (item: ICartItem | null) => void;
  selectedCartItem: ICartItem | null;
  allModels: IModel[];
  isFirstInteraction: boolean;
  smallerThan768px: boolean;
}) {
  const [selectedModel, setSelectedModel] = useState<IModel | null>(null);
  const [modelKey, setModelKey] = useState<string>("");
  const [modelName, setModelName] = useState<string>("");
  const [size, setSize] = useState<string>("");
  const [maxButtonWidth, setMaxButtonWidth] = useState(50);
  const [deletionDialogOpen, setDeletionDialogOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    const allButtons = document.querySelectorAll(".button");
    const maxWidth = Math.max(
      ...Array.from(allButtons).map((b) => b.offsetWidth),
    );
    setMaxButtonWidth(maxWidth);
  }, [selectedModel]);

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

  const handleClickDelete = () => {
    if (selectedCartItem) {
      dispatch(removeFromCart(selectedCartItem));
      setDeletionDialogOpen(false);
      setModelKey("");
      setSelectedModel(null);
      selectItem(null);
    }
  };

  if (!selectedCartItem && isFirstInteraction)
    return (
      <Container>
        <None>{`Click on a ${smallerThan768px ? `"show cart" to select a model` : "cart item to see a model"}`}</None>
      </Container>
    );

  if (selectedCartItem)
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
        <ButtonsContainer>
          <Button
            as={motion.div}
            variants={fade(0.3, 0, 0.3, 0.3)}
            initial="initial"
            animate="animate"
            className="button"
            style={{
              borderRadius: "40px 0 0 40px",
              width: `${maxButtonWidth}px`,
            }}
            onClick={() => {
              localStorage.setItem("previousPath", location.pathname);
              navigate({
                pathname: "/compose",
                search: `${createSearchParams({ cartItem: `${selectedCartItem.configKey}|${selectedCartItem.size}|${selectedCartItem.quantity}` })}`,
              });
            }}
            type="primary"
          >
            Edit
          </Button>
          <Button
            as={motion.div}
            variants={fade(0.3, 0, 0.3, 0.3)}
            initial="initial"
            animate="animate"
            className="button"
            style={{
              borderRadius: "0 40px 40px 0",
              width: `${maxButtonWidth}px`,
            }}
            onClick={() => setDeletionDialogOpen(true)}
            type="secondary"
          >
            Delete
          </Button>
        </ButtonsContainer>
        <AnimatePresence>
          {deletionDialogOpen && (
            <YesNoDialog
              transitionTime={0.3}
              title="Deleting item"
              description="Are you sure you want to delete this item?"
              onClose={() => setDeletionDialogOpen(false)}
              onYes={handleClickDelete}
              onNo={() => setDeletionDialogOpen(false)}
              onYesText="Yes"
              onNoText="No"
            />
          )}
        </AnimatePresence>
      </Container>
    );

  return <Container></Container>;
}
