import React, { useEffect, useState } from "react";
import Configurator from "./Configurator";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setSelectedModel } from "../store/slices/modelSlice";
import { setConfiguration } from "../store/slices/configurationSlice";
import type { IMultiOptionType, IOption } from "../models/Model";
import Api from "../Api/ApiHelper";
import LoadingSpinner from "../components/ui/LoadingSpinner";

export default function MainCompose() {
  const dispatch = useAppDispatch();
  const allModels = Object.values(useAppSelector((state) => state.models.data))
    .map((model) => model.options)
    .map((options) => Object.values(options))
    .flat();
  const selectedSKU = useAppSelector((state) => state.configuration.data);
  const selectedModel = useAppSelector((state) => state.models.selectedModel);
  const [price, setPrice] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPrice = async () => {
      if (selectedSKU === null) return;
      const priceObject = await Api.getSinglePrice(selectedSKU!);
      setPrice(priceObject);
      setIsLoading(false);
    };

    fetchPrice();
  }, [selectedSKU]);

  const redoReduxModel = () => {
    const modelToConfigure = structuredClone(
      allModels.find((model) => model.id === selectedSKU?.split(":")[0]),
    );
    const allOptions = Object.values(modelToConfigure?.options || {}).flat();
    const allSkuOptions = selectedSKU?.split(":").slice(1) || [];
    allSkuOptions.forEach((option) => {
      let selectedOption = allOptions.find(
        (o) => o.code === option.split("-")[0],
      );
      const hasMultiOptions = !!selectedOption?.multi_option_type;
      if (selectedOption.default_value !== option.split("-")[1]) {
        selectedOption.value = option.split("-")[1];
      } else {
        selectedOption.value = null;
      }
      if (hasMultiOptions) {
        selectedOption.selected_type = selectedOption.multi_option_type?.find(
          (o) => o.code === option.split("-")[2],
        ).value;
      }
      if (selectedOption) {
        modelToConfigure!.options[selectedOption.type_name] = selectedOption;
      }
    });
    dispatch(setSelectedModel(modelToConfigure));
  };

  const redoModel = () => {
    if (selectedModel) {
      const allIds = Object.keys(selectedModel.options);
      allIds.forEach((id) => {
        const option = selectedModel.options[id];
        const optionElements = document.getElementsByClassName(id);
        if (!option.multi_option_type) {
          [...optionElements].forEach((optionElement) => {
            (optionElement as SVGElement).setAttribute(
              "fill",
              `#${option.value || option.default_value}`,
            );
          });
        } else {
          [...optionElements].forEach((optionElement) => {
            if (optionElement.getAttribute("fill")) {
              (optionElement as SVGElement).setAttribute(
                "fill",
                `#${option.value || option.default_value}`,
              );
            } else {
              (optionElement as SVGElement).setAttribute(
                "stroke",
                `#${option.value || option.default_value}`,
              );
            }
          });
          const allTypes = option.multi_option_type;
          allTypes.forEach((type: IMultiOptionType) => {
            const typeValue = type.value;
            if (!typeValue) return;
            type.part_ids.forEach((partId) => {
              const element = document.getElementById(partId);
              if (typeValue === option.selected_type) {
                element?.setAttribute("visibility", "visible");
              } else {
                element?.setAttribute("visibility", "hidden");
              }
            });
          });
        }
      });
    }
  };

  useEffect(() => {
    if (!selectedModel && selectedSKU && allModels.length > 0) {
      redoReduxModel();
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      redoModel();
    }, 100);
  }, [selectedModel]);

  useEffect(() => {
    // UPDATE REDUX MODEL
    if (selectedSKU && allModels.length > 0) {
      redoReduxModel();
    }
  }, [selectedSKU]);

  useEffect(() => {
    // UPDATE REAL MODEL
    redoModel();
  }, [selectedModel]);

  const update_color = (partid: string, color: string) => {
    const newSku = selectedSKU
      ?.split(":")
      .map((part) => {
        if (part.split("-")[0] === partid) {
          return `${part.split("-")[0]}-${color.slice(1)}${part.split("-")[2] ? `-${part.split("-")[2]}` : ""}`;
        }
        return part;
      })
      .join(":");
    dispatch(setConfiguration(newSku));
  };

  const update_parts = (partid: string, partvalue: string) => {
    const newSku = selectedSKU
      ?.split(":")
      .map((part) => {
        if (part.split("-")[0] === partid) {
          return `${part.split("-")[0]}-${part.split("-")[1]}-${partvalue}`;
        }
        return part;
      })
      .join(":");
    dispatch(setConfiguration(newSku));
  };

  const getComponentProps = () => {
    return { model: selectedModel, update_color, update_parts, price };
  };

  const getComponent = () => {
    const Component = Configurator;
    return <Component {...getComponentProps()} />;
  };

  if (!selectedModel) return null;
  if (isLoading) return <LoadingSpinner />;
  return <>{getComponent()}</>;
}
