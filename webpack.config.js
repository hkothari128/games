const webpack = require("webpack");
// const HTMLWebpackPlugin = require("html-webpack-plugin");
// const HtmlWebpackRootPlugin = require('html-webpack-root-plugin');
// const HtmlWebpackTemplate = require("html-webpack-template");
const path = require("path");

const config = {
  entry: ["web-animations-js","./src/app.jsx"],
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "bundle.js",
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node-modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(scss)$/,
        exclude: /node-modules/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: "sass-loader",
          },
        ],
      },
      {
        test: /\.(PNG|jpg)$/,
        exclude: /node-modules/,
        use: {
          loader: "url-loader",
        },
      },
    ]
  },
  devServer: {
    historyApiFallback: {
      index:'index.html'
    },
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
};

module.exports = config;
