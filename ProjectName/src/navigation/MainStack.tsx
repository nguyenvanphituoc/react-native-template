// In App.js in a new project

import * as React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AppStack from './AppStack';
import SCREEN_NAME from './ScreenName';
import {screenOptionsNativeStack} from './style';

const Stack = createNativeStackNavigator();

function MainStack() {
  return (
    <Stack.Navigator screenOptions={screenOptionsNativeStack}>
      <Stack.Screen name={SCREEN_NAME.SCREEN_001} component={AppStack} />
    </Stack.Navigator>
  );
}

export default MainStack;
