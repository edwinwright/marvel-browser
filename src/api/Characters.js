import { getJSON } from 'shared/utils/XHR';
import { MARVEL_PUBLIC_KEY } from 'config/config';

const BASE_URL = 'https://gateway.marvel.com/v1/public/characters';

const defaultParams = {
  apikey: MARVEL_PUBLIC_KEY,
  orderBy: 'name'
}

const addParamsToUrl = (url, params) => {
  params = (/\?/.test(url) ? '&' : '?') + serialize(params);
  return url.replace(/(?=#)|$/, params);
};

const serialize = obj => {
  return Object.keys(obj).reduce((a, k) => {
    a.push(k + '=' + encodeURIComponent(obj[k]));
    return a;
  }, []).join('&');
};

export const getCharacters = (params) => {
  const url = addParamsToUrl(BASE_URL, {
    ...defaultParams,
    ...params
  });
  return getJSON(url);
}
