interface IModel {
  name: string;
  id: string;
  options: {
    [key: string]: {
      multi_option_type: string | null;
      selected_type: string;
      code: string;
      name: string;
      value: string | null;
      default_value: string;
      price: number;
    };
  };
  sketch: string;
  base_price: number;
}

export type { IModel };
