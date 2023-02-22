<template>
  <div>
    <router-view />
  </div>
</template>
<script>
export default {
  mounted() {
    if (top != window) {
      top.postMessage('loaded', '*')
    }
  },
}
</script>
<style>
/* 全局样式导入 */
@import './css/commom.css';
@import './css/iconfont/iconfont.css';
</style>
