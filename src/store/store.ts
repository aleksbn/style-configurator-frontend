import { combineReducers, configureStore } from "@reduxjs/toolkit";
import modelsReducer from "./slices/modelSlice";
import configurationReducer from "./slices/configurationSlice";
import { persistStore, persistReducer } from "redux-persist/es";
import storage from "redux-persist/es/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["configuration"], // only persist configuration, not models
};

const rootReducer = combineReducers({
  models: modelsReducer,
  configuration: configurationReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
