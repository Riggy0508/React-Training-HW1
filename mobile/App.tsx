import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ToastProvider } from 'react-native-toast-notifications';
import { Provider } from 'react-redux';
import * as ExpoLinking from 'expo-linking';
import store from './store';
import { RootNavigator } from './navigation/RootNavigator';

const prefix = ExpoLinking.createURL('/');

const linking = {
  prefixes: [prefix],
  config: {
    // TAB
    initialRouteName: 'LotteriesTab',
    screens: {
      LotteriesTab: {
        // DRAWER
        initialRouteName: 'LotteriesStack',
        screens: {
          // STACK
          LotteriesStack: {
            initialRouteName: 'Home',
            screens: {
              LotteryDetails: 'lottery-details/:id',
            },
          },
        },
      },
    },
  },
};

export default function App() {
  return (
    <Provider store={store}>
      <ToastProvider>
        <NavigationContainer linking={linking}>
          <RootNavigator />
        </NavigationContainer>
      </ToastProvider>
    </Provider>
  );
}
