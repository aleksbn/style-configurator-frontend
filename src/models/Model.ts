interface IModel {
  name: string;
  id: string;
  options: {
    [key: string]: IOption;
  };
  url: string;
  sketch: string;
  base_price: number;
  sizes: [string];
  selected_size: string;
}

interface IModelWithPrice extends IModel {
  price: number;
}

interface IMultiOptionType {
  code: string;
  name: string;
  value: string;
  part_ids: [string];
  price: number;
}

interface IOption {
  multi_option_type: [IMultiOptionType] | null;
  type_name: string;
  selected_type: string;
  code: string;
  name: string;
  value: string | null;
  default_value: string;
  price: number;
}

export type { IModel, IModelWithPrice, IOption, IMultiOptionType };
