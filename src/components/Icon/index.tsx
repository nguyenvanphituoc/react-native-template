import React from 'react';

import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import styled from 'styled-components/native';

// import icoMoonConfig from './selection.json';

// const Icon = createIconSetFromIcoMoon(icoMoonConfig);

interface ContainerProps {
  marginLeft?: number;
  marginRight?: number;
}

const Container = styled.TouchableOpacity<ContainerProps>`
  align-items: center;
  justify-content: center;
  ${props => props.marginLeft && `margin-left: ${props.marginLeft}px;`}
  ${props => props.marginRight && `margin-right: ${props.marginRight}px;`}
`;

// const WrappedIcon = styled(Icon).attrs(props => ({
//   color: props?.color || props?.theme.colors.backgroundSeccondary,
//   size: props?.size || 24,
// }))``;

export type ICON_LIST =
  | ''
  // this section for external icon
  | EXTERNAL_ICON;

// why have this:
// Cz some SVG using only stroke line this cannot create font for this by icomoon
// So we using customize svg in our end but this cannot scalable
// The other option: using origin svg and combine with react-native-svg-transformer => scalable in native app
const externalIcons = [] as const;
type EXTERNAL_ICON = typeof externalIcons[number];

function isOfTypeExternalIcon(icon: string): icon is EXTERNAL_ICON {
  return (externalIcons as readonly string[]).includes(icon);
}
export interface IconButtonProps {
  style?: Object;
  iconName: ICON_LIST;
  size?: number;
  color?: string;
  stroke?: string;
  onPress?: () => void;
  disabled?: boolean;
}

const IconButton: React.FC<IconButtonProps> = ({
  iconName,
  onPress,
  size,
  color,
  stroke,
  style,
  disabled = false,
  ...props
}) => {
  const renderExternalIcon = () => {
    switch (iconName) {
      default:
        return null;
    }
  };

  return (
    <Container disabled={disabled} onPress={onPress} style={style} {...{props}}>
      {isOfTypeExternalIcon(iconName)
        ? renderExternalIcon()
        : null
          // <WrappedIcon
          //   name={iconName}
          //   size={size}
          //   color={color}
          //   // stroke={stroke}
          // />
      }
    </Container>
  );
};

export default React.memo(IconButton);
