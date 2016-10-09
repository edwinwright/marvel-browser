import { Schema, arrayOf } from 'normalizr';

const characters = new Schema('characters');
const attributionText = new Schema('attributionText');

characters.define({
  attributionText,
  data: {
    results: arrayOf(characters)
  }
});

// const Schemas = {
//   CHARACTERS,
//   CHARACTERS_ARRAY: arrayOf(CHARACTERS),
// };

export default characters;
