import React, {
    createContext,
    useCallback,
    useEffect,
    useMemo,
    useState,
  } from 'react';
  import { useColorScheme } from 'react-native';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import { ColorMode, Theme, darkTheme, lightTheme } from '../theme';
  
  type ThemeContextType = {
    theme: Theme;
    colorScheme: ColorMode;
    setColorScheme: (scheme: ColorMode) => void;
  };
  
  export const ThemeContext = createContext<ThemeContextType | null>(null);
  
  export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const fallbackColorScheme = useColorScheme();
    const [colorScheme, setColorScheme] = useState<ColorMode | null>(null);
  
    const theme = useMemo(() => {
      if (colorScheme === 'dark') {
        return darkTheme;
      } else if (colorScheme === 'light') {
        return lightTheme;
      }
  
      return fallbackColorScheme === 'light' ? lightTheme : darkTheme;
    }, [colorScheme, fallbackColorScheme]);
  
    const setAndPersistColorScheme = useCallback(async (scheme: ColorMode) => {
      // Set color scheme
      setColorScheme(scheme);
      // Persist color scheme
      await AsyncStorage.setItem('colorScheme', scheme);
    }, []);
  
    useEffect(() => {
      // Load persisted settings
      const loadPersistedSettings = async () => {
        const persistedColorScheme = await AsyncStorage.getItem('colorScheme');
  
        if (persistedColorScheme) {
          setColorScheme(persistedColorScheme as ColorMode);
        }
      };
  
      loadPersistedSettings();
    }, []);
  
    const value = useMemo(
      () => ({
        colorScheme: colorScheme ?? fallbackColorScheme ?? 'light',
        theme,
        setColorScheme: setAndPersistColorScheme,
      }),
      [colorScheme, fallbackColorScheme, setAndPersistColorScheme, theme],
    );
  
    return (
      <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    );
  };