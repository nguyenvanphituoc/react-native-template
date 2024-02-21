import React from 'react';

import i18n from '@locales/index';
import Text from '@views/Text';
import {StyledView} from '@views/View';

function ProfileScreen() {
  return (
    <StyledView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text.RegularText>
        {i18n.t('common.title', {
          byMe: <Text.RegularText>@nguyenvanphituoc</Text.RegularText>,
        })}
      </Text.RegularText>
      <Text.RegularText>
        {i18n.t('common.title', {
          byMe: 'React-Native',
        })}
      </Text.RegularText>
      <Text.RegularText>
        {i18n.t('common.title', {
          byMe: () => <Text.RegularText>typescript</Text.RegularText>,
        })}
      </Text.RegularText>
    </StyledView>
  );
}

export default ProfileScreen;
