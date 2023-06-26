/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';

import DefaultTheme from '@theme/index';
import {UIManager, useColorScheme} from 'react-native';
import {ThemeProvider} from 'styled-components';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {}, []);

  return <ThemeProvider theme={DefaultTheme} />;
}

export default App;
