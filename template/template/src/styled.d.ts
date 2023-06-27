// import original module declarations
import 'styled-components';
import theme from '@theme/index';
type ApplicationTheme = typeof theme;
// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme extends ApplicationTheme {}
}
