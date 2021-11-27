const path = require("path");

const { DefinePlugin } = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

const isProduction = process.env.NODE_ENV === "production";

const stylesHandler = "style-loader";

const config = {
  context: path.resolve(__dirname),
  entry: {
    index: "./src/index.tsx",
    vendor: ["babel-polyfill", "react", "react-dom", "react-redux", "@reduxjs/toolkit"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
    clean: true,
  },
  optimization: {
    runtimeChunk: "single",
  },
  devServer: {
    open: true,
    hot: true,
    liveReload: true,
    host: "localhost",
    static: {
      directory: path.join(__dirname, "dist"),
    },
  },
  plugins: [
    new DefinePlugin({
      "process.env.API_KEY": JSON.stringify(process.env.API_KEY),
    }),
    new HtmlWebpackPlugin({
      template: "public/index.html",
      filename: "index.html",
      inject: "head",
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: "public", to: "./", filter: (res) => !res.includes("html") }],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "ts-loader",
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [stylesHandler, "css-loader", "sass-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    plugins: [new TsconfigPathsPlugin()],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};
