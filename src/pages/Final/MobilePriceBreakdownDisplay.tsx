import React from "react";
import Modal from "../../components/ui/Modal";
import PriceBreakdownDisplay from "./PriceBreakdownDisplay";
import type { IPrice } from "../../models/Cart";
import { IoMdClose } from "react-icons/io";

export default function MobilePriceBreakdownDisplay({
  allPrices,
  totalPrice,
  loading,
  onClose,
}: {
  allPrices: IPrice[];
  totalPrice: { totalPrice: number; note: string };
  loading: boolean;
  onClose: () => void;
}) {
  return (
    <Modal type="left" onClose={onClose}>
      <IoMdClose onClick={onClose} size={30} className="close-icon" />
      <PriceBreakdownDisplay
        allPrices={allPrices}
        totalPrice={totalPrice}
        loading={loading}
        isInModal={true}
      />
    </Modal>
  );
}
