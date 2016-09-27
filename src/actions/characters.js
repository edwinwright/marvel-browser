import api from '../services/api/Characters';
import ImagePreloader from '../services/utils/ImagePreloader';

export function selectFilter(filter) {
  return {
    type: FILTER_SELECTED,
    filter
  }
}

export function requestCharacters(query) {
  return {
    type: CHARACTERS_REQUEST,
    query
  }
}


export function receiveCharacters(query, characters) {
  return {
    type: CHARACTERS_SUCCESS,
    query,
    characters,
    receivedAt: Date.now()
  }
}



export function getCharacters(query) {

  return function(dispatch) {

    dispatch(requestCharacters(query));

    // Load character data
    const characters = api.fetchCharacters();

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
        dispatch(receiveCharacters(query, data.results))
        // TODO: dispatch(receiveAttributionText(attributionText))
      })
      .catch(console.log);

  }
}




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

//
//
// // action creator
// export function getCharacters() {
//
//   // Load character data
//   const characters = api.fetchCharacters();
//
//   // Create a preloader and queue each image
//   const images = characters.then(({ data }) => {
// 		const ip = new ImagePreloader()
// 		ip.queue(data.results.map(({ thumbnail }) => (
// 			thumbnail.path + '.' + thumbnail.extension
// 		)));
//     return ip.preload();
//   });
//
//   return Promise.all([characters, images])
//     .then(response => {
//     	const { attributionText, data } = response[0];
//       return {
//         type: RECEIVE_CHARACTERS,
//         characters: data.results
//       };
//     })
//     .catch(console.log);
//
//     // .then(() => {
//     //   this.setState({
//     //     status: 'LOADED',
//     //     characters: data.results,
//     //     attributionText
//     //   })
//     // })
//
// };
