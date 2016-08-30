import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';

const middlewares = [
   thunk,
   promise,
   createLogger()
];

const configureStore = () => {
  return createStore(
    reducer,
    applyMiddleware(...middlewares)
  )
};

export default configureStore;
