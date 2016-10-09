import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import * as characters from '../reducers/characters';

const rootReducer = combineReducers({
  ...characters,
  routing
});

export default rootReducer;
