import {useMemo} from 'react';

import {StyleSheet} from 'react-native';
import {useTheme, DefaultTheme} from 'styled-components/native';

const getGlobalStyles = (props: DefaultTheme) =>
  StyleSheet.create({
    shadow: {
      shadowColor: props.colors.black,
      shadowOpacity: 0.4,
      shadowOffset: {
        height: 1,
        width: 0,
      },
      elevation: 10,
    },
  });

const useGlobalStyles = () => {
  const currentTheme = useTheme();
  const styleTheme = useMemo(
    () => getGlobalStyles(currentTheme),
    [currentTheme],
  );
  return styleTheme;
};

export default useGlobalStyles;
