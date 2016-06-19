var path = require('path');
var webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

var BASE_DIR = process.cwd();
var COMPONENT_FILE = 'reactee-sidebar';
var COMPONENT_NAME = 'SideBar';

var plugins = [
  new ExtractTextPlugin('style.css', {allChunks: true}),
];

function getPackageMain() {
  return require(path.resolve(BASE_DIR, 'package.json')).main;
}

if (process.env.MINIFY) {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin()
  );
  COMPONENT_FILE += '.min';
}

module.exports = {
  entry: path.resolve(BASE_DIR, getPackageMain()),
  output: {
    filename: path.resolve(BASE_DIR, 'dist/' + COMPONENT_FILE + '.js'),
    library: COMPONENT_NAME,
    libraryTarget: 'umd'
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
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
  plugins: plugins
};
