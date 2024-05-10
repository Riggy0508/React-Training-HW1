import {
  BottomTabNavigationProp,
  BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';
import {
  DrawerNavigationProp,
  DrawerScreenProps,
} from '@react-navigation/drawer';
import { NavigatorScreenParams, RouteProp } from '@react-navigation/native';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';

/* ----- ROOT NAVIGATOR ----- */

export type RootNavigatorParamList = {
  LotteriesTab: NavigatorScreenParams<LotteriesDrawerNavigatorParamList>;
  About: undefined;
};

type RootNavigatorScreensNames = keyof RootNavigatorParamList;

export type RootNavigatorScreenProps<T extends RootNavigatorScreensNames> =
  BottomTabScreenProps<RootNavigatorParamList, T>;
export type RootNavigatorNavigationProp<T extends RootNavigatorScreensNames> =
  BottomTabNavigationProp<RootNavigatorParamList, T>;
export type RootNavigatorRouteProp<T extends RootNavigatorScreensNames> =
  RouteProp<RootNavigatorParamList, T>;

/* ----- LOTTERIES NAVIGATOR ----- */

export type LotteriesNavigatorParamList = {
  Home: undefined;
  AddLottery: undefined;
  Register: { selectedLotteries: string[] };
  LotteryDetails: { id: string };
};

type LotteriesNavigatorScreensNames = keyof LotteriesNavigatorParamList;

export type LotteriesNavigatorScreenProps<
  T extends LotteriesNavigatorScreensNames,
> = StackScreenProps<LotteriesNavigatorParamList, T>;
export type LotteriesNavigatorNavigationProp<
  T extends LotteriesNavigatorScreensNames,
> = StackNavigationProp<LotteriesNavigatorParamList, T>;
export type LotteriesNavigatorRouteProp<
  T extends LotteriesNavigatorScreensNames,
> = RouteProp<LotteriesNavigatorParamList, T>;

/* ----- LOTTERIES DRAWER NAVIGATOR ----- */

export type LotteriesDrawerNavigatorParamList = {
  LotteriesStack: NavigatorScreenParams<LotteriesNavigatorParamList>;
  LotteriesSettingsStack: NavigatorScreenParams<LotteriesSettingsNavigatorParamList>;
};

type LotteriesDrawerNavigatorScreensNames =
  keyof LotteriesDrawerNavigatorParamList;

export type LotteriesDrawerNavigatorScreenProps<
  T extends LotteriesDrawerNavigatorScreensNames,
> = DrawerScreenProps<LotteriesDrawerNavigatorParamList, T>;
export type LotteriesDrawerNavigatorNavigationProp<
  T extends LotteriesDrawerNavigatorScreensNames,
> = DrawerNavigationProp<LotteriesDrawerNavigatorParamList, T>;
export type LotteriesDrawerNavigatorRouteProp<
  T extends LotteriesDrawerNavigatorScreensNames,
> = RouteProp<LotteriesDrawerNavigatorParamList, T>;

/* ----- LOTTERIES SETTINGS NAVIGATOR ----- */

export type LotteriesSettingsNavigatorParamList = {
  LotteriesSettings: undefined;
};

type LotteriesSettingsNavigatorScreensNames =
  keyof LotteriesSettingsNavigatorParamList;

export type LotteriesSettingsNavigatorScreenProps<
  T extends LotteriesSettingsNavigatorScreensNames,
> = StackScreenProps<LotteriesSettingsNavigatorParamList, T>;
export type LotteriesSettingsNavigatorNavigationProp<
  T extends LotteriesSettingsNavigatorScreensNames,
> = StackNavigationProp<LotteriesSettingsNavigatorParamList, T>;
export type LotteriesSettingsNavigatorRouteProp<
  T extends LotteriesSettingsNavigatorScreensNames,
> = RouteProp<LotteriesSettingsNavigatorParamList, T>;
