import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import FAB from '../components/Fab';
import Loader from '../components/Loader';
import { colors } from '../colors';
import LotteryList from '../components/LotteryList';
import useAsyncStorage from '../hooks/useAsyncStorage';
import { HomeHeader } from '../components/HomeHeader';
import { LotteriesSortingContextProvider } from '../context/lotteries-sorting-context';
import { RootState } from '../store/reducers';
import { getLotteries } from '../store/reducers/lotteryReducer';
import { LotteriesNavigatorNavigationProp } from '../navigation/types';

const EMPTY_SELECTED_LOTTERIES: string[] = [];

const Home = () => {
  const [selectedLotteries, setSelectedLotteries] = useState<Array<string>>(EMPTY_SELECTED_LOTTERIES,);
  const navigation =
    useNavigation<LotteriesNavigatorNavigationProp<'AddLottery'>>();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const { storedData: registeredLotteries } = useAsyncStorage();

  const lotteries = useSelector((state: RootState) => state.lotteries);

  useEffect(() => {
    if (isFocused) {
      dispatch(getLotteries());
      setSelectedLotteries(EMPTY_SELECTED_LOTTERIES);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  if (lotteries.loading) {
    return <Loader />;
  }

  const handleSelect = (lotteryId: string) => {
    setSelectedLotteries((lotteries) => {
      if (lotteries.includes(lotteryId)) {
        const index = lotteries.indexOf(lotteryId);
        return [...lotteries.slice(0, index), ...lotteries.slice(index + 1)];
      } else {
        return [...lotteries, lotteryId];
      }
    });
  };

  return (
    <LotteriesSortingContextProvider>
      <View style={styles.container}>
        <HomeHeader selectedLotteries={selectedLotteries} />
        <LotteryList
          lotteries={lotteries.data}
          loading={lotteries.loading}
          onPress={handleSelect}
          selectedLotteries={selectedLotteries}
          registeredLotteries={registeredLotteries || []}
        />
        {lotteries.isAddingNewLotteriesEnabled ? (
          <FAB
          onPress={() => navigation.navigate('AddLottery')}
          testID="add_lottery_FAB"
          accessibilityLabel="Add lottery"
          accessibilityHint="Pressing this button will add a new lottery"
        />
        ) : null}
      </View>
    </LotteriesSortingContextProvider>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    paddingTop: 50,
  },
});
