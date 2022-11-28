import React from 'react';

import styled from 'styled-components/native';

import TextBase from './TextBase';

const ThinText = styled(TextBase)`
  font-weight: 100;
  font-size: 10px;
  line-height: 12px;
`;
const ThinText12 = styled(TextBase)`
  font-weight: 100;
  font-size: 12px;
  line-height: 14px;
`;
const ThinText16 = styled(TextBase)`
  font-weight: 100;
  font-size: 16px;
  line-height: 18px;
`;
const ThinText24 = styled(TextBase)`
  font-weight: 100;
  font-size: 24px;
  line-height: 26px;
`;
//==================================
const ExtraLight = styled(TextBase)`
  font-weight: 200;
  font-size: 10px;
  line-height: 12px;
`;
//==================================
const Light = styled(TextBase)`
  font-weight: 300;
  font-size: 10px;
  line-height: 12px;
`;
//==================================
const Normal = styled(TextBase)`
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
`;
//==================================
const Medium = styled(TextBase)`
  font-weight: 500;
  font-size: 10px;
  line-height: 12px;
`;
//==================================
const SemiBold = styled(TextBase)`
  font-weight: 600;
  font-size: 10px;
  line-height: 12px;
`;
//==================================
const Bold = styled(TextBase)`
  font-weight: 700;
  font-size: 10px;
  line-height: 12px;
`;
//==================================
const ExtraBold = styled(TextBase)`
  font-weight: 800;
  font-size: 10px;
  line-height: 12px;
`;
//==================================
const Black = styled(TextBase)`
  font-weight: 900;
  font-size: 10px;
  line-height: 12px;
`;

//==================================
export default {
  100: {
    ThinText,
    ThinText12,
    ThinText16,
    ThinText24,
  },
  200: {
    ExtraLight,
  },
  300: {
    Light,
  },
  400: {
    Normal,
  },
  500: {
    Medium,
  },
  600: {
    SemiBold,
  },
  700: {
    Bold,
  },
  800: {
    ExtraBold,
  },
  900: {
    Black,
  },
};
