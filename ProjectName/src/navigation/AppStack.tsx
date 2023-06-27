import React, {memo, useCallback, useRef} from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import BottomTabStack from './BottomStack';
import SCREEN_NAME from './ScreenName';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  // init screens by using ref
  const ListOfScreens = useRef({
    [SCREEN_NAME.SCREEN_002]: BottomTabStack,
  }).current;
  const renderStackScreen = useCallback(() => {
    return Object.keys(ListOfScreens).map((key: string, index: number) => (
      <Stack.Screen
        name={key}
        key={index.toString()}
        options={{headerShown: false}}
        component={(ListOfScreens as any)[key]}
      />
    ));
  }, [ListOfScreens]);

  return (
    <Stack.Navigator
      initialRouteName={SCREEN_NAME.SCREEN_002}
      screenOptions={{
        headerShown: false,
      }}>
      {renderStackScreen()}
    </Stack.Navigator>
  );
};

export default memo(AuthStack);
