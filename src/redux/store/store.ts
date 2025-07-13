// src/store/store.ts

import { configureStore, Middleware, Store } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer, { RootState } from '../rootReducer';
import rootSaga from '../rootSaga';
import { createLogger } from 'redux-logger';
// import Config from 'react-native-config';
import { configureInterceptor } from '@/common/http/axiosInstance';
import { useDispatch, useStore } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
const createSagaMiddleware = require('redux-saga').default;

//Persist config — make sure this matches your actual reducer keys
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'], // e.g. persist auth slice only
};

const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer);
const sagaMiddleware = createSagaMiddleware();

//Setup middlewares
const middlewares: Middleware[] = [sagaMiddleware];

if (__DEV__) {
  const logger = createLogger({ collapsed: true, duration: true, diff: true });
  middlewares.push(logger);
}
console.log('before');
//Configure the store
export const store = configureStore({
  reducer: persistedReducer,
  //TODO: Change to react-native-config later
  devTools: __DEV__,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false, // required for redux-persist
    }).concat(...middlewares),
});
console.log('store', store);
sagaMiddleware.run(rootSaga);
configureInterceptor();

//Persistor
export const persistor = persistStore(store);

//Export
type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppStore: () => Store<RootState> = useStore;
