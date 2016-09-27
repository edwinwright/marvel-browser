import { combineReducers } from 'redux';
import * as characters from '../features/characters';

const reducer = combineReducers({
  ...characters
});

// console.log(...characters);

export default reducer;
