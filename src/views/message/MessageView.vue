<template>
  <div>
    <load-view v-if="loading"></load-view>
    <div class="message">
      <div class="message-1">
        <img src="../../../images/rose.jpg" alt="" />
        <div class="input-group">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder="请输入内容" />
          <button>搜索</button>
        </div>
      </div>
      <div class="message-2">
        <div v-for="m in messagelist" :key="m.umid" class="message-2-1">
          <div class="message-2-1-1">
            <div class="message-2-1-1-1">
              <img v-if="m.userInfo.img" :src="m.userInfo.img" alt="" />
              <img v-else src="https://pic3.zhimg.com/v2-83296272d2431fd53e17bef56652cdc1_r.jpg?source=1940ef5c" alt="" />
            </div>
            <div class="message-2-1-1-2">
              <span>{{ m.title }}</span>
            </div>
            <div class="message-2-1-1-3">
              <div class="message-2-1-1-3-name">
                <span>{{ m.user.nickname }}</span>
                <span>{{ m.lastupdate | timer }}</span>
              </div>
              <div class="message-2-1-1-3-praise">
                <span><i class="iconfont">&#xe613;</i> {{ m.praiseCount }} </span>
                <span><i :class="{ active: m.praise == true }" class="iconfont">&#xe627;</i> {{ m.replyCount }} </span>
                <span><i class="fa-solid fa-eye"></i> {{ m.hits }} </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="message-foot">
        <div
          ><i @click="pageNext(page.pageNumber - 1)" class="fa-solid fa-chevron-left"></i>
          <div class="pageNumber-list" v-for="p in page.pageCount" :key="p">
            <div v-if="p - page.pageNumber <= 5" @click="pageNext((page.pageNumber = p))" :class="{ active: p == page.pageNumber }"></div>
          </div>
          <i @click="pageNext(page.pageNumber + 1)" class="fa-solid fa-chevron-right"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import tools from '@/js/tools'
import LoadView from '@/components/LoadView.vue'
// import tools from '../../js/tools'
let app
export default {
  components: { LoadView },
  name: 'MessageView',
  data() {
    return {
      title: '首页',
      messagelist: {},
      messageUser: {
        nickname: '',
      },
      page: {},
      outwidth: 0,
      inwidth: 0,
      fontleft: 0,
      messageabout: {},
      loading: false,
    }
  },
  methods: {
    queryMessage() {
      app.loading = true
      app.messageabout.pageNumber = app.page.pageNumber
      tools.ajax('/message/queryAll', app.messageabout, (data) => {
        app.messagelist = data.list
        app.page = data.page
        app.outwidth = (app.page.pageCount - 1) * (document.body.clientWidth * 0.1) + 'px'
        app.inwidth = app.page.pageNumber * (document.body.clientWidth * 0.1) + 'px'
        app.loading = false
      })
    },
    pageNext(pageNumber) {
      if (pageNumber <= 0 || pageNumber > app.page.pageCount) {
        return
      } else {
        app.page.pageNumber = pageNumber
        app.page.pageCount - 1
        app.queryspanwidth()
        app.queryMessage()
      }
    },
    queryspanwidth() {
      app.fontleft = app.page.pageNumber * (document.body.clientWidth * 0.1) + 'px'
      app.outwidth = (app.page.pageCount - 1) * (document.body.clientWidth * 0.1) + 'px'
      app.inwidth = app.page.pageNumber * (document.body.clientWidth * 0.1) + 'px'
    },
  },
  created() {
    app = this
    // console.log(app.title)
    app.queryspanwidth()
    app.queryMessage()
  },
}
</script>
<style scoped>
@import '../../css/message.css';
@import 'https://cdn.bootcdn.net/ajax/libs/font-awesome/6.2.0/css/all.css';
</style>
