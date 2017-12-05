var HtmlWebpackPlugin = require('html-webpack-plugin');
var bootstrapEntryPoints = require('./webpack.bootstrap.config');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');
var bootstrapEntryPoints = require('./webpack.bootstrap.config');
var isProd = process.env.NODE_ENV === 'production';
var cssDev = ['style-loader', 'css-loader?sourceMap', 'sass-loader'];
var cssProd = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: ['css-loader', 'sass-loader']
})

var cssConfig = isProd ? cssProd : cssDev;

var bootstrapConfig = isProd ? bootstrapEntryPoints.prod : bootstrapEntryPoints.dev;

module.exports = {
    entry: {
      app: './src/app.js',
      bootstrap: bootstrapConfig
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: './js/[name].js'
    },
    
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use:[
            {loader: 'css-loader?name=css/[name].[ext]',options:{sourceMap: true}},
            {loader: 'sass-loader?name=css/[name].[ext]',options:{sourceMap: true}}
          ]
          })
        },
        {
            test: /\.(gif|png|jpe?g|svg)$/i, 
            use:[
                'file-loader?name=img/[name].[ext]',                
                // 'file-loader?name=[name].[ext]&outputPath=img/&publicPath=/img',
                'image-webpack-loader'
            ]
        },
        { test: /\.(woff2?|svg)$/, loader: 'url-loader?limit=10000&name=fonts/[name].[ext]' },
        { test: /\.(ttf|eot)$/, loader: 'file-loader?name=fonts/[name].[]' },
        //bootstrap 3
        { test:/bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/, loader: 'imports-loader?jQuery=jquery?name=js/[name].[ext]' }
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
        // minify: {
        //     collapseWhitespace:true,
        // },
        hash:true,
        template: './src/index.html',
      }),      
      new ExtractTextPlugin({
        filename: "./css/app.css",
        allChunks: true
      })
    ]
  }                                       
