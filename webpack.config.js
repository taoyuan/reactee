var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

var EXAMPLES_DIR = path.resolve(process.cwd(), 'examples');

function buildEntries() {
  return fs.readdirSync(EXAMPLES_DIR).reduce(function (entries, dir) {
    if (dir === 'build') {
      return entries;
    }

    var isDraft = dir.charAt(0) === '_';
    var isDirectory = fs.lstatSync(path.join(EXAMPLES_DIR, dir)).isDirectory();

    if (!isDraft && isDirectory) {
      entries[dir] = path.join(EXAMPLES_DIR, dir, 'app.js');
    }

    return entries;
  }, {});
}

module.exports = {

  entry: buildEntries(),

  output: {
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    path: 'examples/__build__',
    publicPath: '/__build__/'
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.less', '.css'],
    packageMains: ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'main', 'style']
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.global\.(css|less)$/,
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss!less?sourceMap')
      },

      {
        test: /^((?!\.global).)*\.(css|less)$/,
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!less?sourceMap')
      },
      {
        test: /\.(png|jpg|gif|woff|woff2)$/,
        loader: 'url-loader?limit=8192'
      },
      {
        test: /\.(mp4|ogg|svg)$/,
        loader: 'file-loader'
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin('style.css', {allChunks: true}),
    new webpack.optimize.CommonsChunkPlugin('shared.js')
  ]

};
