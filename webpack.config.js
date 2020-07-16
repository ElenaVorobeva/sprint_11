const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // добавили плагин
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
        use:  [MiniCssExtractPlugin.loader,
                {
                  loader: 'css-loader', options: { importLoaders: 2 }
                },
                  'postcss-loader'
              ]
      },
      {
        test: /\.(woff2)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: './fonts/[name].[ext]'
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
      }


      // {
      //   test: /\.(png|jpe?g|gif)$/i,
      //   loader: 'file-loader',
      //   options: {
      //     name(resourcePath, resourceQuery) {
      //       if (process.env.NODE_ENV === 'development') {
      //         return '[path][name].[ext]';
      //       }

      //       return '[contenthash].[ext]';
      //     },
      //   },
      // }
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
    new WebpackMd5Hash()
  ]
};