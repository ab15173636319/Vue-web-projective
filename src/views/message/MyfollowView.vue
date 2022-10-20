<template>
  <div class="mymessage">
    <div class="block">
      <el-image style="width: 80vw; height: 60vh" src="https://klcxy.top/oss-manage-service/ossinfo/queryOssUrl?tbOssInfo.oiid=331"></el-image>
    </div>
    <div v-loading="loading" class="outer">
      <div v-for="l in list" :key="l.uid" class="Messagelist">
        <div class="messagetitle">{{ l.title }}</div>
        <div v-html="l.info"></div>
      </div>
    </div>
  </div>
</template>

<script>
import tools from '../../js/tools'
let app
export default {
  name: 'MyfollowView',
  data() {
    return {
      title: '用户关注列表',
      MyfollowList: [],
      useringo: {},
      user: {},
      userOtherInfo: {},
    }
  },
  methods: {
    Myfollow() {
      tools.ajax('/message/queryFollowUserList', {}, (data) => {
        app.MyfollowList = data.list
        app.useringo = app.MyfollowList.userInfo
        app.user = app.MyfollowList.user
        app.userOtherInfo = app.MyfollowList.userOtherInfo
      })
    },
  },
  created() {
    app = this
    app.Myfollow()
  },
}
</script>
<style>
@import '../../css/Mymessage.css';
</style>
