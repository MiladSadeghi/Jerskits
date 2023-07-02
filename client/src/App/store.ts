import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./feature/auth/authSlice";

export const store = configureStore({
  reducer: {
    authSlice,
  },
  devTools: import.meta.env.VITE_NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
