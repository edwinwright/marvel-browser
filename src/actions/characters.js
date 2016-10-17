import { CALL_API } from '../middleware/api';
import { MARVEL_API_KEY } from '../config/config';
import schemas from '../schemas/marvel';

export const CHARACTERS_REQUEST = 'CHARACTERS_REQUEST';
export const CHARACTERS_SUCCESS = 'CHARACTERS_SUCCESS';
export const CHARACTERS_FAILURE = 'CHARACTERS_FAILURE';
export const CHARACTER_REQUEST  = 'CHARACTER_REQUEST';
export const CHARACTER_SUCCESS  = 'CHARACTER_SUCCESS';
export const CHARACTER_FAILURE  = 'CHARACTER_FAILURE';

// TODO: move to url utils module
function serialize(obj) {
  return Object.keys(obj).reduce((a, k) => {
    a.push(k + '=' + encodeURIComponent(obj[k]));
    return a;
  }, []).join('&');
};

function addQueryParams(url, params) {
  params = (/\?/.test(url) ? '&' : '?') + serialize(params);
  return url.replace(/(?=#)|$/, params);
}


const API_ROOT = 'https://gateway.marvel.com/v1/public/characters';
const ITEMS_PER_PAGE = 24;


// Fetches a page of characters.
// Relies on the custom API middleware.
const fetchCharacters = (params) => {
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
    }
  };
};

// Fetches a page of characters.
// Bails out if page is cached and user didn't specifically request next page.
// Relies on Redux Thunk middleware.


/**
 * [loadCharacters description]
 * @param  {string} term - The search term
 * @param  {boolean} nextPage -
 * @return {function} - A redux thunk.
 */
function loadCharacters(term, nextPage) {
  return (dispatch, getState) => {

    // Get cached pagination data for the query
    const pagination = getState().pagination.charactersByTerm[term] || {};
    const { total = 0, pageCount = 0 } = pagination;

    // Exit if we already have cached results and are not requesting the next page
    if (pageCount > 0 && !nextPage) {
      return null;
    }

    // Exit if we have loaded all results
    if (pageCount > 0 && pageCount * ITEMS_PER_PAGE >= total) {
      return null;
    }

    // Define query params
    const queryParams = {
      offset: pageCount * ITEMS_PER_PAGE
    }
    if (term && term.length) {
      queryParams.nameStartsWith = term;
    }

    // Dispatch the action
    return dispatch(fetchCharacters(queryParams));
  };
};

export { loadCharacters };


// Fetches a single character from the Marvel API.
// Relies on api middleware to to send the API call.
export const fetchCharacter = (id) => {
  const endpoint = `${API_ROOT}/${id}`;
  const queryParams = {
    apikey: MARVEL_API_KEY
  };

  return {
    [CALL_API]: {
      types: [CHARACTER_REQUEST, CHARACTER_SUCCESS, CHARACTER_FAILURE],
      endpoint: addQueryParams(endpoint, queryParams),
      options: {
        method: 'GET',
      },
      schema: schemas.CHARACTERS,
    }
  }
};

export const loadCharacter = (id) => {
  return (dispatch, getState) => {
    const character = getState().entities.characters[id];
    if (!character) {
      return null;
    }
    dispatch(fetchCharacter(id));
  }
}
