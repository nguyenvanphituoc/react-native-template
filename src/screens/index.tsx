import React, {useRef, useEffect, useState, createRef} from 'react';

import {navigationRef} from '@navigations/index';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar, AppState} from 'react-native';
import styled from 'styled-components/native';

import Text from '@components/Text';
import VStack from '@components/VerticalStack';
import HStack from '@components/HorizontalStack';
import Spacer from '@components/Spacer';
import i18n from '@locales/index';

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
      }
    });

    return () => {
      subscription.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        const currentRouteName =
          navigationRef?.current?.getCurrentRoute()?.name;
        routeNameRef.current = currentRouteName;
      }}
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName =
          navigationRef?.current?.getCurrentRoute()?.name;
        const routeParams = navigationRef?.current?.getCurrentRoute()?.params;

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
      <HStack>
        <Spacer
          style={{
            backgroundColor: 'yellow',
          }}
        />
        <StyledWrapped>
          <Spacer />
          <StyledWelcomeThinText>
            {i18n.t('common.welcome')}
          </StyledWelcomeThinText>
          <Spacer />
          <StyledWelcomeNormalText>
            {i18n.t('common.welcome')}
          </StyledWelcomeNormalText>
          <Spacer />
          <StyledWelcomeMediumText>
            {i18n.t('common.welcome')}
          </StyledWelcomeMediumText>
          <Spacer />
          <StyledWelcomeLight>{i18n.t('common.welcome')}</StyledWelcomeLight>
          <Spacer />
          <StyledWelcomeBlackText>
            {i18n.t('common.welcome')}
          </StyledWelcomeBlackText>
          <Spacer />
        </StyledWrapped>
      </HStack>
      {/* your stack screen */}
    </NavigationContainer>
  );
};

const StyledWrapped = styled(VStack).attrs(() => ({
  alignment: 'flex-start',
}))``;

const StyledWelcomeThinText = styled(Text[100].ThinText)`
  font-size: 24px;
  line-height: 26px;
`;
const StyledWelcomeNormalText = styled(Text[400].Normal)`
  font-size: 24px;
  line-height: 26px;
`;
const StyledWelcomeMediumText = styled(Text[500].Medium)`
  font-size: 24px;
  line-height: 26px;
`;
const StyledWelcomeLight = styled(Text[700].Bold)`
  font-size: 24px;
  line-height: 26px;
`;
const StyledWelcomeBlackText = styled(Text[900].Black)`
  font-size: 24px;
  line-height: 26px;
`;

export default RootComponent;
