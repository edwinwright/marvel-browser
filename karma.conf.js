var path = require('path');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config');

// Remove entry point from webpack config object
webpackConfig.entry = {};

// Use inline sourcemaps for better spec reporter errors
webpackConfig.devtool = 'inline-source-map';

// Add isparta coverage loader
// TODO: Check coverage report data for accuracy within ES6 modules and JSX setup.
webpackConfig.module.preLoaders = [
  {
    test: /^(?!.+\.spec\.js$).+\.js$/,
    include: path.join(__dirname, 'src'),
    loader: 'isparta'
  }
];

// Export the module
module.exports = function(config) {
  config.set({

    // Base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // Frameworks to use
    // Available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    // List of files / patterns to load in the browser
    files: [
      // 'node_modules/babel-polyfill/dist/polyfill.js',
      'test/spec-helper.js',
      'test/tests.webpack.js',
    ],

    // List of files to exclude
    exclude: [],

    // Preprocess matching files before serving them to the browser
    // Available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'test/tests.webpack.js': ['webpack', 'sourcemap'],
    },

    // Config for karma-webpack
    webpack: webpackConfig,
    webpackMiddleware: {

      // Enable / disable info displayed to console (only warnings and errors)
      noInfo: false,

      // Configure stats displayed to console
      stats: {

        // Enable / disable chunk stats
        chunks: false,

        // Enable / disable child plugin stats
        children: false
      }

    },

    // Test results reporter to use
    // Possible values: 'dots', 'progress'
    // Available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: [
      'spec',
      'html',
      'coverage',
    ],

    // Reporter config for karma-spec-reporter
    specReporter: {
      maxLogLines: 2,
      suppressErrorSummary: true,
      suppressFailed: false,
      suppressPassed: false,
      suppressSkipped: true,
      showSpecTiming: true
    },

    // Reporter config for karma-html-reporter
    htmlReporter: {
      outputDir: 'reports/unit-tests',
    },

    // Reporter config for karma-coverage
    coverageReporter: {
      includeAllSources: true,
      dir: 'reports/coverage',
      reporters: [
        {type: 'text-summary'},
        {type: 'html'},
      ],
    },

    // Web server port
    port: 9876,

    // Enable colours in the output
    colors: true,

    // Level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // Enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // Start these browsers
    // Available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],

    // Continuous Integration mode
    // If true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // How many browser should be started simultaneous
    concurrency: Infinity,


    // captureTimeout: 60000,
    // browserDisconnectTimeout : 10000,
    // browserDisconnectTolerance : 1,
    // browserNoActivityTimeout : 60000,

  });
};
