import type { IModel } from "../models/Model";

const convertModelToSku = (model: IModel | null): string => {
  if (!model) return "";
  let configurationSku = "";
  configurationSku += model.id;
  Object.values(model.options).forEach((option) => {
    const selectedMultiOption = option.multi_option_type?.find(
      (o) => o.value === option.selected_type,
    );
    const multi_option_type = selectedMultiOption
      ? `-${selectedMultiOption.code}`
      : "";
    configurationSku += `:${option.code}-${option.value || option.default_value}${multi_option_type}`;
  });
  return configurationSku;
};

export { convertModelToSku };
