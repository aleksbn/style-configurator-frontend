import { motion } from "framer-motion";
import styled from "styled-components";
import { SlideRight } from "../../animations/Slide";
import { IoMdClose } from "react-icons/io";
import type { IModel } from "../../models/Model";
import type { Dispatch, SetStateAction } from "react";
import ModalBackdrop from "../../components/ui/ModalBackdrop";

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 10%;
  padding-bottom: 5svh;
  padding-top: 5svh;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  z-index: 101;
  position: relative;

  & .close-icon {
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
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

export default function ModalProductList({
  models,
  setCurrentModel,
  currentModel,
  onClose,
}: {
  models: Record<string, { name: string; options: Record<string, IModel> }>;
  currentModel: IModel | null;
  setCurrentModel: Dispatch<SetStateAction<IModel | null>>;
  onClose: () => void;
}) {
  return (
    <ModalBackdrop onClose={onClose}>
      <Container
        as={motion.div}
        variants={SlideRight(0, 0, 0.5, 0.5, false, 1000)}
        initial="initial"
        animate="animate"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
      >
        <IoMdClose className="close-icon" onClick={onClose} size={32} />
        <List>
          {Object.values(models).map((model) => (
            <li key={model.name}>
              <Header>{model.name.toUpperCase()}</Header>
              {Object.values(model.options).map((option) => (
                <Item key={option.name}>
                  <p
                    onClick={() => {
                      setCurrentModel(option);
                      onClose();
                    }}
                    style={{
                      fontWeight:
                        currentModel?.name === option.name ? "bold" : "normal",
                    }}
                  >{`${option.name}`}</p>
                </Item>
              ))}
            </li>
          ))}
        </List>
      </Container>
    </ModalBackdrop>
  );
}
