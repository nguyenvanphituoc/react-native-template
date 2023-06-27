import React from 'react';

import {ViewProps, View} from 'react-native';
import styled from 'styled-components/native';
// View
export interface ViewPropsInterface extends ViewProps {
  backgroundColor?: string;
}

const StyledView = styled.View<ViewPropsInterface>`
  background-color: ${props =>
    props.backgroundColor ?? props.theme.colors.white};
`;

function Component(props: ViewPropsInterface): JSX.Element {
  return <StyledView {...props} />;
}

export default Component;
