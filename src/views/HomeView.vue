<template>
  <div>
    <div class="menus">
      <!-- 脚手架的v-for需要一个不重复的key属性 -->
      <el-link type="primary" style="margin: 10px" v-for="d in menus" @click="toPage(d.url)" :key="d.url">{{ d.text }}</el-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      menus: [
        { url: '/message/MessageView', text: '留言版' },
        { url: '/Login', text: '登录' },
        { url: '/Reg', text: '注册' },
        { url: '/update', text: '忘记密码' },
      ],
    }
  },
  methods: {
    // vue路由api跳转页面
    toPage(url) {
      this.$router.push(url)
    },
  },
}
</script>
<style scoped>
.menus {
  width: 100%;
  display: flex;
  justify-content: space-around;
}
.menus a {
  margin: 1rem;
}
</style>
