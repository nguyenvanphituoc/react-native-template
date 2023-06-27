import React, {useRef, useEffect} from 'react';

import Navigator from '@navigation/index';
import MainStack from '@navigation/MainStack';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar, AppState} from 'react-native';

const RootComponent = () => {
  const routeNameRef = useRef<string>();

  // App on foreground handle
  const oldAppState = useRef(AppState.currentState);

  useEffect(() => {
    const handleAppStateChange = (nextAppState: any) => {
      if (
        oldAppState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
      }

      oldAppState.current = nextAppState;
    };

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );
    return function cleanup() {
      subscription.remove();
    };
    //   }, [dispatch]);
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState.match(/inactive|background/)) {
        console.log('App go to inactive|background');
        // TODO:
      } else if (nextAppState.match(/active/)) {
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <NavigationContainer
      ref={Navigator.getRef()}
      onReady={() => {
        const currentRouteName =
          Navigator.getRef()?.current?.getCurrentRoute()?.name;
        routeNameRef.current = currentRouteName;
      }}
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName =
          Navigator.getRef()?.current?.getCurrentRoute()?.name;
        const routeParams =
          Navigator.getRef()?.current?.getCurrentRoute()?.params;

        if (previousRouteName !== currentRouteName) {
          // The line below uses the tracker
          console.log('currentRouteName: ', currentRouteName);
          if (routeParams) {
            console.log('currentRouteParams: ', routeParams ?? {});
          }
        }

        // Save the current route name for later comparison
        routeNameRef.current = currentRouteName;
      }}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <MainStack />
    </NavigationContainer>
  );
};
export default RootComponent;
