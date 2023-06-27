import React from 'react';

import {ViewStyle} from 'react-native';
import styled from 'styled-components/native';

import StyledView, {ViewPropsInterface} from './ViewBase';
// StackInterface
export interface StackPropsInterface extends ViewPropsInterface {
  crossAxis?: ViewStyle['alignItems'];
  mainAxis?: ViewStyle['justifyContent'];
  flexDirection?: ViewStyle['flexDirection'];
}
// Stack
export const StyledStack = styled(StyledView).attrs(
  (props: StackPropsInterface) => ({
    justifyContent: props.mainAxis ?? 'center',
    alignItems: props.crossAxis ?? 'center',
    flexDirection: props.flexDirection ?? 'column',
  }),
)`
  flex: 1;
`;
// VStack
export const StyledVStack = styled(StyledStack).attrs(
  (props: StackPropsInterface) => ({
    flexDirection: 'column',
  }),
)``;
// HStack
export const StyledHStack = styled(StyledView).attrs(
  (props: StackPropsInterface) => ({
    flexDirection: 'row',
  }),
)``;

// TODO: Spacer
