import {MAPPING_FONT_FAMILY} from '@assets/fonts/constant';
// pallete
export const lightColors = {
  black: '#000000',
  white: '#FFFFFF',
};
export const alpha = {
  alpha_10: 'FF',
  alpha_09: 'E6',
  alpha_08: 'CD',
  alpha_07: 'B4',
  alpha_06: '9B',
  alpha_05: '82',
  alpha_04: '69',
  alpha_03: '37',
  alpha_02: '1E',
  alpha_01: '05',
  alpha_005: '0d',
};

export const depthLevel = {
  level_01: 40,
  level_02: 30,
  level_03: 20,
  level_04: 10,
};

const DefaultTheme = {
  roundness: 4,
  colors: lightColors,
  iconSize: {
    normal: 24,
    small: 16,
    large: 32,
  },
  fonts: MAPPING_FONT_FAMILY,
  depthLevel,
  alpha,
};

export default DefaultTheme;
