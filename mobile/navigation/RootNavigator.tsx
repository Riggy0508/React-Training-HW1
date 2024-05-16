import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { About } from '../screens/About';
import { LotteriesDrawerNavigator } from './LotteriesDrawerNavigator';
import { RootNavigatorParamList } from './types';

const Tab = createBottomTabNavigator<RootNavigatorParamList>();

export const RootNavigator = () => {
  const { t } = useTranslation();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="LotteriesTab"
        component={LotteriesDrawerNavigator}
        options={{
          title: t('screen.lotteries.title'),
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="dice" size={24} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="About"
        component={About}
        options={{
          title: t('screen.about.title'),
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="info" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};