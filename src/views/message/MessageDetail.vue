<template>
  <div>
    <load-view v-if="loading"></load-view>
    <login-query-info></login-query-info>
    <div class="Back">
      <i @click="$router.back()" class="fa-solid fa-backward"></i>
      <div class="title">
        <div class="title-title">{{ info.title }}</div>
        <div class="title-user">
          <div class="title-author">
            作者：<div>{{ user.nickname }} </div>
          </div>
          <div>|</div>
          <div>发布时间:{{ info.lastupdate | timer }} </div>
        </div>
      </div>
      <div class="title-user-img">
        <img :src="userinfo.img" alt="" />
      </div>
    </div>
    <div class="messageBody">
      <div class="message-out">
        <div class="message-info" v-html="info.info"></div>
      </div>
      <div class="prise">
        <div>
          <i @click="PriseForMessage(info.umid)" :class="{ active: info.praise == true }" class="iconfont hover">&#xe613;</i>
          <i style="color: red" v-if="info.praise == true" class="display">已点赞({{ info.praiseCount }})</i>
          <i v-else class="display">点赞({{ info.praiseCount }})</i>
        </div>
        <div>
          <i class="ficonfont hover">&#xe609;</i>
          <i class="display">评论({{ info.replyCount }})</i>
        </div>
        <div>
          <i class="iconfont hover">&#xe661;</i>
          <i class="display">点击量({{ info.hits }})</i>
        </div>
        <div>
          <i class="iconfont hover">&#xe61e;</i>
          <i class="display">屏蔽</i>
        </div>
        <div>
          <i class="iconfont hover">&#xe662;</i>
          <i class="display">举报</i>
        </div>
      </div>
    </div>
    <div class="comment">
      <div class="comment-body" v-for="c in commentlist" :key="c.umrid">
        <div>
          <img class="comment-img" :src="c.userInfo.img" alt="" />
          <div>{{ c.user.nickname }}</div>
        </div>
        <div class="comment-info">
          <div class="comment-title">{{ c.info }}</div>
          <div class="comment-info-other">
            <div class="comment-operate">
              <div>
                <i :class="{ active: info.praise == true }" class="iconfont hover">&#xe613;</i>
                <i style="color: red" v-if="info.praise == true" class="display">已点赞({{ info.praiseCount }})</i>
                <i v-else class="display">点赞({{ info.praiseCount }})</i>
              </div>
              <div>
                <i class="iconfont hover">&#xe61e;</i>
                <i class="display">屏蔽</i>
              </div>
              <div>
                <i class="iconfont hover">&#xe662;</i>
                <i class="display">举报</i>
              </div>
            </div>
            <div class="comment-time">
              <div>{{ c.lastupdate | timer }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import tools from '@/js/tools'
import LoadView from '@/components/LoadView.vue'
import LoginQueryInfo from '@/components/Login&QueryInfo.vue'
let app
export default {
  components: { LoadView, LoginQueryInfo },
  name: 'MessageDetail',
  data() {
    return {
      title: '留言详情',
      LoginVisible: false,
      loading: false,
      umid: '',
      info: '',
      user: '',
      userinfo: '',
      commentlist: {},
    }
  },
  methods: {
    queryUmid() {
      app.umid = app.$route.query.umid
    },
    queryMessage() {
      window.onload = () => {
        app.loading = true
      }
      tools.ajax('/message/queryDetail', { umid: app.umid }, (data) => {
        console.log(data.info)
        app.info = data.info
        app.user = data.info.user
        app.commentlist = data.list
        app.userinfo = app.info.userInfo
        app.loading = false
      })
    },
    PriseForMessage(umid) {
      if (app.code == 200) {
        tools.ajax('/message/support', { umid: umid }, (date) => {
          if (date.success) {
            app.queryMessage()
          } else {
            app.$message.error(date.message)
          }
        })
      } else {
        app.LoginVisible = true
      }
    },
  },
  created() {
    app = this
    app.queryUmid()
    app.queryMessage()
  },
}
</script>
<style scoped>
@import '../../css/messagedetail/messagedetail.css';
</style>
