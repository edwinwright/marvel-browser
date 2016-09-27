import { combineReducers } from 'redux';
import * as characters from '../reducers/characters';

const rootReducer = combineReducers({
  ...characters
});

// console.log(...characters);

export default rootReducer;
