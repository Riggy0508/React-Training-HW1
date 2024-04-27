import React from 'react';
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import Home from '../screens/Home';
import AddLottery from '../screens/AddLottery';
import { LotteryDetails } from '../screens/LotteryDetails';
import RegisterModal from '../screens/RegisterModal';
import { DrawerNavigationButton } from './DrawerNavigationButton';
import { LotteriesNavigatorParamList } from './types';

const Stack = createNativeStackNavigator<LotteriesNavigatorParamList>();

const options: NativeStackNavigationOptions = {
  title: '',
};

export const LotteriesNavigator = () => {
  const { t } = useTranslation();

  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: t('screen.lotteries.title'),
            headerLeft: DrawerNavigationButton,
          }}
        />
        <Stack.Screen
          name="AddLottery"
          component={AddLottery}
          options={options}
        />
        <Stack.Screen
          name="LotteryDetails"
          component={LotteryDetails}
          options={options}
        />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen
          name="Register"
          component={RegisterModal}
          options={{
            title: t('screen.register.title'),
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};