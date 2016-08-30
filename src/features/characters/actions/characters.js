import { fetchCharacters } from '../api/Characters';
import ImagePreloader from 'shared/utils/ImagePreloader';


export const RECEIVE_CHARACTERS = 'RECEIVE_CHARACTERS';
//
// // action creator
// export const getCharacters = () => (
//   fetchCharacters()
//     .then(response => {
//     	const { attributionText, data } = response;
//
//   		// Create a preloader and queue each image
//   		const ip = new ImagePreloader()
//   		ip.queue(data.results.map(({ thumbnail }) => (
//   			thumbnail.path + '.' + thumbnail.extension
//   		)));
//
//   		// Call preload and update the state when fulfilled
//   		return Promise.all([response, ip.preload()]);
//     })
//
//     // .then(() => {
//     //   this.setState({
//     //     status: 'LOADED',
//     //     characters: data.results,
//     //     attributionText
//     //   })
//     // })
//
//     .then(response => {
//     	const { attributionText, data } = response[0];
//       return {
//         type: RECEIVE_CHARACTERS,
//         characters: data.results
//       };
//     })
//
//     .catch(console.log)
// );
//




// action creator
export const getCharacters = () => {

  // Load character data
  const characters = fetchCharacters();

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
      return {
        type: RECEIVE_CHARACTERS,
        characters: data.results
      };
    })
    .catch(console.log);

    // .then(() => {
    //   this.setState({
    //     status: 'LOADED',
    //     characters: data.results,
    //     attributionText
    //   })
    // })

};




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
