"use strict";

const merge = require('webpack-merge');

const PATHS = require('./webpack-paths');
const loaders = rerquire('./webpack-loaders');

const common = {
  entry: {
    app: PATHS.src
  },
  output: {
    path: PATHS.dist,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      loaders.babel,
      loaders.css,
      loaders.font,
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'] // extensions to resolve
  }
};

let config;
// switch defines the different configuration as development rerquires webpack-dev-server
switch(provess.env.NODE_ENV) {
  case 'build':
    config = merge(
      common,
      { devtool: 'source-map' } // SourceMaps on separate file (https://webpack.js.org/configuration/devtool/)
    );
    break;
  case 'development':
    config = merge(
      common,
      { devtool: 'eval-source-map' },
      loaders.devServer({
        host: process.env.host,
        port: 3000
      })
    );
}
module.exports = config;
