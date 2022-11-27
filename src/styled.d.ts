import theme from '@assets/theme';

type LightTheme = typeof theme;

declare module 'styled-components/native' {
  export interface DefaultTheme extends LightTheme {}
}
