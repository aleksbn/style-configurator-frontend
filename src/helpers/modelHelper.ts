import type { IModel, IMultiOptionType, IOption } from "../models/Model";
import { parseConfigKey } from "./configKey";

const redoReduxModel = (allModels: IModel[], selectedSKU: string) => {
  const { modelId, parts } = parseConfigKey(selectedSKU);
  const modelToConfigure: IModel | undefined = structuredClone(
    allModels.find((model: IModel) => model.id === modelId),
  );
  const allOptions: IOption[] = Object.values(
    modelToConfigure?.options ?? {},
  ).flat();
  parts.forEach((part) => {
    const selectedOption: IOption | undefined = allOptions.find(
      (o) => o.code === part.code,
    );
    if (!selectedOption) return;
    const hasMultiOptions = !!selectedOption.multi_option_type;
    if (selectedOption.default_value !== part.value) {
      selectedOption.value = part.value;
    } else {
      selectedOption.value = null;
    }
    if (hasMultiOptions) {
      const selectedType = selectedOption.multi_option_type?.find(
        (o) => o.code === part.typeCode,
      )?.value;
      if (selectedType !== undefined) {
        selectedOption.selected_type = selectedType;
      }
    }
    modelToConfigure!.options[selectedOption.type_name] = selectedOption;
  });
  return modelToConfigure;
};

const redoModel = (selectedModel: IModel | null) => {
  if (selectedModel) {
    const allIds = Object.keys(selectedModel.options);
    allIds.forEach((id) => {
      const option = selectedModel.options[id];
      const optionElements = document.getElementsByClassName(id);
      if (!option.multi_option_type) {
        [...optionElements].forEach((optionElement) => {
          (optionElement as SVGElement).setAttribute(
            "fill",
            `#${option.value ?? option.default_value}`,
          );
        });
      } else {
        [...optionElements].forEach((optionElement) => {
          if (optionElement.getAttribute("fill")) {
            (optionElement as SVGElement).setAttribute(
              "fill",
              `#${option.value ?? option.default_value}`,
            );
          } else {
            (optionElement as SVGElement).setAttribute(
              "stroke",
              `#${option.value ?? option.default_value}`,
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

export { redoReduxModel, redoModel };
