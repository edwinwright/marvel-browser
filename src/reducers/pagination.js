import { combineReducers } from 'redux';
import paginate from './paginate';
import * as actionTypes from '../actions/characters';

// Updates the pagination data for different actions.
const pagination = combineReducers({
  charactersByTerm: paginate({
    mapActionToKey: action => action.key,
    types: [
      actionTypes.CHARACTERS_REQUEST,
      actionTypes.CHARACTERS_SUCCESS,
      actionTypes.CHARACTERS_FAILURE,
    ],
  }),
});

export default pagination;
