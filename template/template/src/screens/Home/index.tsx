import React from 'react';

import Text from '@views/Text';
import {StyledView} from '@views/View';
function HomeScreen() {
  return (
    <StyledView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text.RegularText>Home Screen</Text.RegularText>
    </StyledView>
  );
}

export default HomeScreen;
