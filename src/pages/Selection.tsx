import React, { useEffect, useState } from "react";
import ProductList from "./Selection/ProductList.js";
import ProductImage from "./Selection/ProductImage.js";
import { useAppDispatch, useAppSelector } from "../store/hooks.js";
import Footer from "../components/ui/Footer.js";
import { Button } from "../components/style/Buttons.style.js";
import { setSelectedModel } from "../store/slices/modelSlice.js";
import { convertModelToSku } from "../helpers/skuHelper.js";
import { useNavigate } from "react-router-dom";
import { PageWrap, RotateMessage } from "../components/style/Common.style.js";
import styled from "styled-components";
import { setConfiguration } from "../store/slices/configurationSlice.js";
import { clearCart } from "../store/slices/cartSlice.js";
import { setCartToBeCleared } from "../store/slices/webSiteSlice.js";
import useBreakpoint from "../hooks/useBreakpoints.js";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import type { IModel } from "../models/Model.js";
import { AnimatePresence, motion } from "framer-motion";
import { SlideLeft, SlideRight } from "../animations/Slide.js";
import { CiBoxList } from "react-icons/ci";
import ModalProductList from "./Selection/ModalProductList.js";

const PageSelectionWrap = styled(PageWrap)`
  display: grid;
  grid-template-columns: 1fr 2fr;
  height: calc(100svh - 140px);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ArrowContainer = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  cursor: pointer;

  &.arrowPrev {
    left: 5px;
  }

  &.arrowNext {
    right: 5px;
  }
`;

const SeeAllContainer = styled.div`
  position: absolute;
  top: 70px;
  left: 15px;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  cursor: pointer;

  & span {
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    & span {
      font-size: 0.8rem;
    }
  }
`;

export default function Selection() {
  const { data: models } = useAppSelector((state) => state.models);
  const allModels = Object.values(models)
    .map((model) => model.options)
    .map((options) => Object.values(options))
    .flat() as IModel[];
  const cartToBeCleared = useAppSelector(
    (state) => state.webSite.cartToBeCleared,
  );
  const [currentModel, setCurrentModel] = useState<IModel | null>(null);
  const [isInitial, setIsInitial] = useState(true);
  const [isSeeAllOpened, setIsSeeAllOpened] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const breakpoint = useBreakpoint();
  console.log(breakpoint);

  useEffect(() => {
    dispatch(setConfiguration(null));
  }, []);

  useEffect(() => {
    if (cartToBeCleared) {
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

  const handleSelectPrevModelClick = () => {
    if (allModels.indexOf(currentModel!) === 0)
      return setCurrentModel(allModels[allModels.length - 1]);
    const prevModel = allModels[allModels.indexOf(currentModel!) - 1];
    setCurrentModel(prevModel);
  };

  const handleSelectNextModelClick = () => {
    if (allModels.indexOf(currentModel!) === allModels.length - 1)
      return setCurrentModel(allModels[0]);
    const nextModel = allModels[allModels.indexOf(currentModel!) + 1];
    setCurrentModel(nextModel);
  };

  return (
    <PageSelectionWrap>
      <RotateMessage>Please rotate your device to portrait mode</RotateMessage>
      {breakpoint != "mobile" && (
        <ProductList
          models={models}
          setCurrentModel={setCurrentModel}
          currentModel={currentModel}
        />
      )}
      <AnimatePresence>
        {isSeeAllOpened && (
          <ModalProductList
            models={models}
            setCurrentModel={setCurrentModel}
            currentModel={currentModel}
            onClose={() => setIsSeeAllOpened(false)}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {breakpoint == "mobile" && (
          <>
            <SeeAllContainer
              className="seeAll"
              as={motion.div}
              variants={SlideRight(0.75, 0, 0.5, 0.5, true)}
              initial={isInitial ? "initial" : ""}
              animate="animate"
              onClick={() => setIsSeeAllOpened(true)}
            >
              <CiBoxList size={24} />
              <span>See all</span>
            </SeeAllContainer>
            <ArrowContainer
              className="arrow arrowPrev"
              as={motion.div}
              variants={SlideRight(1, 0, 0.5, 0.5, true)}
              initial={isInitial ? "initial" : ""}
              animate="animate"
            >
              <IoArrowBackCircleOutline
                size={32}
                onClick={handleSelectPrevModelClick}
              />
            </ArrowContainer>
            <ArrowContainer
              className="arrow arrowNext"
              as={motion.div}
              variants={SlideLeft(1, 0, 0.5, 0.5, true)}
              initial={isInitial ? "initial" : ""}
              animate="animate"
              onAnimationComplete={() => setIsInitial(false)}
            >
              <IoArrowForwardCircleOutline
                size={32}
                className="arrow arrowNext"
                onClick={handleSelectNextModelClick}
              />
            </ArrowContainer>
          </>
        )}
      </AnimatePresence>
      <ProductImage
        currentModel={currentModel}
        swipeLeft={handleSelectPrevModelClick}
        swipeRight={handleSelectNextModelClick}
      />
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
