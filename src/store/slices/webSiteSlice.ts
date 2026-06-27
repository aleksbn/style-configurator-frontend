import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  cartToBeCleared: false,
};

const webSiteClice = createSlice({
  name: "webSite",
  initialState,
  reducers: {
    setCartToBeCleared(state, action: PayloadAction<boolean>) {
      state.cartToBeCleared = action.payload;
    },
  },
});

export const { setCartToBeCleared } = webSiteClice.actions;
export default webSiteClice.reducer;
