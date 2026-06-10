import type { IOption } from "../models/Model";

const calculateOneItemPrice = (option: IOption) => {
  let price = 0;
  price +=
    !option.value || option.value == option.default_value ? 0 : option.price;
  price += option.multi_option_type
    ? option.multi_option_type.find((o) => o.value === option.selected_type)
        ?.price || 0
    : 0;
  return price;
};

export default calculateOneItemPrice;
