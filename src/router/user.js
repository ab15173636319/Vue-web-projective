let routers = [
  {
    path: '/user',
    name: 'message',
    component: () => import('../views/User/UserView.vue'),
  },
  {
    path: '/UserInfoUpate',
    name: 'home',
    component: () => import('../views/User/UserInfoView.vue'),
  },
  {
    path: '/UserDetail',
    name: 'home',
    component: () => import('../views/User/UserDetail.vue'),
  },
]
export default routers
