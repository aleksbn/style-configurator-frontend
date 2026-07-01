import React, { useState } from "react";
import { PageWrap, RotateMessage } from "../components/style/Common.style";
import styled, { css } from "styled-components";
import Footer from "../components/ui/Footer";
import Model from "./Configurator/Model";
import type { IModel } from "../models/Model";
import Options from "./Configurator/Options";
import ConfigureOptions from "./Configurator/ConfigureOptions";
import { Button } from "../components/style/Buttons.style";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import type { ICartItem } from "../models/Cart";
import YesNoDialog from "../components/ui/YesNoDialog";
import Api from "../Api/ApiHelper";
import useBreakpoint from "../hooks/useBreakpoints";
import { GrConfigure } from "react-icons/gr";
import PriceBreakdown from "./Configurator/PriceBreakdown";
import ColorPickerModal from "./Configurator/ColorPickerModal";
import MobileConfigureOptions from "./Configurator/MobileConfigureOptions";
import MobileOptions from "./Configurator/MobileOptions";

const PageConfiguratorWrap = styled(PageWrap)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100svh - 140px);
  margin-top: 70px;
  position: relative;
`;

const PageConfigurator = styled.div`
  grid-template-columns: 3fr 5fr 3fr;
  display: grid;
  align-items: flex-end;
  width: 100%;
  height: calc(100svh - 140px);

  @media (max-width: 1024px) {
    grid-template-columns: 3fr 5fr;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    height: calc(100svh - 280px);
  }
`;

const Title = styled.h1`
  text-align: center;
  font-size: 2.5rem;
  height: 50px;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);

  @media (max-width: 1024px) {
    font-size: 2.2rem;
  }

  @media (max-width: 768) {
    font-size: 1.8rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const EmptyDiv = styled.div``;

const ConfigurationBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 36px;
  justify-content: flex-end;
  align-items: center;
  position: absolute;
  bottom: 0;
  right: 35px;
  gap: 8px;
  row-gap: 16px;

  > span {
    font-size: 1.2rem;
    text-align: right;
    font-weight: 600;
    letter-spacing: 0.5px;
  }

  @media (max-width: 480px) {
    right: 15px;
  }
`;

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
  const [selectedOptionKey, setSelectedOptionKey] = useState<string>(
    Object.keys(model?.options ?? {})[0] ?? "",
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const cartItem = searchParams.get("cartItem")?.split("|");
  const [numberOfItems, setNumberOfItems] = useState(
    Number(cartItem?.[2]) || 1,
  );
  const [size, setSize] = useState(model?.selected_size || "");
  const [addToCardDialogOpen, setAddToCardDialogOpen] = useState(false);
  const [priceBreakdownOpened, setPriceBreakdownOpened] = useState(false);
  const [configurationOpened, setConfigurationOpened] = useState(false);
  const [colorPickerOpened, setColorPickerOpened] = useState(false);
  const navigate = useNavigate();
  const breakpoint = useBreakpoint();

  const selectedOption = selectedOptionKey
    ? (model?.options[selectedOptionKey] ?? null)
    : null;

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

  const handleColorChange = (color: string) => {
    update_color(selectedOption?.code || "", color);
  };

  return (
    <>
      <PageConfiguratorWrap>
        <RotateMessage>
          Please rotate your device to portrait mode
        </RotateMessage>
        <Title>{model?.name}</Title>
        <PageConfigurator className="test">
          {breakpoint != "mobile" && (
            <Options
              options={Object.values(model?.options ?? {})}
              setSelectedOption={(option) =>
                setSelectedOptionKey(option?.type_name)
              }
              selectedOption={selectedOption}
            />
          )}
          {breakpoint == "mobile" && (
            <MobileOptions
              model={model}
              selectedOptionKey={selectedOptionKey}
              setSelectedOptionKey={setSelectedOptionKey}
            />
          )}
          <Model
            model={model}
            price={price}
            numberOfItems={numberOfItems}
            showPriceBreakdown={() => setPriceBreakdownOpened(true)}
            type=""
          />
          {breakpoint == "desktop" && (
            <ConfigureOptions
              selectedOption={
                selectedOption
                  ? (model?.options[selectedOption.type_name] ?? null)
                  : null
              }
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
              selectedColor={
                selectedOption?.value || selectedOption?.default_value || ""
              }
            />
          )}
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
        {breakpoint != "desktop" && (
          <ConfigurationBox onClick={() => setConfigurationOpened(true)}>
            <span>Configuration</span>
            <GrConfigure size={30} />
          </ConfigurationBox>
        )}
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
      <AnimatePresence>
        {priceBreakdownOpened && (
          <PriceBreakdown
            onClose={() => setPriceBreakdownOpened(false)}
            name={model?.name || ""}
            price={price}
            transitionTime={0.5}
            numberOfItems={numberOfItems}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {configurationOpened && (
          <MobileConfigureOptions
            onClose={() => setConfigurationOpened(false)}
            selectedOption={
              selectedOption
                ? (model?.options[selectedOption.type_name] ?? null)
                : null
            }
            update_parts={update_parts}
            model={model}
            price={price}
            numberOfItems={numberOfItems}
            setNumberOfItems={setNumberOfItems}
            setSize={setSize}
            cartItem={cartItem}
            priceBreakdownOpened={priceBreakdownOpened}
            setPriceBreakdownOpened={setPriceBreakdownOpened}
            colorPickerOpened={colorPickerOpened}
            setColorPickerOpened={setColorPickerOpened}
            selectedColor={
              selectedOption?.value || selectedOption?.default_value || ""
            }
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {colorPickerOpened && (
          <ColorPickerModal
            onChange={handleColorChange}
            color={`#${selectedOption?.value || selectedOption?.default_value || ""}`}
            transitionTime={0.3}
            onClose={() => setColorPickerOpened(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
