/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';

import DefaultTheme from '@theme/index';
import {UIManager, useColorScheme} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ThemeProvider} from 'styled-components';

import AppComponent from './src';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {}, []);

  return (
    <ThemeProvider theme={DefaultTheme}>
      <SafeAreaProvider>
        <AppComponent />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

export default App;
