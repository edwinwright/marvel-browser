const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {

  entry: [
    'webpack-hot-middleware/client',
    './src/index',
  ],

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/build/',
  },

  resolve: {
    root: [
      // 'node_modules',
      path.resolve(path.join(__dirname, 'src')),
    ],
    extensions: ['', '.js', '.jsx'],
  },

  devtool: 'eval-cheap-module-source-map',

  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('styles.css', { allChunks: true }),
  ],

  module: {
    loaders: [

      // Load scripts
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'src'),
      },

      { test: /\.json$/, loader: 'json' },

      // Load styles
      {
        test: /\.s?css$/,
        // loader: ExtractTextPlugin.extract('css!sass'),
        loader: ExtractTextPlugin.extract('css?sourceMap!postcss?sourceMap!sass?sourceMap'),
        include: path.join(__dirname, 'src'),
      },


        // ExtractTextPlugin.extract('style','css?sourceMap&modules&importLoaders=1&localI‌​dentName=[name]__[local]___[hash:base64:5]!sass?sourceMap')


      // Load images
      {
        test: /\.(png)$/,
        loader: 'url?name=[path][name].[ext]',
        include: path.join(__dirname, 'src'),
      },

      // Load static files
      {
        test: /\.(html)$/,
        loader: 'file?name=[path][name].[ext]',
        include: path.join(__dirname, 'src'),
      }

    ]
  },

  postcss: [
    autoprefixer({ browsers: ['last 2 versions'] }),
  ],

};
