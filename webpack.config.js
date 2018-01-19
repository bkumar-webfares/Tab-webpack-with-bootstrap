var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');
var isProd = process.env.NODE_ENV === 'production';
var cssDev = ['style-loader', 'css-loader', 'sass-loader'];
var cssProd = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: ['css-loader', 'sass-loader'],
})

var cssConfig = isProd ? cssProd : cssDev;

module.exports = {
  entry: {
    app: './src/app.js',
  },    
  output: {
      path: path.resolve(__dirname, 'dist'),
      filename: './js/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: cssProd
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i, 
        use:[
          'file-loader?name=img/[name].[ext]',
          // 'file-loader?name=[name].[ext]&outputPath=img/&publicPath=/img',
        ]
      },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?name=fonts/[name].[ext]&limit=10000&mimetype=application/font-woff"},
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader?name=fonts/[name].[ext]"},
    ]
  },
  devServer: {
      contentBase: path.join(__dirname, "dist"),
      compress: true,
      stats: 'errors-only'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack App Demo',
      minify: {
          collapseWhitespace:true,
      },
      hash:true,
      template: './src/index.html',
    }),
    new ExtractTextPlugin("styles.css")
  ]
}