const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  output: {
    // This should be different from production mode to prevent that production bundle.js is loaded.
    // index.html is also stored in here.
    path: path.resolve(__dirname, "dist-dev/"),
    // publicPath will be used inside 'index.html' to load bundle.js from here
    publicPath: "/",
    filename: "bundle.js"
  },
  devServer: {
    contentBase: "./dist-dev", // Content not from webpack is served from
    publicPath: "/", // webpack output is served from here
    hot: true,
    host: '0.0.0.0',
    port: 3100,
    disableHostCheck: true,
//    hotOnly: true // This doesn't work for now.
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Hot Module Replacement',
      template: "./public/index.html",
      filename: "./index.html",
      alwaysWriteToDisk: true,
    }),
    new HtmlWebpackHarddiskPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new Dotenv({
      safe: 'dotenv.example', // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
      systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
      defaults: false // load '.env.defaults' as the default values if empty.
    }),
    new FaviconsWebpackPlugin({
      logo: './public/logo.png',
      publicPath: "/",
      prefix: "assets/",
      inject: 'force',
    }),
  ]
});
