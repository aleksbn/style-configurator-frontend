import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

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
    updateQuantity: (
      state,
      action: PayloadAction<{
        configKey: string;
        size: string;
        quantity: number;
      }>,
    ) => {
      const item = state.items.find(
        (item) =>
          item.configKey === action.payload.configKey &&
          item.size === action.payload.size,
      );
      if (item) item.quantity = action.payload.quantity;
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
  },
});

export const { addToCart, updateQuantity, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
