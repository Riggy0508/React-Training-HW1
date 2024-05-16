import { DefaultTheme, DarkTheme } from '@react-navigation/native';

export const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: 'rgb(255, 255, 0)',
  },
};

export const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(255, 0, 0)',
  },
};

export type Theme = typeof darkTheme | typeof lightTheme;

export type ColorMode = 'dark' | 'light';