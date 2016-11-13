import merge from 'lodash/merge';

const INITIAL_STATE = {
  characters: {},
};

// Updates an entity cache in response to any action with response.entities.
export const entities = (state = INITIAL_STATE, action) => {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities);
  }
  return state;
};
