import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { LotteriesDrawerNavigatorNavigationProp } from './types';
import {useTheme} from '../hooks/useTheme'


export const DrawerNavigationButton = () => {
  const { theme: {colors},}=useTheme();
  const navigation =
    useNavigation<LotteriesDrawerNavigatorNavigationProp<'LotteriesStack'>>();

  return (
    <TouchableOpacity
      accessibilityRole="button"
      onPress={() => navigation.openDrawer()}
      testID="side_menu_button"
    >
      <MaterialIcons name="menu" size={24} color={colors.primary} />
    </TouchableOpacity>
  );
};