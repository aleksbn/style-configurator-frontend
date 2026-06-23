import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ICartItem } from "../../models/Cart";

interface CartItem {
  configKey: string;
  size: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existing = state.items.find(
        (item) =>
          item.configKey === action.payload.configKey &&
          item.size === action.payload.size,
      );
      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    updateCartItem: (
      state,
      action: PayloadAction<{
        oldItem: ICartItem;
        newItem: ICartItem;
      }>,
    ) => {
      state.items = state.items.map((item) => {
        if (
          item.configKey === action.payload.oldItem.configKey &&
          item.size === action.payload.oldItem.size
        ) {
          return action.payload.newItem;
        }
        return item;
      });
      // if there is two items with same configKey and size, merge them by adding quantities
      state.items = state.items.reduce((acc, item) => {
        const existing = acc.find(
          (i) => i.configKey === item.configKey && i.size === item.size,
        );
        if (existing) {
          existing.quantity += item.quantity;
        } else {
          acc.push(item);
        }
        return acc;
      }, [] as CartItem[]);
    },
    removeFromCart: (
      state,
      action: PayloadAction<{ configKey: string; size: string }>,
    ) => {
      state.items = state.items.filter(
        (item) =>
          !(
            item.configKey === action.payload.configKey &&
            item.size === action.payload.size
          ),
      );
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, updateCartItem, removeFromCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
