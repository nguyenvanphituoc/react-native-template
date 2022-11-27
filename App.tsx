import React, {memo, useEffect} from 'react';

import DefaultTheme from '@assets/theme';
import {useColorScheme} from 'react-native';
import {ThemeProvider} from 'styled-components';
//
import RootComponent from './src/screens';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <ThemeProvider theme={DefaultTheme}>
      <RootComponent />
    </ThemeProvider>
  );
};

export default App;
