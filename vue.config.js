const webpack = require('webpack')
module.exports = {
    configureWebpack: {
      plugins: [
        new webpack.ProvidePlugin({
          $: 'jquery',
          jquery: 'jquery',
          'window.jQuery': 'jquery',
          'window.$': 'jquery',
          'window.fn': 'owl.carousel',
          'fn': 'owl.carousel',
          jQuery: 'jquery'
        })
      ]
    },
    publicPath: process.env.NODE_ENV === 'production'
      ? '/dist/'
      : '/',
      lintOnSave: false
}