import React from 'react';

import i18n from '@locales/index';
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
      <Text>
        {i18n.t('common.title', {
          byMe: <Text>@nguyenvanphituoc</Text>,
        })}
      </Text>
      <Text>
        {i18n.t('common.title', {
          byMe: 'React-Native',
        })}
      </Text>
      <Text>
        {i18n.t('common.title', {
          byMe: () => <Text>typescript</Text>,
        })}
      </Text>
    </StyledView>
  );
}

export default ProfileScreen;
