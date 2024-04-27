import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';

import { LotteriesSettings } from '../screens/LotteriesSettings';
import { DrawerNavigationButton } from './DrawerNavigationButton';
import { LotteriesSettingsNavigatorParamList } from './types';

const Stack = createNativeStackNavigator<LotteriesSettingsNavigatorParamList>();

export const LotteriesSettingsNavigator = () => {
  const { t } = useTranslation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LotteriesSettings"
        component={LotteriesSettings}
        options={{
          headerLeft: DrawerNavigationButton,
          title: t('screen.settings.title'),
        }}
      />
    </Stack.Navigator>
  );
};