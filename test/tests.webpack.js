/**
 * Includes all files needed to run tests through karma and webpack.
 *
 * This method allows you to have one entry point in karma so that webpack only
 * runs once instead of once per spec file. It is much more performant.
 *
 * By including both test files and test source files, the coverage reporter will
 * add pages for components that have no tests yet. If your project is setup so that
 * tests are in a different directory to the source files (ie ./src and ./test) then
 * you'll need to have to have a context for each directory.
 */

// NOTES: If only spec files are loaded then tests run much quicker.
//        Plus no need to filter out entry point.
//        All files loaded is about 12x slower.
//        However you don't get the coverage reports for untested files.
// var context = require.context('./src', true, /\.spec.js$/);

// Create a context (dynamic require)
// https://webpack.github.io/docs/context.html
var context = require.context('../src', true, /\.js$/);

// Require all files excluding any entrypoints
// Creates a require(...) entry for each file while excluding certain files
var exclude = ['./index.js'];
context.keys().forEach(function (key) {
  if (exclude.indexOf(key) === -1) {
    context(key);
  }
});

// Require all files
// Creates a require(...) entry for each file in the context
// context.keys().forEach(context);
