import React from 'react';
import {ViewStyle} from 'react-native';

import styled from 'styled-components/native';

import View, {ComponentPropsInteface as ViewProps} from '../View';

interface ComponentPropsInteface {
  alignment?: ViewStyle['justifyContent'];
}
const StyledVStack = styled(View).attrs((props: ComponentPropsInteface) => ({
  justifyContent: props.alignment ?? 'center',
}))`
  flex: 1;
  flex-direction: row;
`;
const Component = (props: ComponentPropsInteface & ViewProps) => {
  return <StyledVStack {...props} />;
};

export default Component;
