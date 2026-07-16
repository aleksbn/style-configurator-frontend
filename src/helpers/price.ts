import type { IPriceBreakdown } from "../models/Model";

function getTotalPrice(price: IPriceBreakdown, quantity: number): number {
  return price["Total price"] * quantity;
}

export { getTotalPrice };
