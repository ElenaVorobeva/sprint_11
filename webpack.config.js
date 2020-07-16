const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  entry: { main: './src/index.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            "plugins": [
              ["@babel/plugin-proposal-class-properties", { "loose": true }]
            ]
          }
        }
      },

      {
        test: /\.css$/,
        use: [(isDev ? 'style-loader' : MiniCssExtractPlugin.loader),'css-loader', 'postcss-loader']},

      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'file-loader?name=./vendor/[name].[ext]'
          }
        }
      },

      {
        test: /\.(png|jpe?g|gif|svg|webp)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: './images/[name].[ext]'
          }
        }
      },
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.[contenthash].css',
    }),

    new HtmlWebpackPlugin({
      inject: false,
      template: './src/index.html',
      filename: 'index.html'
    }),

    new WebpackMd5Hash(),

    new webpack.DefinePlugin({
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),

    new MiniCssExtractPlugin({
      filename: 'style.[contenthash].css'
    }),

    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
              preset: ['default'],
      },
      canPrint: true
    })
  ]
};