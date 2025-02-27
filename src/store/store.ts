import { combineReducers, configureStore } from "@reduxjs/toolkit";
import todoReducer from "./slices/todoSlice";
import { persistReducer, persistStore } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { PERSIST_KEY } from "../constants/constants";

const storage = createWebStorage("local");

const persistConfig = {
  key: PERSIST_KEY,
  storage,
};

const rootReducer = combineReducers({
  todo: todoReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
