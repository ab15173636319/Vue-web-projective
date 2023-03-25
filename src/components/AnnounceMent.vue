<template>
  <div>
    <div class="ad">
      <div class="ad-title">{{ title }}</div>
      <div v-if="display">
        <el-button @click="$router.push('/Manage')" type="primary">管理公告</el-button>
      </div>
      <li class="ad-info" v-for="a in announce" :key="a.messageKey">{{ a.message }}</li>
    </div>
  </div>
</template>
<script>
import tools from '@/js/tools'
export default {
  name: 'AnnounceMent',
  data() {
    return {
      title: '公告',
      announce: [],
      display: false,
      accessKey: '',
    }
  },
  computed: {
    userinfo() {
      return this.$store.state.loginUser
    },
  },
  mounted() {
    this.display = this.userinfo.tbUser.username == 'a00000000'
  },
  methods: {
    getAnn() {
      tools.ajax('/portable/message/queryAll', { accessKey: '413e8b0f-9d94-4cbf-97db-722157b586c5' }, (data) => {
        this.announce = data.list
      })
    },
  },
  created() {
    this.getAnn()
  },
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
  padding: 10px 20px;
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

.ad .el-button {
  width: 100px;
}

.ad-title {
  font-size: 1.5rem;
  padding: 10px 5px;
  color: #00a8ff;
}
</style>
