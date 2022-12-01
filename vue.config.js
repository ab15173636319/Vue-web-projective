const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 生成环境不需要map文件
  productionSourceMap: !process.env.NODE_ENV === 'production',
  outputDir: 'vue-message', //打包好的文件夹名称
  // assetsDir: 'D\\git\\luizhen.top.server', //文件配置路径
  // 服务器虚拟路径
  publicPath: process.env.NODE_ENV === 'production' ? '/vue-message/' : '/',
})
