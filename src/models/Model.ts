interface IModel {
  name: string;
  id: string;
  options: Record<string, IOption>;
  url: string;
  sketch: string;
  base_price: number;
  sizes: string[];
  selected_size: string;
}

interface IModelWithPrice extends IModel {
  price: number;
}

interface IMultiOptionType {
  code: string;
  name: string;
  value: string;
  part_ids: string[];
  price: number;
}

interface IOption {
  multi_option_type: IMultiOptionType[] | null;
  type_name: string;
  selected_type: string;
  code: string;
  name: string;
  value: string | null;
  default_value: string;
  price: number;
}

/** A named group of model variants as returned by GET /models, e.g. { "T-Shirt": { name, options: { id1: IModel, ... } } } */
interface IModelGroup {
  name: string;
  options: Record<string, IModel>;
}

type IModelsData = Record<string, IModelGroup>;

/** Per-part price breakdown keyed by option code, plus a "Total price" total. */
type IPriceBreakdown = Record<string, number>;

export type {
  IModel,
  IModelWithPrice,
  IOption,
  IMultiOptionType,
  IModelGroup,
  IModelsData,
  IPriceBreakdown,
};
