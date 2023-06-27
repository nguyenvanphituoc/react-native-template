import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import {Platform} from 'react-native';

export const screenOptionsNativeStack: NativeStackNavigationOptions = {
  headerShown: false,
  customAnimationOnGesture: true,
  fullScreenGestureEnabled: true,
  gestureEnabled: true,
  animationTypeForReplace: 'push',
  animation: 'slide_from_right',
  presentation: Platform.OS === 'android' ? 'modal' : undefined,
};
