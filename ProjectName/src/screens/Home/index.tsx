import React from 'react';

import Text from '@views/Text/TextBase';
import {StyledView} from '@views/View';
function HomeScreen() {
  return (
    <StyledView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Home Screen</Text>
    </StyledView>
  );
}

export default HomeScreen;
