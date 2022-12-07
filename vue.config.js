const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  runtimeCompiler: true,
  // 生成环境不需要map文件
  productionSourceMap: !process.env.NODE_ENV === 'production',
  // 服务器虚拟路径
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
})
