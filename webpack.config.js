var path = require('path');


module.exports = {
    entry: {
      game: './scripts/main.js',
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    output: {
        path: path.join(__dirname, 'out/'),
        publicPath: "/assets/",
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
    }
}