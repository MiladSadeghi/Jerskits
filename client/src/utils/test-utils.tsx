import React, { PropsWithChildren } from 'react'
import { render } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'
import { Provider } from 'react-redux'
import { setupStore, type AppStore, type RootState } from '../App/store'
import { PreloadedStateShapeFromReducersMapObject } from '@reduxjs/toolkit'

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedStateShapeFromReducersMapObject<RootState>
  store?: AppStore
}

export function renderWithProviders(
  ui: React.ReactElement,
  { store = setupStore(), ...renderOptions }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren): JSX.Element {
    return <Provider store={store}>{children}</Provider>
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}
