var path = require('path');
var webpack = require('webpack');


module.exports = {
    entry: {
      game: './scripts/main.js',
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    output: {
        path: path.join(__dirname, 'out/'),
        publicPath: "/out/",
        filename: '[name].bundle.js'
    },
    module: {
      loaders: [
        {
          test: /\.js?$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel',
          query: {
            presets: ['es2015']
          }
        }
      ]
    },

    plugins: [new webpack.optimize.UglifyJsPlugin({minimize: true})]
}