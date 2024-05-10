import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Form from '../components/Form';
import { colors } from '../colors';
import { LotteriesNavigatorNavigationProp } from '../navigation/types';
import { showFancyNotification } from '../native';

const AddLottery = () => {
  const navigation =
    useNavigation<LotteriesNavigatorNavigationProp<'AddLottery'>>();

  const onSubmit = () => {
    showFancyNotification('Lottery added', 'Good luck!');
  };

  const onNavigateBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Form onSubmit={onSubmit} onNavigateBack={onNavigateBack} />
    </View>
  );
};

export default AddLottery;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
    justifyContent: 'center',
  },
});
