import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ConfigurationState {
  data: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: ConfigurationState = {
  data: null,
  loading: false,
  error: null,
};

const configurationSlice = createSlice({
  name: "configuration",
  initialState,
  reducers: {
    setConfiguration: (state, action: PayloadAction<string | null>) => {
      state.data = action.payload;
    },
  },
});

export const { setConfiguration } = configurationSlice.actions;
export default configurationSlice.reducer;
