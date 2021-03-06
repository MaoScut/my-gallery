const path = require('path');
const webpack = require('webpack');

const ROOT_PATH = path.resolve(__dirname);
const BUILD_PATH = path.resolve(ROOT_PATH, 'build');

module.exports = {
  entry: [
    'react-hot-loader/patch',
    './src/index.jsx',
  ],
  output: {
    path: BUILD_PATH,
    filename: 'bundle.js',
  },

  devtool: 'cheap-module-eval-source-map',
  devServer: {
    historyApiFallback: true,
    inline: true,
    contentBase: './build',
  },

  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      loader: ['babel-loader'],
    },
    {
      test: /\.scss$/,
      loader: ['style-loader', 'css-loader', 'sass-loader'],
    }],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
  ],
};
