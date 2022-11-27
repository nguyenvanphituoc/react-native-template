import {createRef} from 'react';

import {StackActions, NavigationProp} from '@react-navigation/native';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';

export type NavigationProps = NavigationProp<ReactNavigation.RootParamList>;
export type RouteProp<T> = {params: T};

export const navigationOptions: NativeStackNavigationOptions = {
  // gestureEnabled: true,
  gestureDirection: 'horizontal',
  headerShown: false,
};

export const navigationRef: any = createRef();

export function navigate(name: string, params?: any) {
  navigationRef.current?.navigate(name, params);
}

export function push(name: string, params?: any) {
  navigationRef.current?.dispatch(StackActions.push(name, params));
}

export function replace(name: string, params?: any) {
  navigationRef.current?.dispatch(StackActions.replace(name, params));
}

export function pop(count: number) {
  navigationRef.current?.dispatch(StackActions.pop(count));
}

export const getNavigation = () => {
  return navigationRef.current;
};

export const navigateReset = (stackName: string, params?: any) => {
  navigationRef.current?.reset({
    index: 0,
    routes: [{name: stackName, params}],
  });
};

export const reset = () => {
  navigationRef.current?.reset({
    index: 0,
    routes: [{name: 'Drawer'}],
  });
};

export function goBack() {
  navigationRef.current?.goBack();
}

export function navigateTo<T>(name: string, params?: T) {
  navigationRef.current?.navigate(name, params);
}
