/* eslint-disable jest/expect-expect */
import { measurePerformance } from 'reassure';
import React from 'react';
import { RenderResult } from '@testing-library/react-native';
import { LotteryDetails } from '../LotteryDetails';
import { AppTestingWrapper } from '../../testing';
import { Lottery } from '../../types';

jest.mock('@react-navigation/native', () => {
  const ReactNavigationNative = jest.requireActual('@react-navigation/native');

  return {
    ...ReactNavigationNative,
    useRoute: jest.fn(() => ({
      params: {
        id: '123',
      },
    })),
  };
});

const mockedLottery: Lottery = {
  id: '123',
  name: 'Sample Lottery',
  prize: '$100',
  status: 'running',
  type: 'instant',
};

jest.mock('../../services/lottery', () => ({
  ...jest.requireActual('../../services/lottery'),
  getLotteryById: jest.fn(() => mockedLottery),
}));

test('LotteryDetails Performance Test', async () => {
  const scenario = async (screen: RenderResult) => {
    await screen.findByText('Sample Lottery');
    await screen.findByText('ID: 123');
    await screen.findByText('Price: $100');
    await screen.findByText('Status: running');
    await screen.findByText('Type: instant');
  };

  await measurePerformance(
    <AppTestingWrapper>
      <LotteryDetails />
    </AppTestingWrapper>,
    { scenario },
  );
});