import {
  FILTER_SELECTED,
  FILTER_INVALIDATED,
  CHARACTERS_REQUEST,
  CHARACTERS_SUCCESS,
  CHARACTERS_FAILURE
} from '../constants';



function selectedFilter(state = '', action) {
  switch (action.type) {
    case FILTER_SELECTED:
      return action.filter;
    default:
      return state;
  };
}

export { selectedFilter };

//
//
// const characters = (state = [], action) => {
//   switch (action.type) {
//     case RECEIVE_CHARACTERS:
//       return action.characters;
//     default:
//       return state;
//   }
// };
//
// export default characters;


function characters(state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
    case FILTER_INVALIDATED:
      return Object.assign({}, state, {
        didInvalidate: true
      });

    case CHARACTERS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });

    case CHARACTERS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.characters,
        lastUpdated: action.receivedAt
      });

    default:
      return state
  }
}

function charactersByFilter(state = {}, action) {
  switch (action.type) {
    case FILTER_INVALIDATED:
    case CHARACTERS_REQUEST:
    case CHARACTERS_SUCCESS:
      return Object.assign({}, state, {
        [action.filter]: characters(state[action.filter], action)
      })
    default:
      return state
  }
}

export { charactersByFilter };
