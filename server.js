#!/usr/bin/env node

/*
 * Webpack Hot Reload Server
 * https://github.com/gaearon/react-transform-boilerplate
 */

var path = require('path');
var express = require('express');
var webpack = require('webpack');

var host = '0.0.0.0';
var port = 3000;

var config = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './src/index'
  ],
  output: {
    path: __dirname,
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['react-hmre']
        }
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css', 'postcss']
      },
      {
        test: /\.less$/,
        loaders: ['style', 'css', 'postcss', 'less']
      }
    ]
  }
};

var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, host, function(err) {
  if (err) {
    console.log(err.stack);
    return;
  }

  console.log('Listening at http://' + [host, port].join(':'));
});
