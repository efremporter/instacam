import { createStore, applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import thunk from 'redux-thunk'
import rootReducer from '../reducers/root_reducer';

const myconfigureStore = (preloadedState = {}) => {
  return configureStore({ reducer: rootReducer, middleware: [thunk, logger], preloadedState});
};

export default myconfigureStore;