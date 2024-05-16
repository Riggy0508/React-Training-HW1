/* eslint-disable promise/no-callback-in-promise */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getLocales } from 'expo-localization';
import { FALLBACK_LOCALE, SUPPORTED_LOCALES } from './config';
import en from './translations/en.json';
import es from './translations/es.json';

export const setupI18n = async () => {
  try {
    await i18n
      .use(initReactI18next)
      .use({
        type: 'languageDetector',
        name: 'asyncStorageDetector',
        async: true,
        init: () => {},
        detect: async function (callback: Function) {
          const locales = getLocales();

          // Check if any of the `locales` is supported (SUPPORTED_LOCALES)
          const supportedLocale = locales.find((locale) =>
            SUPPORTED_LOCALES.includes(
              locale.languageCode as (typeof SUPPORTED_LOCALES)[number],
            ),
          );

          try {
            await AsyncStorage.getItem('user-language').then((language) => {
              if (language) {
                return callback(language);
              }

              const fallbackLng =
                supportedLocale?.languageCode ?? FALLBACK_LOCALE;

              return callback(fallbackLng);
            });
          } catch (error) {
            callback(FALLBACK_LOCALE);
          }
        },
        cacheUserLanguage: async function (language: string) {
          try {
            await AsyncStorage.setItem('user-language', language);
          } catch (error) {
            console.error(error);
          }
        },
      })
      .init({
        resources: {
          en: {
            translation: en,
          },
          es: {
            translation: es,
          },
        },
        fallbackLng: FALLBACK_LOCALE,
        interpolation: {
          escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
        },
      });
  } catch (error) {
    console.error('i18n failed to initialize', error);
  }
};
