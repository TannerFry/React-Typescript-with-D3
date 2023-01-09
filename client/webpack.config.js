var path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const ESLintPlugin = require('eslint-webpack-plugin');

var config = {
  devtool: "eval-source-map",
  mode: "development",
  /*
   * app.ts represents the entry point to your web application. Webpack will
   * recursively go through every "require" statement in app.ts and
   * efficiently build out the application's dependency tree.
   */
  entry: [
    "./src/app.tsx"
  ],

  /*
   * The combination of path and filename tells Webpack what name to give to
   * the final bundled JavaScript file and where to store this file.
   */
  output: {
    path: path.resolve(__dirname, "dist/bundle"),
    filename: "[name].[chunkhash].js"
  },

  /*
   * resolve lets Webpack now in advance what file extensions you plan on
   * "require"ing into the web application, and allows you to drop them
   * in your code.
   */
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".svg"]
  },

  module: {
    rules: [
      // Process Typescript
      {
        enforce: 'pre',
        test: /\.tsx?$/,
        use: ["source-map-loader", "ts-loader"],
        exclude: /node_modules/
      },

      // Process image files
      {
        test: /\.(png|jpg|gif)$/,
        use: ["url-loader"]
      },

      // Process SASS
      {
        test: /\.s?css$/,
        use: ["style-loader", "css-loader", "resolve-url-loader", "sass-loader"]
      }
    ]
  },

  plugins: [
    new ESLintPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      inject: false,
      template: './src/index.ejs',
      filename: '../../index.html'
    })
  ]
};

module.exports = config;
