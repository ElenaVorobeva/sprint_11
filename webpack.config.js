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
        use: [(isDev ? 'style-loader' : MiniCssExtractPlugin.loader),
        {
          loader:'css-loader',
          options: {
            importLoaders: 2
          }
        }, 'postcss-loader'
              ]},

      {
        test: /\.(eot|ttf|woff|woff2)$/i,
        use: 'file-loader?name=./vendor/fonts/[name].[ext]&esModule=false'
      },

      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader?name=./images/[name].[ext]&esModule=false',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
              disable: true,
            },
          },
        ],
      }
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
    }),

    new webpack.DefinePlugin({
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
};