import React from 'react';

import {ViewProps} from 'react-native';
import styled from 'styled-components/native';

export interface ComponentPropsInteface extends ViewProps {
  backgroundColor?: string;
}
const StyledView = styled.View<ComponentPropsInteface>`
  background-color: ${props =>
    props.backgroundColor ?? props.theme.colors.backgroundPrimary};
`;
const Component = (props: ComponentPropsInteface) => {
  return <StyledView {...props} />;
};

export default Component;
