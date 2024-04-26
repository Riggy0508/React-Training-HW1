import React from 'react';
import {
  Platform,
  NativeModules,
  UIManager,
  requireNativeComponent,
  ViewStyle,
} from 'react-native';

export const showFancyNotification = (title: string, body: string) => {
  const module = NativeModules.Notification;
  module.showNotification(title, body);
};

const ComponentName = 'RNCustomButton';

type CustomButtonProps = {
  style?: ViewStyle;
  title: string;
  disabled: boolean;
  onPress: () => void;
};

type NativeCustomButtonProps = {
  style?: ViewStyle;
  text: string;
  disabled: boolean;
  onPress?: () => void;
};

const LINKING_ERROR =
  "The package 'CustomButtonView' doesn't seem to be linked. Make sure: \n\n" +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

export const CustomButtonView =
  UIManager.getViewManagerConfig(ComponentName) != null
    ? requireNativeComponent<NativeCustomButtonProps>(ComponentName)
    : () => {
        throw new Error(LINKING_ERROR);
      };

export const CustomButton = (props: CustomButtonProps) => {
  return (
    <CustomButtonView
      style={props.style}
      text={props.title}
      disabled={props.disabled}
      onPress={props.onPress}
    />
  );
};
