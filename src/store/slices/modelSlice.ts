import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import Api from "../../Api/ApiHelper";
import type { IModel, IModelsData } from "../../models/Model";

export const fetchModels = createAsyncThunk(
  "models/fetchModels",
  async (_: void, { rejectWithValue }) => {
    try {
      return await Api.getAllModelsContent();
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  },
);

interface ModelState {
  data: IModelsData;
  selectedModel: IModel | null;
  loading: boolean;
  error: string | null;
}

const initialState: ModelState = {
  data: {},
  selectedModel: null,
  loading: false,
  error: null,
};

const modelSlice = createSlice({
  name: "models",
  initialState,
  reducers: {
    setSelectedModel: (state, action: PayloadAction<IModel | null>) => {
      state.selectedModel = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchModels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchModels.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchModels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSelectedModel } = modelSlice.actions;
export default modelSlice.reducer;
