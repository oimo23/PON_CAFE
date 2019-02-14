const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: false,
            }
          },
          {
            loader: 'sass-loader'
          }
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
  plugins: [
    new MiniCssExtractPlugin({
      filename: '../css/style.css'
    })
  ],
  devtool: "source-map",
};

