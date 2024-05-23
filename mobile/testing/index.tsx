/* eslint-disable import/no-extraneous-dependencies */
import React, { PropsWithChildren } from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react-native';
import type { RenderOptions } from '@testing-library/react-native';
import type { PreloadedState } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { Lottery } from '../types';
import lotteriesSlice from '../store/reducers/lotteryReducer';
import { RootState } from '../store/reducers';
import { ThemeProvider } from '../context/theming-context';

const mockLotteries = [
  {
    id: '1',
    name: 'Lottery 1',
    prize: '1000',
    type: 'Type A',
    status: 'running',
  },
  {
    id: '2',
    name: 'Lottery 2',
    prize: '500',
    type: 'Type B',
    status: 'finished',
  },
  {
    id: '3',
    name: 'Lottery 3',
    prize: '200',
    type: 'Type C',
    status: 'running',
  },
] as Lottery[];

const initialLotteriesState: RootState['lotteries'] = {
  data: mockLotteries,
  loading: false,
  error: null,
  isAddingNewLotteriesEnabled: true,
};

const createMockStore = (preloadedState?: PreloadedState<RootState>) => {
  const store = configureStore({
    reducer: {
      lotteries: lotteriesSlice.reducer,
    },
    preloadedState: {
      ...preloadedState,
      lotteries: {
        ...initialLotteriesState,
        ...preloadedState?.lotteries,
      },
    },
  });

  return store;
};

type AppStore = ReturnType<typeof createMockStore>;

// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = createMockStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {},
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return (
      <ThemeProvider>
        <Provider store={store}>
          <NavigationContainer>{children}</NavigationContainer>
        </Provider>
      </ThemeProvider>
    );
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

export function AppTestingWrapper({
  children,
  preloadedState = {},
  store = createMockStore(preloadedState),
}: PropsWithChildren<ExtendedRenderOptions>): JSX.Element {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <NavigationContainer>{children}</NavigationContainer>
      </Provider>
    </ThemeProvider>
  );
}