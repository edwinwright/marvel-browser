import * as api from '../services/api/characters';
import ImagePreloader from '../services/utils/ImagePreloader';
import {
  FILTER_SELECTED,
  FILTER_INVALIDATED,
  CHARACTERS_REQUEST,
  CHARACTERS_SUCCESS,
  CHARACTERS_FAILURE
} from './constants';


export function fetchCharacters(term) {
  return function(dispatch) {
    const params = term ? { nameStartsWith: term } : {};
    const characters = api.fetchCharacters(params);
    dispatch(charactersRequest());

    // Create a preloader and queue each image
    const images = characters.then(({ data }) => {
  		const ip = new ImagePreloader()
  		ip.queue(data.results.map(({ thumbnail }) => (
  			thumbnail.path + '.' + thumbnail.extension
  		)));
      return ip.preload();
    });

    return Promise.all([characters, images])
      .then(response => {
        const { attributionText, data } = response[0];
        dispatch(charactersSuccess(term, data.results));
        // TODO: dispatch(receiveAttributionText(attributionText))
      })
      .catch(error => {
        dispatch(charactersFailure(error))
      });
  };
}

function charactersRequest() {
  return {
    type: CHARACTERS_REQUEST
  }
}

function charactersSuccess(term, characters) {
  return {
    type: CHARACTERS_SUCCESS,
    term,
    characters,
    receivedAt: Date.now()
  }
}

function charactersFailure(error) {
  return {
    type: CHARACTERS_FAILURE,
    error
  }
}


//
// export function getCharacters(query) {
//
//   return function(dispatch) {
//
//   }
// }




// https://github.com/reactjs/redux/issues/99

// export function doSomethingAsync() {
//   return (dispatch) => {
//     dispatch({ type: SOMETHING_STARTED });
//
//     return requestSomething().then(
//       (result) =>  dispatch({ type: SOMETHING_COMPLETED, result }),
//       (error) =>  dispatch({ type: SOMETHING_FAILED, error })
//     );
//   };
// }
