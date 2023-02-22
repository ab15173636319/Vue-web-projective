import Vue from 'vue'
import VueRouter from 'vue-router'
import user from '../router/user'
import mobile from '../router/Mobile'
Vue.use(VueRouter)

const routes = [
  // 路由配置说明
  // path参数是地址栏访问路径
  // name参数随意
  // component参数是vue文件
  // 列如path是/abc；文件是AbcView.vue
  // 表示地址栏输入服务器地址/abc看到的是AbcView.vue编译后的页面
  {
    path: '/',
    name: 'home',
    component: () => import('../views/message/MessageView.vue'),
  },
  {
    path: '/Login',
    name: 'home',
    component: () => import('../views/LoginView.vue'),
  },
  {
    path: '/Reg',
    name: 'home',
    component: () => import('../views/RegView.vue'),
  },
  {
    path: '/update',
    name: 'home',
    component: () => import('../views/ForgetPass.vue'),
  },
  {
    path: '/Mymessage',
    name: 'home',
    component: () => import('../views/message/MymessageView.vue'),
  },
  {
    path: '/MessageFans',
    name: 'home',
    component: () => import('../views/message/MessageFans.vue'),
  },
  {
    path: '/MessageDetail',
    name: 'home',
    component: () => import('../views/message/MessageDetail.vue'),
  },
  {
    path: '/AddMessage',
    name: 'home',
    component: () => import('../views/message/AddMessage.vue'),
  },
]
  .concat(user)
  .concat(mobile)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
