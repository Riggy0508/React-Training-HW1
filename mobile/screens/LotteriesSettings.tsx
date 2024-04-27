import React from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/reducers';
import { toggleAddingNewLotteriesEnabled } from '../store/reducers/lotteryReducer';
import { colors } from '../colors';
import { useTheme } from '../hooks/useTheme';
import { useTranslation } from 'react-i18next';

export const LotteriesSettings = () => {
  const { setColorScheme, colorScheme } = useTheme();
  const {i18n} = useTranslation();

  const dispatch = useDispatch();

  const isAddingNewLotteriesEnabled = useSelector(
    (state: RootState) => state.lotteries.isAddingNewLotteriesEnabled,
  );
  const onIsAddingNewLotteriesEnabledValueChange = () => {
    dispatch(toggleAddingNewLotteriesEnabled());
  };

  return (
    <View style={styles.container}>
      <View style={styles.settingRow}>
        <Switch
          value={isAddingNewLotteriesEnabled}
          onValueChange={onIsAddingNewLotteriesEnabledValueChange}
          testID="adding_new_lottery_switch"
        />
        <Text style={styles.settingRowText}>Enable adding new lotteries</Text>
      </View>

      <View style={styles.settingRow}>
        <Switch
          value={colorScheme === 'dark'}
          onValueChange={() =>
            setColorScheme(colorScheme === 'dark' ? 'light' : 'dark')
          }
          testID="dark_mode_switch"
        />
        <Text style={styles.settingRowText}>Dark mode</Text>
      </View>

      <View style={[styles.settingRow, styles.languageSelector]}>
        <Text style={styles.settingRowText}>English</Text>
        <Switch
          value={i18n.language === 'es'}
          onValueChange={() => {
            i18n.changeLanguage(i18n.language === 'es' ? 'en' : 'es');
          }}
          testID="language_switch"
        />
        <Text style={styles.settingRowText}>Spanish</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 12,
    backgroundColor: colors.secondary,
    gap: 15,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingRowText: {
    fontSize: 16,
    marginLeft: 10,
  },
  languageSelector:{
    justifyContent:'space-between'
  }
});