import React, { useState } from "react";
import { PageWrap } from "../components/style/Common.style";
import styled from "styled-components";
import Footer from "../components/ui/Footer";
import Model from "./Configurator/Model";
import type { IModel, IOption } from "../models/Model";
import Options from "./Configurator/Options";
import ConfigureOptions from "./Configurator/ConfigureOptions";
import { Button } from "../components/style/Buttons.style";
import { AnimatePresence } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import type { ICartItem } from "../models/Cart";
import YesNoDialog from "../components/ui/YesNoDialog";
import Api from "../Api/ApiHelper";

const PageConfiguratorWrap = styled(PageWrap)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100svh - 140px);
  margin-top: 70px;
`;

const PageConfigurator = styled.div`
  grid-template-columns: 3fr 5fr 3fr;
  display: grid;
  width: 100%;
  height: calc(100svh - 140px);
`;

const Title = styled.h1`
  text-align: center;
  font-size: 2.5rem;
`;

const EmptyDiv = styled.div``;

export default function Configurator({
  model,
  update_color,
  update_parts,
  add_to_cart,
  update_cart,
  price,
  selectedSKU,
}: {
  model: IModel | null;
  update_color: (partid: string, color: string) => void;
  update_parts: (partid: string, partvalue: string) => void;
  add_to_cart: (numberOfItems: number, size: string) => void;
  update_cart: (oldItem: ICartItem, newItem: ICartItem) => void;
  price: { [key: string]: number };
  selectedSKU: string | null;
}) {
  const [selectedOption, setSelectedOption] = useState<IOption | null>(
    Object.values(model?.options ?? {})[0] ?? null,
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const cartItem = searchParams.get("cartItem")?.split("|");
  const [numberOfItems, setNumberOfItems] = useState(
    Number(cartItem?.[2]) || 1,
  );
  const [size, setSize] = useState(model?.selected_size || "");
  const [addToCardDialogOpen, setAddToCardDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handleAddToCartClick = async () => {
    await Api.createConfiguration(selectedSKU!);
    if (cartItem) {
      update_cart(
        { configKey: cartItem[0], size: cartItem[1], quantity: 1 },
        {
          configKey: selectedSKU!,
          size,
          quantity: numberOfItems,
        },
      );
      navigate("/final");
    } else {
      add_to_cart(numberOfItems, size);
      setAddToCardDialogOpen(true);
    }
  };
  const handleAddMore = () => {
    setAddToCardDialogOpen(false);
    setTimeout(() => navigate("/products"), 500);
  };
  const handleCheckout = () => {
    localStorage.setItem("previousPath", location.pathname);
    setAddToCardDialogOpen(false);
    setTimeout(() => navigate("/final"), 500);
  };

  return (
    <>
      <PageConfiguratorWrap>
        <Title>{model?.name}</Title>
        <PageConfigurator>
          <Options
            options={Object.values(model?.options ?? {})}
            setSelectedOption={setSelectedOption}
            selectedOption={selectedOption}
          />
          <Model model={model} type="" />
          <ConfigureOptions
            selectedOption={
              selectedOption
                ? (model?.options[selectedOption.type_name] ?? null)
                : null
            }
            update_color={update_color}
            update_parts={update_parts}
            model={model}
            price={price}
            numberOfItems={numberOfItems}
            setNumberOfItems={setNumberOfItems}
            setSize={setSize}
            cartItem={cartItem}
          />
        </PageConfigurator>
        <AnimatePresence>
          {addToCardDialogOpen && (
            <YesNoDialog
              transitionTime={0.3}
              title="Item added to cart"
              description="Do you want to go back and add some more items? Or go to checkout?"
              onClose={() => setAddToCardDialogOpen(false)}
              onYes={handleAddMore}
              onNo={handleCheckout}
              onYesText="Add more items"
              onNoText="Go to checkout"
            />
          )}
        </AnimatePresence>
      </PageConfiguratorWrap>
      <Footer>
        <EmptyDiv></EmptyDiv>
        <div style={{ overflow: "hidden" }}>
          <Button type="primary" onClick={handleAddToCartClick}>
            {cartItem ? "Update cart" : "Add to cart"}
          </Button>
        </div>
        <EmptyDiv></EmptyDiv>
      </Footer>
    </>
  );
}
