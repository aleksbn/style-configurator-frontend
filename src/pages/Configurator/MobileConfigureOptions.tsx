import { type Dispatch, type SetStateAction } from "react";
import { SidePanelBase } from "../../components/style/Common.style";
import { motion } from "framer-motion";
import ConfigureOptions from "./ConfigureOptions";
import styled from "styled-components";
import { SlideLeft } from "../../animations/Slide";
import { animated } from "../../animations/Motion";
import type { IModel, IOption } from "../../models/Model";
import { IoMdClose } from "react-icons/io";
import ModalBackdrop from "../../components/ui/ModalBackdrop";

const ModalContainer = styled(SidePanelBase)`
  height: 100svh;
  width: 50%;

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
  price: Record<string, number>;
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
    <ModalBackdrop onClose={onClose}>
      <ModalContainer
        as={motion.div}
        {...animated(SlideLeft(0, 0, 0.5, 0.5, false, 500))}
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
          startingAnimationNumber={0}
          isInModal={true}
        />
      </ModalContainer>
    </ModalBackdrop>
  );
}
