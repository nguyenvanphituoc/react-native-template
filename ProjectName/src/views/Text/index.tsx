import React from 'react';

import sizes from '@utils/size';
import styled from 'styled-components/native';

import TextBase from './TextBase';

const RegularText = styled(TextBase)`
  ${props =>
    Object.values(props.theme.fonts[400]).length
      ? `font-family: ${props.theme.fonts[400]?.['Roboto']};`
      : undefined}
`;
//export
export default {
  RegularText,
};
