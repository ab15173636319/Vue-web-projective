const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  runtimeCompiler: true,
  // 生成环境不需要map文件
  productionSourceMap: false,
  //外部文件夹名称
  outputDir: 'dist',
  // 服务器虚拟路径
  // publicPath: process.env.NODE_ENV === 'production' ? '/vue-message/' : './'
  // publicPath: process.env.NODE_ENV === 'production'
  //   ? '/vue-message/'
  //   : './'
  publicPath: './',
  devServer: {
    // transpileDependencies:true,
    historyApiFallback: true,
    allowedHosts: 'all',
    host: '127.0.0.1',
    port: 9727,
  }
})
