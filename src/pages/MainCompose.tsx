import { useEffect, useLayoutEffect, useState } from "react";
import Configurator from "./Configurator";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setSelectedModel } from "../store/slices/modelSlice";
import { setConfiguration } from "../store/slices/configurationSlice";
import Api from "../Api/ApiHelper";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { addToCart, updateCartItem } from "../store/slices/cartSlice";
import type { ICartItem } from "../models/Cart";
import { redoModel, redoReduxModel } from "../helpers/modelHelper";
import { parseConfigKey, stringifyConfigKey } from "../helpers/configKey";

export default function MainCompose() {
  const dispatch = useAppDispatch();
  const allModels = Object.values(useAppSelector((state) => state.models.data))
    .map((model) => model.options)
    .map((options) => Object.values(options))
    .flat();
  const selectedSKU = useAppSelector((state) => state.configuration.data);
  const selectedModel = useAppSelector((state) => state.models.selectedModel);
  const [price, setPrice] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [justLoaded, setJustLoaded] = useState(true);

  useEffect(() => {
    const fetchPrice = async () => {
      if (selectedSKU === null) return;
      const priceObject = await Api.getSinglePrice(selectedSKU);
      setPrice(priceObject);
      setIsLoading(false);
    };

    void fetchPrice();
  }, [selectedSKU]);

  // FOR JUST LOADED
  useEffect(() => {
    setTimeout(() => {
      setJustLoaded(false);
    }, 1100);
  }, []);

  // UPDATE VISUAL MODEL
  useLayoutEffect(() => {
    setTimeout(
      () => {
        redoModel(selectedModel);
      },
      justLoaded ? 1000 : 200,
    );
  }, [selectedModel]);

  // UPDATE REDUX MODEL
  useEffect(() => {
    if (selectedSKU && allModels.length > 0) {
      const modelToConfigure = redoReduxModel(allModels, selectedSKU);
      dispatch(setSelectedModel(modelToConfigure ?? null));
    }
  }, [selectedSKU]);

  const update_color = (partid: string, color: string) => {
    if (selectedSKU === null) {
      dispatch(setConfiguration(null));
      return;
    }
    const parsed = parseConfigKey(selectedSKU);
    parsed.parts = parsed.parts.map((part) =>
      part.code === partid ? { ...part, value: color.slice(1) } : part,
    );
    dispatch(setConfiguration(stringifyConfigKey(parsed)));
  };

  const update_parts = (partid: string, partvalue: string) => {
    if (selectedSKU === null) {
      dispatch(setConfiguration(null));
      return;
    }
    const parsed = parseConfigKey(selectedSKU);
    parsed.parts = parsed.parts.map((part) =>
      part.code === partid ? { ...part, typeCode: partvalue } : part,
    );
    dispatch(setConfiguration(stringifyConfigKey(parsed)));
  };

  const add_to_cart = (numberOfItems: number, size: string) => {
    const cartItem: ICartItem = {
      configKey: selectedSKU!,
      size,
      quantity: numberOfItems,
    };
    dispatch(addToCart(cartItem));
  };

  const update_cart = (oldItem: ICartItem, newItem: ICartItem) => {
    dispatch(updateCartItem({ oldItem, newItem }));
  };

  const getComponentProps = () => {
    return {
      model: selectedModel,
      update_color,
      update_parts,
      add_to_cart,
      update_cart,
      price,
      selectedSKU,
    };
  };

  const getComponent = () => {
    const Component = Configurator;
    return <Component {...getComponentProps()} />;
  };

  if (!selectedModel) return null;
  if (isLoading) return <LoadingSpinner />;
  return <>{getComponent()}</>;
}
