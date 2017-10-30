const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
  entry:["./src/entry.js","./sass/styles.scss"],
  output: {
      path:  __dirname + "/dist/",
      filename: "js/bundle.js"
  },
  module: {
      rules: [
          {
            test: /\.scss$/,
            /*
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "sass-loader" // compiles Sass to CSS
            }]*/
            loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader']),
            exclude: /node_modules/,
          },
          {
            test: /\.css$/,
            loader: "style-loader!css-loader",
            exclude: /node_modules/,
          },
          {
            test: /\.js$/,
            loader: 'babel-loader',
            query:
            {
              presets:['react']
            },
            exclude: /node_modules/,
          },
          {
            test: /\.jsx$/,
            loader: 'babel-loader',
            exclude: /node_modules/
          },
      ]
  },
  plugins: [
    new ExtractTextPlugin({ // define where to save the file
      filename: 'css/styles.bundle.css',
      allChunks: true,
    }),
  ],
};

module.exports = config;
