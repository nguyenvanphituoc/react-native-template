import AsyncStorage from '@react-native-async-storage/async-storage';
import {AnyAction, configureStore, MiddlewareArray} from '@reduxjs/toolkit';
import logger from 'redux-logger';
import {persistReducer, persistStore, PersistConfig} from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import createSagaMiddleware from 'redux-saga';

import {
  asyncFunctionMiddleware,
  asyncDispatchMiddleware,
} from './middleware/asyncMiddleware';
//
import rootSaga from './rootSaga';
import rootReducer from './rootReducer';

type ReducerType = ReturnType<typeof rootReducer>;
type ReducerNameEnum = keyof ReducerType;
const persistConfig: PersistConfig<ReducerType> = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  timeout: undefined,
  // blacklist: [] as ReducerNameEnum[] as string[],
  // https://github.com/rt2zz/redux-persist#state-reconciler
  // https://blog.bam.tech/developer-news/redux-persist-how-it-works-and-how-to-change-the-structure-of-your-persisted-store
  stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer<ReducerType, AnyAction>(
  persistConfig,
  rootReducer,
);

const sagaMiddleware = createSagaMiddleware();

const middlewareArray = new MiddlewareArray().concat(
  asyncDispatchMiddleware,
  asyncFunctionMiddleware,
  sagaMiddleware,
);

if (__DEV__) {
  middlewareArray.push(logger);
}

export const store = configureStore({
  reducer: persistedReducer,
  middleware: middlewareArray,
});

sagaMiddleware.run(rootSaga);
export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
