import React, {useCallback} from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '@screens/Home';
import ProfileScreen from '@screens/Profile';
import Text from '@views/Text';
import {Platform, ViewStyle} from 'react-native';
import styled, {useTheme} from 'styled-components/native';

import SCREEN_NAME from './ScreenName';

const Tab = createBottomTabNavigator();

function BottomTabStack() {
  const {colors} = useTheme();
  const tabBarOptions = useCallback(
    ({route}: {route: any}) => {
      return {
        tabBarHideOnKeyboard: Platform.OS === 'ios',
        keyboardHidesTabBar: true,
        tabBarItemStyle: {
          marginBottom: Platform.OS === 'android' ? 8 : 0,
          marginTop: Platform.OS === 'android' ? 5 : 0,
        },
        lazy: true,
        tabBarStyle: {
          backgroundColor: colors.white,
          display: 'flex' as ViewStyle['display'],
          paddingTop: 10,
          marginBottom: 4,
        },
        tabBarIcon: ({focused}: {focused: boolean}) => {
          return null;
        },
        tabBarLabel: ({focused}: {focused: boolean}) => {
          return <TabTitle>{route?.name}</TabTitle>;
        },
        headerShown: false,
      };
    },
    [colors],
  );

  return (
    <Tab.Navigator screenOptions={tabBarOptions}>
      <Tab.Screen name={SCREEN_NAME.SCREEN_003} component={HomeScreen} />
      <Tab.Screen
        name={SCREEN_NAME.SCREEN_004}
        component={ProfileScreen}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
}

const TabTitle = styled(Text.RegularText)`
  font-size: 14px;
`;

export default BottomTabStack;
