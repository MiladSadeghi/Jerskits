import { combineReducers, configureStore } from "@reduxjs/toolkit";
import type { PreloadedState } from "@reduxjs/toolkit";
import authSlice from "./feature/auth/authSlice";
import { authSliceApi } from "./feature/auth/authSliceApi";
import profileSlice from "./feature/profile/profileSlice";
import { profileSliceApi } from "./feature/profile/profileSliceApi";
import { locationSliceApi } from "./feature/location/locationSliceApi.ts";

const rootReducer = combineReducers({
  auth: authSlice,
  profile: profileSlice,
  [authSliceApi.reducerPath]: authSliceApi.reducer,
  [profileSliceApi.reducerPath]: profileSliceApi.reducer,
  [locationSliceApi.reducerPath]: locationSliceApi.reducer
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        authSliceApi.middleware,
        profileSliceApi.middleware,
        locationSliceApi.middleware
      ),
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
