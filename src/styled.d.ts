// import original module declarations
import 'styled-components';
import {ApplicationTheme} from '@assets/theme';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme extends ApplicationTheme {}
}
