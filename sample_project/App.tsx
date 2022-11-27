import React, {memo, useEffect} from 'react';

import DefaultTheme from '@assets/theme';
import {useColorScheme} from 'react-native';
import {ThemeProvider} from 'styled-components';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
//
import {persistor, store} from './src/store/index';
import RootComponent from './src/screens';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider theme={DefaultTheme}>
          <RootComponent />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
