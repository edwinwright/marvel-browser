import { combineReducers } from 'redux';
import paginate from './paginate';
import * as ActionTypes from '../actions/characters';

// Updates the pagination data for different actions.
const pagination = combineReducers({
  charactersByTerm: paginate({
    mapActionToKey: action => action.key,
    types: [
      ActionTypes.CHARACTERS_REQUEST,
      ActionTypes.CHARACTERS_SUCCESS,
      ActionTypes.CHARACTERS_FAILURE,
    ],
  }),
});

export { pagination };
