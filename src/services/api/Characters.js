import { getJSON } from '../utils/XHR';
import { MARVEL_API_KEY } from 'config/config';

const ROOT_URL = 'https://gateway.marvel.com/v1/public/characters';

const defaultParams = {
  apikey: MARVEL_API_KEY,
  limit: 100
  // orderBy: 'name'
}

function addParamsToUrl(url, params) {
  params = (/\?/.test(url) ? '&' : '?') + serialize(params);
  return url.replace(/(?=#)|$/, params);
}

function serialize(obj) {
  return Object.keys(obj).reduce((a, k) => {
    a.push(k + '=' + encodeURIComponent(obj[k]));
    return a;
  }, []).join('&');
};

export const fetchCharacters = (params) => {
  const url = addParamsToUrl(ROOT_URL, {
    ...defaultParams,
    ...params
  });
  return getJSON(url);
}

export const fetchCharacter = (id) => {
  let url = ROOT_URL + '/' + id;
  url = addParamsToUrl(url, defaultParams);
  return getJSON(url);
}
