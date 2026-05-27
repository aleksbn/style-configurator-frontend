import type { IModel } from "../models/Model";

const updateLocalStorage = (model: IModel | null) => {
  if (!model) return;
  let configurationSku = "";
  configurationSku += model.id;
  Object.values(model.options).forEach((option) => {
    configurationSku += `:${option.code}-${option.value || option.default_value}`;
  });
  console.log(configurationSku);
  localStorage.setItem("configurationSku", configurationSku);
};

export { updateLocalStorage };
