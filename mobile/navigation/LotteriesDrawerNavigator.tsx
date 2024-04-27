import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useTranslation } from 'react-i18next';
import { LotteriesNavigator } from './LotteriesNavigator';
import { LotteriesSettingsNavigator } from './LotteriesSettingsNavigator';
import { LotteriesDrawerNavigatorParamList } from './types';

const Drawer = createDrawerNavigator<LotteriesDrawerNavigatorParamList>();

export const LotteriesDrawerNavigator = () => {
  const { t } = useTranslation();

  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen
        name="LotteriesStack"
        component={LotteriesNavigator}
        options={{ title: t('screen.lotteries.title') }}
      />
      <Drawer.Screen
        name="LotteriesSettingsStack"
        component={LotteriesSettingsNavigator}
        options={{ title: t('screen.settings.title') }}
      />
    </Drawer.Navigator>
  );
};