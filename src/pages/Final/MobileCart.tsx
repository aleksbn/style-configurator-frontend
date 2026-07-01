import React from "react";
import type { ICartItem } from "../../models/Cart";
import type { IModel } from "../../models/Model";
import Cart from "./Cart";
import { IoMdClose } from "react-icons/io";
import Modal from "../../components/ui/Modal";

export default function MobileCart({
  selectItem,
  cartRedux,
  allModels,
  onClose,
}: {
  selectItem: (item: ICartItem) => void;
  cartRedux: { items: ICartItem[] };
  allModels: IModel[];
  onClose: () => void;
}) {
  return (
    <Modal type="left" onClose={onClose}>
      <IoMdClose onClick={onClose} size={30} className="close-icon" />
      <Cart
        selectItem={selectItem}
        cartRedux={cartRedux}
        allModels={allModels}
        onClose={onClose}
      />
    </Modal>
  );
}
