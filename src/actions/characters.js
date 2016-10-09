import { CALL_API } from '../middleware/api';
import { MARVEL_API_KEY } from '../config/config';
import Schemas from '../schemas';


// TODO: move to url utils module
function serialize(obj) {
  return Object.keys(obj).reduce((a, k) => {
    a.push(k + '=' + encodeURIComponent(obj[k]));
    return a;
  }, []).join('&');
};

function addQueryParameters(url, params) {
  params = (/\?/.test(url) ? '&' : '?') + serialize(params);
  return url.replace(/(?=#)|$/, params);
}


const API_ROOT = 'https://gateway.marvel.com/v1/public/characters';

export const CHARACTERS_REQUEST = 'CHARACTERS_REQUEST';
export const CHARACTERS_SUCCESS = 'CHARACTERS_SUCCESS';
export const CHARACTERS_FAILURE = 'CHARACTERS_FAILURE';

export const fetchCharacters = (nameStartsWith = '') => {
  const queryParams = {
    apikey: MARVEL_API_KEY,
    limit: 24,
    offset: 0,
    orderBy: 'name'
  };

  return {
    [CALL_API]: {
      types: [CHARACTERS_REQUEST, CHARACTERS_SUCCESS, CHARACTERS_FAILURE],
      endpoint: addQueryParameters(API_ROOT, queryParams),
      options: {
        method: 'GET',
      },
    }
  }
};

export const CHARACTER_REQUEST = 'CHARACTER_REQUEST';
export const CHARACTER_SUCCESS = 'CHARACTER_SUCCESS';
export const CHARACTER_FAILURE = 'CHARACTER_FAILURE';

export const fetchCharacter = (characterId) => {
  const endpoint = `${API_ROOT}/${characterId}`;
  const queryParams = {
    apikey: MARVEL_API_KEY
  };

  return {
    [CALL_API]: {
      types: [CHARACTER_REQUEST, CHARACTER_SUCCESS, CHARACTER_FAILURE],
      endpoint: addQueryParameters(endpoint, queryParams),
      options: {
        method: 'GET',
      },
    }
  }
};
