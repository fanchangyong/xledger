const {
  styleLoader,
  cssLoaderWithoutModules,
  cssLoaderWithModules,
  postcssLoader,
  stylusLoader,
  babelLoader,
} = require('./loaders');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const paths = require('./paths');

module.exports = {
  mode: 'development',
  entry: {
    index: paths.appIndexJs,
  },
  devtool: 'inline-source-map',
  output: {
    path: paths.appBuild,
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: [/\.(js|jsx|mjs)$/],
        include: paths.appSrc,
        use: [babelLoader],
      },
      {
        test: /\.css$/,
        use: [styleLoader, cssLoaderWithoutModules, postcssLoader],
      },
      {
        test: /\.cm\.styl$/,
        use: [styleLoader, cssLoaderWithModules, postcssLoader, stylusLoader],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'XLedger',
      template: paths.appHtml,
    }),
  ],
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': '*',
    },
    contentBase: paths.appPublic,
  },
};
