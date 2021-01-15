const path = require('path')
const isProduction = process.env.NODE_ENV === 'production'
const webpack = require('webpack')
const productionGzipExtensions = ['js', 'css']
const CompressionWebpackPlugin = require('compression-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  outputDir: 'dist',
  publicPath: isProduction ? '' : '',
  productionSourceMap: false, // 关闭打包.map
  lintOnSave: false, // 关闭eslint规范
  // 设置页面title
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = '电商管理系统'
        return args
      })
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    plugins: [
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      // 下载的插件配置
      new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8
      }),
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 5,
        minChunkSize: 100
      })
    ]
  }

}
