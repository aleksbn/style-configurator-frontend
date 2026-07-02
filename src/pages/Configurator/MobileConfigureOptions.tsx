import { type Dispatch, type SetStateAction } from "react";
import { BackgroundOverlay } from "../../components/style/Common.style";
import { cubicBezier, motion } from "framer-motion";
import ConfigureOptions from "./ConfigureOptions";
import styled from "styled-components";
import { SlideLeft } from "../../animations/Slide";
import type { IModel, IOption } from "../../models/Model";
import { IoMdClose } from "react-icons/io";

const ModalContainer = styled.div`
  height: 100svh;
  width: 50%;
  position: absolute;
  top: 0;
  right: 0;
  background-color: #ffffff;
  padding: 80px 20px 80px 60px;

  & .close-icon {
    position: absolute;
    top: 20px;
    left: 20px;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    padding: 80px 20px;
  }

  @media (max-width: 575px) {
    width: 75%;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

export default function MobileConfigureOptions({
  onClose,
  selectedOption,
  update_parts,
  model,
  price,
  numberOfItems,
  setNumberOfItems,
  setSize,
  cartItem,
  setPriceBreakdownOpened,
  colorPickerOpened,
  setColorPickerOpened,
  selectedColor,
}: {
  onClose?: () => void;
  selectedOption: IOption | null;
  update_parts: (partid: string, partvalue: string) => void;
  model: IModel | null;
  price: { [key: string]: number };
  numberOfItems: number;
  setNumberOfItems: Dispatch<SetStateAction<number>>;
  setSize: Dispatch<SetStateAction<string>>;
  cartItem: string[] | undefined;
  priceBreakdownOpened: boolean;
  setPriceBreakdownOpened: Dispatch<SetStateAction<boolean>>;
  colorPickerOpened: boolean;
  setColorPickerOpened: Dispatch<SetStateAction<boolean>>;
  selectedColor: string;
}) {
  return (
    <BackgroundOverlay
      as={motion.div}
      initial={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
      animate={{
        backgroundColor: "rgba(0, 0, 0, 0.75)",
        transition: {
          duration: 0.3,
          ease: cubicBezier(0.85, 0, 0.15, 1),
        },
      }}
      exit={{
        backgroundColor: "rgba(0, 0, 0, 0)",
        transition: {
          duration: 0.3,
          ease: cubicBezier(0.85, 0, 0.15, 1),
        },
      }}
      onClick={onClose}
    >
      <ModalContainer
        as={motion.div}
        variants={SlideLeft(0, 0, 0.5, 0.5, false, 500)}
        initial="initial"
        animate="animate"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
      >
        <IoMdClose className="close-icon" onClick={onClose} size={32} />
        <ConfigureOptions
          selectedOption={selectedOption}
          update_parts={update_parts}
          model={model}
          price={price}
          numberOfItems={numberOfItems}
          setNumberOfItems={setNumberOfItems}
          setSize={setSize}
          cartItem={cartItem}
          setPriceBreakdownOpened={setPriceBreakdownOpened}
          colorPickerOpened={colorPickerOpened}
          setColorPickerOpened={setColorPickerOpened}
          selectedColor={selectedColor}
        />
      </ModalContainer>
    </BackgroundOverlay>
  );
}
