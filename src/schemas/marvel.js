import { Schema, arrayOf } from 'normalizr';

const options = {
  idAttribute: ({ id, resourceURI }) => {
    return id || resourceURI.substr(resourceURI.lastIndexOf('/') + 1);
  },
};

const character = new Schema('characters', options);
const comic = new Schema('comics', options);
const creator = new Schema('creators', options);
const event = new Schema('events', options);
const series = new Schema('series', options);
const story = new Schema('stories', options);

// character.define({
//   comics: { items: arrayOf(comic) },
//   events: { items: arrayOf(event) },
//   series: { items: arrayOf(series) },
//   stories: { items: arrayOf(story) }
// });
//
// comic.define({
//   characters: { items: arrayOf(character) },
//   creators: { items: arrayOf(creator) },
//   events: { items: arrayOf(event) },
//   stories: { items: arrayOf(story) }
// });
//
// creator.define({
//   comics: { items: arrayOf(comic) },
//   events: { items: arrayOf(event) },
//   series: { items: arrayOf(series) },
//   stories: { items: arrayOf(story) }
// });
//
// event.define({
//   characters: { items: arrayOf(character) },
//   comics: { items: arrayOf(comic) },
//   creators: { items: arrayOf(creator) },
//   series: { items: arrayOf(series) },
//   stories: { items: arrayOf(story) },
// });
//
// series.define({
//   characters: { items: arrayOf(character) },
//   comics: { items: arrayOf(comic) },
//   creators: { items: arrayOf(creator) },
//   events: { items: arrayOf(event) },
//   stories: { items: arrayOf(story) }
// });
//
// story.define({
//   characters: { items: arrayOf(character) },
//   comics: { items: arrayOf(comic) },
//   creators: { items: arrayOf(creator) },
//   events: { items: arrayOf(event) },
//   series: { items: arrayOf(series) },
// });

// Schemas for Marvel API responses.
const schemas = {
  CHARACTERS: {
    data: {
      results: arrayOf(character),
    },
  },
  COMICS: {
    data: {
      results: arrayOf(comic),
    },
  },
  CREATORS: {
    data: {
      results: arrayOf(creator),
    },
  },
  EVENTS: {
    data: {
      results: arrayOf(event),
    },
  },
  SERIES: {
    data: {
      results: arrayOf(series),
    },
  },
  STORIES: {
    data: {
      results: arrayOf(story),
    },
  },
};

export default schemas;
