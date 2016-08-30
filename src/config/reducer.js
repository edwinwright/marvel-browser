import { combineReducers } from 'redux';
import { reducers as characters } from '../features/characters';

const reducer = combineReducers({
  ...characters
});

export default reducer;
