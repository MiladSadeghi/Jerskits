import React, { PropsWithChildren } from "react";
import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import type { PreloadedState } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import type { AppStore, RootState } from "../App/store";
import authSlice from "../App/feature/auth/authSlice";
import { authSliceApi } from "../App/feature/auth/authSliceApi";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {
      auth: {
        accessToken: null,
      },
    },
    store = configureStore({
      reducer: {
        auth: authSlice,
        [authSliceApi.reducerPath]: authSliceApi.reducer,
      },
      preloadedState,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authSliceApi.middleware),
    }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
