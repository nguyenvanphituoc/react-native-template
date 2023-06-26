import React from 'react';

import useGlobalStyles from '@theme/useTheme';
import Text from '@views/Text/TextBase';
import {TouchableOpacityProps, TextStyle} from 'react-native';
import styled, {useTheme} from 'styled-components/native';

interface Props {
  children: string | React.ReactNode;
  height?: number;
  disabled?: boolean;
  backgroundColor?: string;
  outline?: boolean;
  textStyle?: TextStyle;
  style?: TouchableOpacityProps['style'];
  onPress?: any;
  isShadow?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}
// type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
// type EXCLUDE_KEY =
//   | 'onLayout'
//   | 'hitSlop'
//   | 'onBlur'
//   | 'event'
//   | 'currentTarget';
const Button = ({
  iconLeft,
  iconRight,
  children,
  height,
  backgroundColor,
  style,
  textStyle,
  isShadow,
  ...props
}: Props & TouchableOpacityProps) => {
  const {colors} = useTheme();
  const styles = useGlobalStyles();

  return (
    <PrimaryButton
      height={height}
      {...props}
      style={isShadow ? [styles.shadow, style as any] : (style as any)}>
      {iconLeft}
      <PrimaryText
        color={backgroundColor ? colors.white : colors.white}
        style={textStyle}>
        {children}
      </PrimaryText>
      {iconRight}
    </PrimaryButton>
  );
};

const PrimaryButton = styled.TouchableOpacity<{
  disabled?: boolean;
  height?: number;
}>`
  align-items: center;
  justify-content: center;
  padding-horizontal: 8px;
  border-radius: 6px;
  opacity: ${props => (props.disabled ? 0.5 : 1)};
  height: ${props => (props?.height ? props?.height + 'px' : 'auto')};
  flex-direction: row;
`;

const PrimaryText = styled(Text)`
  text-align: center;
`;

export default {
  Link: Button,
};
