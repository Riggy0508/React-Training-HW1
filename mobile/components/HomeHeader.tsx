import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { colors } from '../colors';
import {
  LotteryListSortingOptions,
  useLotteriesSortingContext,
} from '../context/lotteries-sorting-context';
import { LotteriesNavigatorNavigationProp } from '../navigation/types';
import { CustomButton } from '../native';

const LotteriesSortingButton = () => {
  const { selectedSorting, switchSorting } = useLotteriesSortingContext();

  const iconName =
    selectedSorting === LotteryListSortingOptions.Ascending
      ? 'arrowup'
      : 'arrowdown';

  return (
    <TouchableOpacity
      accessibilityRole="button"
      style={styles.sortingButton}
      onPress={switchSorting}
    >
      <Text style={styles.sortingButtonText}>Prices</Text>
      <AntDesign name={iconName} size={16} color="black" />
    </TouchableOpacity>
  );
};

interface HomeHeaderProps {
  selectedLotteries: string[];
}

export const HomeHeader = ({ selectedLotteries }: HomeHeaderProps) => {
  const navigation = useNavigation<LotteriesNavigatorNavigationProp<'Home'>>();

  return (
    <>
      <LotteriesSortingButton />
      <CustomButton
        onPress={() => navigation.navigate('Register', { selectedLotteries })}
        style={styles.button}
        disabled={selectedLotteries.length === 0}
        title="Register"
      />
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    width: 100,
    height: 40,
    right: 16,
    top: 8,
    borderRadius: 4,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 4,
  },
  sortingButton: {
    position: 'absolute',
    left: 16,
    top: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  sortingButtonText: {
    fontWeight: 'bold',
    fontSize: 14,
    marginRight: 3,
  },
});
