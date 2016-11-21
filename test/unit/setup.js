import jsdom from 'jsdom';

// Define some html to be our basic document
// JSDOM will consume this and act as if we were in a browser
const DEFAULT_HTML = '<html><body><div id="app"></div></body></html>';

// Define some variables to make it look like we're a browser
// First, use JSDOM's fake DOM as the document
global.document = jsdom.jsdom(DEFAULT_HTML);

// Set up a mock window
global.window = document.defaultView;

// Allow for things like window.location
global.navigator = {
  userAgent: 'node.js',
};

// Expose window properties in the global scope
const exposedProperties = ['window', 'navigator', 'document'];
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

// Prevent mocha from interpreting CSS @import files. A basic version of...
// https://github.com/bkonkle/ignore-styles/blob/master/ignore-styles.js
function noop() {
  return null;
}

require.extensions['.scss'] = noop;
