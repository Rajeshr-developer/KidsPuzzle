const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
  const isDev = argv.mode !== 'production';

  return {
    entry: path.resolve(__dirname, 'index.web.js'),
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
      publicPath: isDev ? '/' : '/',
      clean: true,
    },
    resolve: {
      alias: {
        'react-native$': 'react-native-web',
        'react-native-sound': path.resolve(__dirname, 'web/shims/react-native-sound.js'),
      },
      extensions: ['.web.tsx', '.web.ts', '.web.js', '.tsx', '.ts', '.js', '.json'],
    },
    module: {
      rules: [
        {
          test: /\.[jt]sx?$/,
          // Transpile packages that ship TypeScript/JSX in node_modules (e.g. react-native-draggable)
          exclude: /node_modules\/(?!react-native-draggable\/)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', {targets: 'defaults'}],
                ['@babel/preset-react', {runtime: 'automatic'}],
                '@babel/preset-typescript',
              ],
            },
          },
        },
        {
          test: /\.(png|jpe?g|gif|svg|mp3|wav)$/i,
          type: 'asset/resource',
        },
      ],
    },
    plugins: [
      // Metro injects this global; react-native internals expect it when pulled into the web bundle.
      new webpack.DefinePlugin({
        __DEV__: JSON.stringify(isDev),
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'web/index.html'),
      }),
    ],
    devServer: {
      static: {
        directory: path.resolve(__dirname, 'public'),
        watch: true,
      },
      historyApiFallback: true,
      host: '0.0.0.0',
      hot: true,
      open: false,
    },
    performance: {
      hints: false,
    },
  };
};
