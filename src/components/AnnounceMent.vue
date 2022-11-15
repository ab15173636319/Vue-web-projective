<template>
  <div class="ad">
    <i class="iconfont icon-gonggao">公告：</i>
    <p class="content">
      <span>{{ announce }}</span>
    </p>
  </div>
</template>

<script>
export default {
  name: 'AnnounceMent',
  data() {
    return {
      title: '公告',
      announce: '可以修改头像啦',
    }
  },
  methods: {},
  created() {},
}
</script>
<style scoped>
.ad {
  z-index: 1;
  cursor: default;
  position: absolute;
  top: 54px;
  width: 400px;
  height: 60px;
  background-color: #fff;
  border-radius: 10px;
  box-sizing: border-box;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 16px;
  color: #353535;
  box-shadow: 2px 1px 8px 1px rgb(228, 232, 235);
  margin: 40px auto;
}
i {
  color: #ff6146;
  font-size: 20px;
  margin-right: 10px;
}

.content {
  flex: 1;
  overflow: hidden;
}
span {
  display: block;
  width: auto;
  white-space: nowrap;
  animation: marquee 15s linear infinite;
}

@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}
</style>
