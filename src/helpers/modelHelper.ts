import type { IModel, IMultiOptionType, IOption } from "../models/Model";

const redoReduxModel = (allModels: IModel[], selectedSKU: string) => {
  const modelToConfigure: IModel | undefined = structuredClone(
    allModels.find((model: IModel) => model.id === selectedSKU?.split(":")[0]),
  );
  const allOptions: IOption[] = Object.values(
    modelToConfigure?.options || {},
  ).flat();
  const allSkuOptions = selectedSKU?.split(":").slice(1) || [];
  allSkuOptions.forEach((option) => {
    const selectedOption: IOption | undefined = allOptions.find(
      (o) => o.code === option.split("-")[0],
    );
    if (!selectedOption) return;
    const hasMultiOptions = !!selectedOption.multi_option_type;
    if (selectedOption.default_value !== option.split("-")[1]) {
      selectedOption.value = option.split("-")[1];
    } else {
      selectedOption.value = null;
    }
    if (hasMultiOptions) {
      const selectedType = selectedOption.multi_option_type?.find(
        (o) => o.code === option.split("-")[2],
      )?.value;
      if (selectedType !== undefined) {
        selectedOption.selected_type = selectedType;
      }
    }
    modelToConfigure!.options[selectedOption.type_name] = selectedOption;
  });
  return modelToConfigure;
};

const redoModel = (selectedModel: IModel) => {
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

export { redoReduxModel, redoModel };
