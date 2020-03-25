const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackRootPlugin = require('html-webpack-root-plugin');
const HtmlWebpackTemplate = require("html-webpack-template");
const path = require("path");

const config = {
  entry: "./src/app.jsx",
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "bundle.js"
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
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  plugins: [
    new HTMLWebpackPlugin(),
  ]
};

module.exports = config;
