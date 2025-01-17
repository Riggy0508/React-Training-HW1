import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../colors';
import {useTheme} from '../hooks/useTheme'

type Props = {
  onPress: () => void;
  testID?: string;
};

const FAB = ({ onPress, testID='fab' }: Props) => {
  const {
    theme: {colors},
  }=useTheme();
  return (
    <TouchableOpacity
      accessibilityRole="button"
      style={[styles.container , {backgroundColor:colors.background}]}
      onPress={onPress}
      testID="fab"
    >
      <Ionicons name="md-add" size={30} color="#FFF" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.buttonPrimary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },
});

export default FAB;