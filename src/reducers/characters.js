import { normalize } from 'normalizr';
import { camelizeKeys } from 'humps';
import {
  CHARACTERS_REQUEST,
  CHARACTERS_SUCCESS,
  CHARACTERS_FAILURE
} from '../actions/characters';

const INITIAL_STATE = {
  all: null,
  character: null,
  isFetching: false
};

const characters = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CHARACTERS_REQUEST:
    return { ...state, isFetching: true };
  case CHARACTERS_FAILURE:
    return { ...state, isFetching: false };
  case CHARACTERS_SUCCESS:
    return {
      ...state,
      isFetching: false,
      all: [ ...action.response.data.results ]
    };
  }
  return state;
};

export { characters };







//
//
// function characters(state = {
//   isFetching: false,
//   didInvalidate: false,
//   items: []
// }, action) {
//   switch (action.type) {
//     case FILTER_INVALIDATED:
//       return Object.assign({}, state, {
//         didInvalidate: true
//       });
//
//     case CHARACTERS_REQUEST:
//       return Object.assign({}, state, {
//         isFetching: true,
//         didInvalidate: false
//       });
//
//     case CHARACTERS_SUCCESS:
//       return Object.assign({}, state, {
//         isFetching: false,
//         didInvalidate: false,
//         items: action.characters,
//         lastUpdated: action.receivedAt
//       });
//
//     default:
//       return state
//   }
// }
//
// function charactersByTerm(state = {}, action) {
//   switch (action.type) {
//     case FILTER_INVALIDATED:
//     case CHARACTERS_REQUEST:
//     case CHARACTERS_SUCCESS:
//       return Object.assign({}, state, {
//         [action.filter]: characters(state[action.filter], action)
//       })
//     default:
//       return state
//   }
// }
//
// export {
//   characters,
//   charactersByTerm
// };
