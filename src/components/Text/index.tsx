import React from 'react';
import styled from 'styled-components/native';
interface ComponentPropsInteface {
  color?: string;
}
const StyledTextBase = styled.Text<ComponentPropsInteface>`
  color: ${props => props.color ?? props.theme.colors.textPrimary};
`;
const Component = (props: ComponentPropsInteface) => {
  return <StyledTextBase {...props} />;
};

export default Component;
