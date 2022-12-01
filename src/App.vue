<template>
  <div>
    <!-- 其实路由切换页面就是该标记完成的 -->
    <router-view />
  </div>
</template>
<script>
import tools from './js/tools'
export default {
  data() {
    return {
      location: location.pathname,
      load: tools.isload(),
    }
  },
  mounted() {},
  created() {
    // judgment
  },
  watch: {
    load() {},
  },
}
</script>
<style>
/* 全局样式导入 */
@import './css/commom.css';
@import './css/iconfont/iconfont.css';
</style>
