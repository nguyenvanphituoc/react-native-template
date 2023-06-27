import React from 'react';

import {
  NavigationContainerRef,
  StackActions,
  TabActions,
} from '@react-navigation/native';

import SCREEN_NAME from './ScreenName';

export type ScreenNameType = keyof typeof SCREEN_NAME;

export interface ScreenPropType extends ReactNavigation.RootParamList {
  [SCREEN_NAME.SCREEN_001]: {};
}

export type NavigationType = NavigationContainerRef<ScreenPropType>;

export type NavigateTransitionType = <
  T extends ScreenPropType,
  N extends ScreenNameType,
>(
  name: N,
  params?: T,
) => void;

export interface NavigationInterface {
  navigateTo: NavigateTransitionType;
  push: NavigateTransitionType;
  replace: NavigateTransitionType;
  reset: NavigateTransitionType;
  pop: (count?: number) => void;
  goBack: () => void;
  getRef: () => ReturnType<typeof React.createRef<NavigationType>>;
}

export class NavigationProvider implements NavigationInterface {
  private _ref = React.createRef<NavigationType>();

  constructor() {
    this.getRef = this.getRef.bind(this);
    this.push = this.push.bind(this);
    this.navigateTo = this.navigateTo.bind(this);
    this.pop = this.pop.bind(this);
    this.push = this.push.bind(this);
    this.replace = this.replace.bind(this);
    this.reset = this.reset.bind(this);
  }

  getRef() {
    return this._ref;
  }

  push(name: string, params?: any) {
    this._ref.current?.dispatch(StackActions.push(name, params));
  }

  navigateTo<T>(name: any, params?: T) {
    this._ref.current?.navigate(name, params);
  }

  goBack() {
    this._ref.current?.goBack();
  }

  replace(name: string, params?: any) {
    this._ref.current?.dispatch(StackActions.replace(name, params));
  }

  pop(count?: number) {
    this._ref.current?.dispatch(StackActions.pop(count));
  }

  reset(stackName: string, params?: any) {
    this._ref.current?.reset({
      index: 0,
      routes: [{name: stackName, params}],
    });
  }
}

const Navigation = new NavigationProvider();

export default Navigation;
