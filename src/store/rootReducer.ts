import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers, Action, AnyAction, current} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import applicationReducer, {
  Slice as ApplicationSlice,
} from './redux/application/reducer';

const persistMetaConfig = {
  key: 'meta',
  version: 1,
  storage: AsyncStorage,
  timeout: undefined,
  // https://github.com/rt2zz/redux-persist#state-reconciler
  // https://blog.bam.tech/developer-news/redux-persist-how-it-works-and-how-to-change-the-structure-of-your-persisted-store
  stateReconciler: autoMergeLevel2,
};

const appReducer = {
  [ApplicationSlice.name]: applicationReducer,
};

const appCombineReducer = combineReducers(appReducer);

// export type RootState = ReturnType<typeof rootReducer>;
const rootReducer = (
  state: ReturnType<typeof appCombineReducer> | undefined,
  action: Action,
): ReturnType<typeof appCombineReducer> => {
  return appCombineReducer(state, action);
};

export default rootReducer;
