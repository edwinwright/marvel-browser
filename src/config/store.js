import { createStore, applyMiddleware } from 'redux';
import rootReducer from './rootReducer';
import ReduxThunk from 'redux-thunk';
import ReduxPromise from 'redux-promise';
import createLogger from 'redux-logger';

const enhancer = applyMiddleware(
  ReduxThunk,
  ReduxPromise,
  createLogger()
);

const configureStore = () => {
  return createStore(rootReducer, enhancer);
};

export default configureStore;
