import React from 'react';

import Text from '@views/Text/TextBase';
import {StyledView} from '@views/View';

function ProfileScreen() {
  return (
    <StyledView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Profile Screen</Text>
    </StyledView>
  );
}

export default ProfileScreen;
