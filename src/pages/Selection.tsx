import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ProductList from "./Selection/ProductList.js";
import ProductImage from "./Selection/ProductImage.js";
import { useAppDispatch, useAppSelector } from "../store/hooks.js";
import Footer from "../components/ui/Footer.js";
import { Button } from "../components/style/Buttons.style.js";
import { setSelectedModel } from "../store/slices/modelSlice.js";
import { updateLocalStorage } from "../helpers/skuHelper.js";
import { useNavigate } from "react-router-dom";

const Wrap = styled.div`
  width: 100%;
  height: 100vh;
  padding-top: 70px;
  display: grid;
  grid-template-columns: 1fr 2fr;
`;

export default function Selection() {
  const { data: models } = useAppSelector((state) => state.models);
  const dispatch = useAppDispatch();
  const [currentModel, setCurrentModel] = useState(null);
  const navigate = useNavigate();
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    if (Object.values(models).length > 0) {
      setCurrentModel(Object.values(Object.values(models)[0].options)[0]);
    }
  }, [models]);

  const handleComposeClick = () => {
    setIsLeaving(true);
    setTimeout(() => {
      dispatch(setSelectedModel(currentModel));
      updateLocalStorage(currentModel);
      navigate("/compose");
    }, 500);
  };

  return (
    <Wrap>
      <ProductList
        models={models}
        setCurrentModel={setCurrentModel}
        currentModel={currentModel}
      />
      <ProductImage currentModel={currentModel} isLeaving={isLeaving} />
      <Footer>
        <div></div>
        <Button type="primary" onClick={handleComposeClick}>
          Start composing
        </Button>
        <div></div>
      </Footer>
    </Wrap>
  );
}
