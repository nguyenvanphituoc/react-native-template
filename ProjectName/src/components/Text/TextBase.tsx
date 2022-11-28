import React from 'react';
import {TextProps} from 'react-native';
import styled from 'styled-components/native';
interface ComponentPropsInteface {
  color?: string;
}
const StyledTextBase = styled.Text<ComponentPropsInteface>`
  color: ${props => props.color ?? props.theme.colors.textPrimary};
`;
const Component = (props: ComponentPropsInteface & TextProps) => {
  return <StyledTextBase {...props} allowFontScaling={false} />;
};

Component.default = {};

export default Component;
