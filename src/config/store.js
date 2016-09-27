import { createStore, applyMiddleware } from 'redux';
import rootRreducer from './reducer';
import ReduxThunk from 'redux-thunk';
import ReduxPromise from 'redux-promise';
import createLogger from 'redux-logger';

const middlewares = [
   ReduxThunk,
   ReduxPromise,
   createLogger()
];

const configureStore = () => {
  return createStore(
    rootRreducer,
    applyMiddleware(...middlewares)
  )
};

export default configureStore;
