interface ICartItem {
  configKey: string;
  size: string;
  quantity: number;
}

interface IPrice {
  Name: string;
  Size: string;
  Quantity: number;
  PricePerItem: number;
  TotalPrice: number;
}

export type { ICartItem, IPrice };
