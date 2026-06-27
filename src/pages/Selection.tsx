import React, { useEffect, useState } from "react";
import ProductList from "./Selection/ProductList.js";
import ProductImage from "./Selection/ProductImage.js";
import { useAppDispatch, useAppSelector } from "../store/hooks.js";
import Footer from "../components/ui/Footer.js";
import { Button } from "../components/style/Buttons.style.js";
import { setSelectedModel } from "../store/slices/modelSlice.js";
import { convertModelToSku } from "../helpers/skuHelper.js";
import { useNavigate } from "react-router-dom";
import { PageWrap } from "../components/style/Common.style.js";
import styled from "styled-components";
import { setConfiguration } from "../store/slices/configurationSlice.js";
import { clearCart } from "../store/slices/cartSlice.js";
import { setCartToBeCleared } from "../store/slices/webSiteSlice.js";

const PageSelectionWrap = styled(PageWrap)`
  display: grid;
  grid-template-columns: 1fr 2fr;
  height: calc(100svh - 140px);
`;

export default function Selection() {
  const { data: models } = useAppSelector((state) => state.models);
  const cartToBeCleared = useAppSelector(
    (state) => state.webSite.cartToBeCleared,
  );
  const dispatch = useAppDispatch();
  const [currentModel, setCurrentModel] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setConfiguration(null));
  }, []);

  useEffect(() => {
    if (cartToBeCleared) {
      console.log("clearing cart");
      dispatch(clearCart());
      dispatch(setCartToBeCleared(false));
    }
  }, []);

  useEffect(() => {
    if (Object.values(models).length > 0) {
      setCurrentModel(Object.values(Object.values(models)[0].options)[0]);
    }
  }, [models]);

  const handleComposeClick = () => {
    dispatch(setSelectedModel(currentModel));
    dispatch(setConfiguration(convertModelToSku(currentModel)));
    navigate("/compose");
  };

  return (
    <PageSelectionWrap>
      <ProductList
        models={models}
        setCurrentModel={setCurrentModel}
        currentModel={currentModel}
      />
      <ProductImage currentModel={currentModel} />
      <Footer>
        <div></div>
        <Button type="primary" onClick={handleComposeClick}>
          Start composing
        </Button>
        <div></div>
      </Footer>
    </PageSelectionWrap>
  );
}
