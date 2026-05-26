import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../Api/ApiHelper";

export const fetchModels = createAsyncThunk(
  "models/fetchModels",
  async (_, { rejectWithValue }) => {
    try {
      const response = await Api.get("/models");
      return response;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  },
);

interface ModelState {
  models: any[];
  loading: boolean;
  error: string | null;
}

const initialState: ModelState = {
  models: [],
  loading: false,
  error: null,
};

const modelSlice = createSlice({
  name: "models",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchModels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchModels.fulfilled, (state, action) => {
        state.loading = false;
        state.models = action.payload;
      })
      .addCase(fetchModels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default modelSlice.reducer;
