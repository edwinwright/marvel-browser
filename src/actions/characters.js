import { CALL_API } from '../middleware/api';
import MARVEL_API_KEY from '../config/config';
import schemas from '../schemas/marvel';

export const CHARACTERS_REQUEST = 'CHARACTERS_REQUEST';
export const CHARACTERS_SUCCESS = 'CHARACTERS_SUCCESS';
export const CHARACTERS_FAILURE = 'CHARACTERS_FAILURE';
export const CHARACTER_REQUEST = 'CHARACTER_REQUEST';
export const CHARACTER_SUCCESS = 'CHARACTER_SUCCESS';
export const CHARACTER_FAILURE = 'CHARACTER_FAILURE';


// TODO: move to url utils module
function serialize(obj) {
  return Object.keys(obj).reduce((a, k) => {
    const v = encodeURIComponent(obj[k]);
    a.push(`${k}=${v}`);
    return a;
  }, []).join('&');
}

function addQueryParams(url, params) {
  const string = (/\?/.test(url) ? '&' : '?') + serialize(params);
  return url.replace(/(?=#)|$/, string);
}


const API_ROOT = 'https://gateway.marvel.com/v1/public/characters';
const ITEMS_PER_PAGE = 24;


// Fetches a page of characters.
// Relies on the custom API middleware.
function fetchCharacters(params) {
  const defaults = {
    apikey: MARVEL_API_KEY,
    limit: ITEMS_PER_PAGE,
    offset: 0,
    orderBy: 'name',
  };
  const queryParams = { ...defaults, ...params };
  return {
    key: params.nameStartsWith || '',
    [CALL_API]: {
      types: [CHARACTERS_REQUEST, CHARACTERS_SUCCESS, CHARACTERS_FAILURE],
      endpoint: addQueryParams(API_ROOT, queryParams),
      options: {
        method: 'GET',
      },
      schema: schemas.CHARACTERS,
    },
  };
}

/**
 * An action creator that fetches a page of characters for the given search
 * term. Exits if the results have already been fetched and cached, or if there
 * are no more results to return.
 *
 * @param  {string} nameStartsWith  - Filters characters whose name starts with this string
 * @param  {boolean} nextPage       - Fetches the next page of results if true
 * @return {function}               - A redux thunk
 */
export function loadCharacters(nameStartsWith = '', nextPage) {
  return (dispatch, getState) => {
    // Get cached pagination data for the query
    const pagination = getState().pagination.charactersByTerm[nameStartsWith] || {};
    const { total = 0, pageCount = 0 } = pagination;

    // Exit if we have already cached the results and are not requesting the next page
    if (pageCount > 0 && !nextPage) return null;

    // Exit if we have loaded all results
    if (pageCount > 0 && pageCount * ITEMS_PER_PAGE >= total) return null;

    // Define query params
    const queryParams = {
      offset: pageCount * ITEMS_PER_PAGE,
    };
    if (nameStartsWith.length) {
      queryParams.nameStartsWith = nameStartsWith;
    }

    // Dispatch the action
    return dispatch(fetchCharacters(queryParams));
  };
}


// Fetches a single character from the Marvel API.
// Relies on api middleware to to send the API call.
function fetchCharacter(id) {
  const endpoint = `${API_ROOT}/${id}`;
  const queryParams = {
    apikey: MARVEL_API_KEY,
  };

  return {
    [CALL_API]: {
      types: [CHARACTER_REQUEST, CHARACTER_SUCCESS, CHARACTER_FAILURE],
      endpoint: addQueryParams(endpoint, queryParams),
      options: {
        method: 'GET',
      },
      schema: schemas.CHARACTERS,
    },
  };
}

/**
 * An action creator that fetches a character for the given id. Exits if the
 * result has already been fetched and cached..
 *
 * @param  {number} id  - The character id
 * @return {function}   - A redux thunk
 */
export function loadCharacter(id) {
  return (dispatch, getState) => {
    // Get cached data for the query
    const character = getState().entities.characters[id];

    // Exit if we have already cached the results
    if (!character) return null;

    // Dispatch the action
    return dispatch(fetchCharacter(id));
  };
}
