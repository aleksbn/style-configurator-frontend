import React, { useEffect, useState } from "react";
import Cart from "./Final/Cart";
import CartItemDisplay from "./Final/CartItemDisplay";
import PriceBreakdownDisplay from "./Final/PriceBreakdownDisplay";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import type { IModel } from "../models/Model";
import type { ICartItem } from "../models/Cart";
import { setConfiguration } from "../store/slices/configurationSlice";
import Footer from "../components/ui/Footer";
import { Button } from "../components/style/Buttons.style";
import { clearCart } from "../store/slices/cartSlice";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  justify-content: center;
  align-items: center;
  margin-top: 70px;
  width: 100%;
  height: calc(100svh - 140px);
  padding: 35px;
`;

export default function Final() {
  const [selectedCartItem, setSelectedCartItem] = useState<ICartItem | null>(
    null,
  );
  const cartRedux = useAppSelector((state) => state.cart);
  const allModels = Object.values(useAppSelector((state) => state.models.data))
    .map((model) => model.options)
    .map((options) => Object.values(options))
    .flat() as IModel[];
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  console.log(cartRedux);

  const handleItemClick = (item: ICartItem) => {
    setSelectedCartItem(item);
    dispatch(setConfiguration(item.configKey));
  };

  const handleClearCartClick = () => {
    dispatch(clearCart());
    navigate("/products");
  };

  return (
    <>
      <Container>
        <Cart
          selectItem={handleItemClick}
          cartRedux={cartRedux}
          allModels={allModels}
        />
        <CartItemDisplay
          selectedCartItem={selectedCartItem}
          allModels={allModels}
        />
        <PriceBreakdownDisplay
          cartRedux={cartRedux.items}
          allModels={allModels}
        />
      </Container>
      <Footer>
        <div></div>
        <Button type="secondary" onClick={handleClearCartClick}>
          Clear cart
        </Button>
        <Button type="secondary" className="right">
          Download PDF receipt
        </Button>
      </Footer>
    </>
  );
}
