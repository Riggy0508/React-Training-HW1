import React from 'react';
import { render } from '@testing-library/react-native';
import { useRoute } from '@react-navigation/native';
import { useLotteryDetails } from '../../hooks/useLotteryDetails';
import { LotteryDetails } from '../../screens/LotteryDetails';

jest.mock('@react-navigation/native', () => ({
  useRoute: jest.fn(),
}));

jest.mock('../../hooks/useLotteryDetails', () => ({
  useLotteryDetails: jest.fn(),
}));

describe('LotteryDetails Component Integration Tests', () => {
  it('renders lottery details', () => {
    const mockRoute = {
      params: {
        id: '123',
      },
    };
    (useRoute as jest.Mock).mockReturnValue(mockRoute);

    const mockLotteryDetails = {
      id: '123',
      name: 'Sample Lottery',
      prize: '$100',
      status: 'Active',
      type: 'Instant',
    };
    (useLotteryDetails as jest.Mock).mockReturnValue({
      data: mockLotteryDetails,
      loading: false,
    });

    const { getByText } = render(<LotteryDetails />);

    expect(getByText('Sample Lottery')).toBeTruthy();
    expect(getByText('ID: 123')).toBeTruthy();
    expect(getByText('Price: $100')).toBeTruthy();
    expect(getByText('Status: Active')).toBeTruthy();
    expect(getByText('Type: Instant')).toBeTruthy();
  });
});