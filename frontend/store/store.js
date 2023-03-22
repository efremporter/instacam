import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import thunk from 'redux-thunk'
import rootReducer from '../reducers/root_reducer';

const myConfigureStore = (preloadedState = {}) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState
  });
};

export default myConfigureStore;