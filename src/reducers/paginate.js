import union from 'lodash/union'

// Initial state
const INITIAL_STATE = {
  isFetching: false,
  total: 0,
  pageCount: 0,
  ids: []
};

// Creates a reducer managing pagination, given the action types to handle,
// and a function telling how to extract the key from an action.
const paginate = ({ types, mapActionToKey }) => {

  // Validate params
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected types to be an array of three elements.')
  }
  if (!types.every(t => typeof t === 'string')) {
    throw new Error('Expected types to be strings.')
  }
  if (typeof mapActionToKey !== 'function') {
    throw new Error('Expected mapActionToKey to be a function.')
  }

  // Extract action types
  const [ requestType, successType, failureType ] = types;

  const updatePagination = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case requestType:
        return {
          ...state,
          isFetching: true
        }
      case successType:
        return {
          ...state,
          isFetching: false,
          total: action.response.result.data.total,
          pageCount: state.pageCount + 1,
          ids: union(state.ids, action.response.result.data.results),
        }
      case failureType:
        return {
          ...state,
          isFetching: false
        }
      default:
        return state
    }
  }

  return (state = {}, action) => {
    // Update pagination by key
    switch (action.type) {
      case requestType:
      case successType:
      case failureType:
        const key = mapActionToKey(action)
        if (typeof key !== 'string') {
          throw new Error('Expected key to be a string.')
        }
        return {
          ...state,
          [key]: updatePagination(state[key], action)
        }
      default:
        return state
    }
  }
}

export default paginate