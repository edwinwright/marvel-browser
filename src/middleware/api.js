import 'isomorphic-fetch';

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = Symbol('Call API');

/*
 * Fetches an API response and normalizes the result JSON according to schema.
 * This makes every API response have the same shape, regardless of how nested it was.
 * Read more about Normalizr: https://github.com/gaearon/normalizr
 */

const callApi = (endpoint, options = {}) => (
  fetch(endpoint, options)
    .then(response =>
      response.json().then(json => ({ json, response }))
    )
    .then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject({ json, response });
      }
      return Object.assign({}, json);
    })
);

/*
 * A Redux middleware that interprets actions with CALL_API info specified.
 * Performs the call and promises when such actions are dispatched.
 */
export default store => next => action => {
  const callAPI = action[CALL_API];

  if (typeof callAPI === 'undefined') { return next(action); }

  const { types, options } = callAPI;
  let { endpoint } = callAPI;

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState());
  }
  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.');
  }

  function actionWith(data) {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  }

  // dispatch requestType action with endpoint parameter for currentCall
  const [ requestType, successType, failureType ] = types;
  next(actionWith({ type: requestType, endpoint }));

  return callApi(endpoint, options).then(
    response => {
      return next(actionWith({
        response,
        type: successType
      }));
    },
    error => {
      return next(actionWith({
        type: failureType,
        error: error.message || 'Something bad happened'
      }));
    }
  );
};
