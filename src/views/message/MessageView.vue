<template>
  <div>
    <!-- <load-view v-if="loading"></load-view> -->
    <login-query-info :top="10" :left="200"></login-query-info>
    <div class="message">
      <div class="message-1">
        <img @mouseover="ImgStyle.filter = 'blur(0px)'" :style="ImgStyle" src="../../../images/rose.jpg" alt="" />
        <div @mousemove="ImgStyle.filter = 'blur(4px)'" class="input-group">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input v-model="messageabout.info" type="text" placeholder="请输入内容" />
          <button @click="queryMessage()">搜索</button>
        </div>
      </div>
      <announce-ment></announce-ment>
      <div class="CommentHeat">
        <div>
          <span>留言</span>
        </div>
        <div>
          <span @click="messageabout.orderBy = 1" :class="{ active: messageabout.orderBy == 1 }">时间</span>
          <span>|</span>
          <span @click="messageabout.orderBy = 6" :class="{ active: messageabout.orderBy == 6 }">热度</span>
        </div>
      </div>
      <div @mouseover="ImgStyle.filter = 'blur(0px)'" class="message-2" :class="{ active: messageLoading }">
        <div v-for="m in messagelist" :key="m.umid" class="message-2-1">
          <div class="message-2-1-1">
            <div class="message-2-1-1-1">
              <img v-if="m.userInfo.img" :src="m.userInfo.img" alt="" />
              <img v-else src="https://pic3.zhimg.com/v2-83296272d2431fd53e17bef56652cdc1_r.jpg?source=1940ef5c" alt="" />
            </div>
            <div class="message-2-1-1-2">
              <span @click="MessageDetail(m.umid)">{{ m.title }}</span>
            </div>
            <div class="message-2-1-1-3">
              <div class="message-2-1-1-3-name">
                <span @click="ToUserDetail(m.user.username)">{{ m.user.nickname }}</span>
                <span>{{ m.lastupdate | timer }}</span>
              </div>
            </div>
          </div>
        </div>
        <el-empty v-if="messagelist.length == 0" :image-size="200"></el-empty>
      </div>
      <div class="message-foot">
        <div class="block">
          <el-pagination :hide-on-single-page="true" @current-change="pageNext" :page-size="page.pageSize" layout="total, prev, pager, next, jumper" :total="page.total"> </el-pagination>
        </div>
      </div>
    </div>
    <bei-an></bei-an>
  </div>
</template>

<script>
import tools from '@/js/tools'
import LoginQueryInfo from '@/components/Login&QueryInfo.vue'
import AnnounceMent from '@/components/AnnounceMent.vue'
import BeiAn from '@/components/BeiAn.vue'
// import tools from '../../js/tools'
let app
export default {
  components: { LoginQueryInfo, AnnounceMent, BeiAn },
  name: 'MessageView',
  data() {
    return {
      title: '首页',
      messagelist: {},
      messageUser: {
        nickname: '',
      },
      page: {},
      messageabout: {
        info: '',
        orderBy: 1,
      },
      loading: false,
      messageLoading: false,
      ImgStyle: {
        filter: '',
      },
    }
  },
  computed: {
    userinfo() {
      return this.$store.state.loginUser
    },
  },
  methods: {
    ToUserDetail(username) {
      let what = ''
      if (username == app.userinfo.tbUser.username) {
        what = 'Myself'
      } else {
        what = 'themself'
      }
      app.$router.push({
        path: '/UserDetail',
        query: {
          what: what,
          username: username,
        },
      })
    },
    queryMessage() {
      console.log(app.messageabout)
      document.documentElement.scrollTop = 500
      window.onload = () => {
        app.loading = true
      }
      app.messageLoading = true
      app.messageabout.pageNumber = app.page.pageNumber
      tools.ajax('/message/queryAll', app.messageabout, (data) => {
        app.messagelist = data.list
        app.page = data.page
        app.loading = false
        app.messageLoading = false
      })
    },
    pageNext(pageNumber) {
      if (pageNumber <= 0 || pageNumber > app.page.pageCount) {
        return
      } else {
        app.page.pageNumber = pageNumber
        app.page.pageCount - 1
        app.queryMessage()
      }
    },
    MessageDetail(id) {
      app.$router.push({
        path: '/MessageDetail',
        query: {
          umid: id,
        },
      })
    },
  },
  created() {
    app = this
    app.queryMessage()
  },
  watch: {
    messageabout: {
      handler() {
        app.queryMessage()
      },
      deep: true,
    },
  },
}
</script>
<style scoped>
@import '../../css/message.css';
@import 'https://cdn.bootcdn.net/ajax/libs/font-awesome/6.2.0/css/all.css';
</style>
