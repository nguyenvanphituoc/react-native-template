import React from 'react';

import styled from 'styled-components/native';

import View, {ComponentPropsInteface as ViewProps} from '../View';

interface ComponentPropsInteface extends ViewProps {
  size?: number;
}

const StyledSpacer = styled(View).attrs(
  (props: ComponentPropsInteface) => ({}),
)`
  flex-grow: 1;
`;

const Component = (props: ComponentPropsInteface) => {
  return <StyledSpacer {...props} />;
};

export default Component;
