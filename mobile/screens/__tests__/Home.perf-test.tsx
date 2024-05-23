/* eslint-disable jest/expect-expect */
import { measurePerformance } from 'reassure';
import React from 'react';
import { RenderResult } from '@testing-library/react-native';
import { AppTestingWrapper } from '../../testing';
import Home from '../Home';
import { Lottery } from '../../types';

const mockLotteries: Lottery[] = [
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
];

jest.mock('../../services/lottery', () => ({
  ...jest.requireActual('../../services/lottery'),
  getLottieries: jest.fn(() => mockLotteries),
}));

jest.mock('../../native', () => ({
  CustomButton: () => 'CustomButton',
}));

test('Home Performance Test', async () => {
  const scenario = async (screen: RenderResult) => {
    await screen.findByText(mockLotteries[0].name);
    await screen.findByText(mockLotteries[1].name);
    await screen.findByText(mockLotteries[2].name);
  };

  await measurePerformance(
    <AppTestingWrapper>
      <Home />
    </AppTestingWrapper>,
    { scenario },
  );
});