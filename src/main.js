import Vue from 'vue'
import 'font-awesome/css/font-awesome.min.css'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/iconfont/iconfont.css'
import '@/css/commom.css'

// 导入饿了么ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'
// import './css/iconfont/iconfont.css'
Vue.use(ElementUI)

// 导入过滤器      @符号表示src目录
import '@/filters/myfilters'
import '@/js/font'

import VueLoaders from 'vue-loaders'
// add plugin
Vue.use(VueLoaders)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
