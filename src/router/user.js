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
  {
    path: '/Jump',
    name: 'home',
    component: () => import('../views/User/RouterPage.vue'),
  },
  {
    path: '/friend',
    name: 'home',
    component: () => import('../views/User/FriendView.vue'),
  },
  {
    path: '/friend/chat',
    name: 'home',
    component: () => import('../views/User/ChatWith.vue'),
  },
]
export default routers
