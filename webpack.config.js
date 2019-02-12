const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
   entry: "./src/main.js",
   output: {
      path: path.resolve(__dirname, 'public_html/js'),
      filename: "bundle.js"
   },
   devServer: {
      contentBase: path.resolve(__dirname, "public_html"),
      publicPath: '/js/',
      watchContentBase: true
   },
   module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
                url: false
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
          }
        ]
      }
    ]
  },
   devtool: "source-map",
};

