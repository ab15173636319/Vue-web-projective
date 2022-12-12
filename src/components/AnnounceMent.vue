<template>
  <div class="ad">
    <div class="ad-title">公告</div>
    <li class="ad-info" v-for="a in announce" :key="a.key">{{ a.value }}</li>
  </div>
</template>

<script>
export default {
  name: 'AnnounceMent',
  data() {
    return {
      title: '公告',
      announce: [
        { value: '可以修改头像啦', key: '1' },
        { value: '可以查看用户信息了', key: '2' },
        { value: '还存在一些错误，如果发现错误的话会通过首页联系我反馈给我', key: '3' },
      ],
    }
  },
  methods: {},
  created() {},
}
</script>
<style scoped>
@import '@/css/commom.css';
.ad {
  z-index: 1;
  cursor: default;
  position: absolute;
  top: 54px;
  max-width: 400px;
  min-height: 60px;
  background-color: #fff;
  border-radius: 10px;
  box-sizing: border-box;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  justify-content: left;
  font-size: 16px;
  color: #353535;
  box-shadow: 2px 1px 8px 1px rgb(228, 232, 235);
  margin: 40px auto;
}

.ad li {
  list-style: circle;
  padding: 5px;
  color: #00a8ff;
}

.ad-title {
  font-size: 1.5rem;
  padding: 10px 5px;
  color: #00a8ff;
}
</style>
