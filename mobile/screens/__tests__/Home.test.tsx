import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react-native';
import Home from '../Home';
import { renderWithProviders } from '../../testing';
import { Lottery } from '../../types';

const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  const ReactNavigationNative = jest.requireActual('@react-navigation/native');

  return {
    ...ReactNavigationNative,
    useNavigation: () => ({
      navigate: mockNavigate,
    }),
    useIsFocused: jest.fn(() => true),
  };
});

jest.mock('../../native', () => ({
  CustomButton: () => 'CustomButton',
}));

jest.mock('../../services/lottery', () => ({
  ...jest.requireActual('../../services/lottery'),
  getLottieries: jest.fn(
    () =>
      [
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
          prize: '2000',
          type: 'Type B',
          status: 'running',
        },
        {
          id: '3',
          name: 'Lottery 3',
          prize: '3000',
          type: 'Type C',
          status: 'running',
        },
      ] as Lottery[],
  ),
}));

jest.mock('../../hooks/useAsyncStorage', () =>
  jest.fn(() => ({
    storedData: [],
    storeData: jest.fn(),
    getStoredData: jest.fn(),
  })),
);

describe('Home', () => {
  it('renders the list of lotteries', async () => {
    const { getByTestId } = renderWithProviders(<Home />);

    await waitFor(() => {
      expect(getByTestId('home')).toBeTruthy();
    });
  });

  it('renders lottery list', async () => {
    const { getByText, getAllByTestId } = renderWithProviders(<Home />);

    const lotteryItem = getAllByTestId('lottery-item');

    await waitFor(() => {
      expect(lotteryItem[0].props.children).toHaveLength(2);
    });

    expect(getByText('Lottery 1')).toBeTruthy();
    expect(getByText('Lottery 2')).toBeTruthy();
    expect(getByText('Lottery 3')).toBeTruthy();
  });

  it('navigates to "AddLottery" screen on FAB press', async () => {
    const { getByTestId } = renderWithProviders(<Home />);
    const fabButton = getByTestId('add_lottery_FAB');

    await waitFor(() => {
      expect(fabButton).toBeTruthy();
    });

    fireEvent.press(fabButton);
    expect(mockNavigate).toHaveBeenCalledWith('AddLottery');
  });
});