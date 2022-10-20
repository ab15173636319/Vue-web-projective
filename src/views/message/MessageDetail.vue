<template>
  <div class="messageBar">
    <div class="message">
      <div class="messageinfo">
        <div class="messagehead" v-html="info.info">{{ info.info }}</div>
      </div>
      <div class="messagecomments">
        <div class="commentshead">
          <div @click="tab = 1" :class="{ active: tab == 1 }">简介</div>
          <div @click="tab = 2" :class="{ active: tab == 2 }">评论</div>
        </div>
        <div v-if="tab == 1">
          <div class="usercontent">
            <img v-if="info.userInfo.img" class="messageimg" :src="info.userInfo.img" alt="" />
            <img v-else class="messageimg" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" alt="" />
            <div>
              <h1>{{ info.user.nickname }}</h1>
            </div>
          </div>
          <div class="messagecontent">
            <div class="messagecontenttitle" style="font-size: 2rem; margin-left: 10px">{{ info.title }}</div>
            <div class="praisecontent">
              <div class="praise">
                <i class="iconfont" :class="{ active: info.praise }">&#xe613;</i>
                {{ info.praiseCount }}
              </div>
              <div>
                <i class="iconfont">&#xe661;</i>
                {{ info.hits }}
              </div>
            </div>
            <div class="lastupdate">{{ info.lastupdate | timer }}</div>
          </div>
        </div>
        <div v-if="tab == 2" class="CommentsContaner">
          <!-- {{ list }} -->
          <div class="commentsBox" v-for="l in list" :key="l.umrid">
            <div>
              <img class="comments" :src="l.userInfo.img" alt="" />
              <div class="commentsContent">
                <div>
                  <h3>{{ l.user.nickname }}</h3>
                  <h6 style="color: gray">{{ l.lastupdate | timer }}</h6>
                </div>
                <div class="commentinfo" v-html="l.info"> </div>
                <div class="praisecontent">
                  <div class="praise">
                    <i class="iconfont" style="font-size: 16px" :class="{ active: l.praise }">&#xe613;</i>
                    {{ l.praiseCount }}
                  </div>
                  <div class="morechaozuo_bar">
                    <i style="font-size: 16px" class="iconfont">&#xe8c4;</i>
                    <div class="morechaozuo">
                      <div>举报</div>
                      <div>屏蔽</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import tools from '@/js/tools'
// import tools from '../../js/tools'
let app
export default {
  name: 'MessageDetail',
  data() {
    return {
      title: '留言详情',
      umid: '',
      info: {},
      list: [],
      tab: 1,
    }
  },
  methods: {
    getid() {
      let id = location.search.lastIndexOf('?')
      app.umid = location.search.substring(id + 1, location.search.length)
    },
    querydetail() {
      tools.ajax('/message/queryDetail', { umid: app.umid }, (data) => {
        app.list = data.list
        app.info = data.info
        console.log(data)
      })
    },
  },
  created() {
    app = this
    console.log(app.title)
    app.getid()
    app.querydetail()
  },
}
</script>
<style>
@import '../../css/messagedetail/media.css';
@import '../../css/messagedetail/messagedetail.css';
/* @import url('../../css./messagedetail./media.css'); */
/* @import url('../../css./messagedetail./messagedetail.css'); */
</style>
