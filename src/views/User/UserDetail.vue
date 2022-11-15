<template>
  <div>
    <login-query-info></login-query-info>
    <div class="UserContainer">
      <div class="UserTop">
        <div class="img-userinfo">
          <img :src="userinfo.img" alt="" />
          <div>
            <h2>{{ user.nickname }}</h2>
            <input @blur="modiinfo()" v-model="modiInfo" v-if="TypeVisible" type="text" value="编辑个性签名" />
            <div v-else>
              <h4 v-if="userinfo.info != ''">{{ userinfo.info }}</h4>
              <h4 v-else>这个人很懒，什么也没写QAQ~~</h4>
            </div>
          </div>
        </div>
      </div>
      <div class="navigation">
        <div class="navigation-top" @mouseleave="BackOringin()">
          <div class="navigation-left">
            <div
              id="me"
              @mouseover="ChickLeft('me')"
              @click="
                ChangeOrigin('me')
                tab = 1
              "
              :class="{ active: tab == 1 }"
              ><i class="iconfont icon-liuyanban"></i>留言</div
            >
            <div
              id="pl"
              @mouseover="ChickLeft('pl')"
              @click="
                ChangeOrigin('pl')
                tab = 2
              "
              :class="{ active: tab == 2 }"
              ><i class="iconfont icon-pinglun"></i>评论</div
            >
            <div
              id="fs"
              @mouseover="ChickLeft('fs')"
              @click="
                ChangeOrigin('fs')
                tab = 3
              "
              :class="{ active: tab == 3 }"
              ><i class="iconfont icon-dianzan1"></i>我的粉丝</div
            >
            <div
              id="gz"
              @mouseover="ChickLeft('gz')"
              @click="
                ChangeOrigin('gz')
                tab = 4
              "
              :class="{ active: tab == 4 }"
              ><i class="iconfont icon-yiguanzhu"></i>我的关注</div
            >
          </div>
          <div class="navigation-right">
            <div>
              粉丝数<div>{{ userotherinfo.followMe }}</div>
            </div>
            <div>
              关注数<div>{{ userotherinfo.follow }}</div>
            </div>
            <div>
              获赞数<div>{{ PariseCount }}</div>
            </div>
          </div>
        </div>
        <div :style="bottomleft" class="navigation-foot"></div>
      </div>

      <div class="Container">
        <div v-if="tab == 1" class="Container-left">
          <img v-if="lengthIsZhro" class="Noresult" src="../../../images/搜索无结果.png" alt="" />
          <div v-else class="messageUser" v-for="m in Mlist" :key="m.umid">
            <img :src="m.userInfo.img" alt="" />
            <div>
              <div class="message-name">
                <div>
                  <h3>{{ m.user.nickname }}</h3>
                  <h6>{{ m.lastupdate | timer }}</h6>
                </div>
                <div>
                  <i
                    @click="
                      DelClass = true
                      id = m.umid
                    "
                    class="iconfont icon-gengduo-shuxiang message-more"
                  ></i>
                  <div v-if="m.umid == id" :class="{ active: DelClass }" class="message-del" @click="DelMessage(m.umid)">删除</div>
                </div>
              </div>
              <div class="message-title">
                <div @click="MessageDetail(m.umid)">{{ m.title }}</div>
              </div>
              <div class="message-option">
                <i class="iconfont icon-dianzan dianzhan" @click="PriseForMessage(m.umid)" :class="{ active: m.praise }">{{ m.praiseCount }}</i>
                <i class="iconfont icon-pinglun">{{ m.replyCount }}</i>
                <i class="iconfont icon-yanjing">{{ m.hits }}</i>
              </div>
            </div>
          </div>
        </div>
        <div class="Container-right"></div>
      </div>
    </div>
  </div>
</template>

<script>
import LoginQueryInfo from '@/components/Login&QueryInfo.vue'
import Clickoutside from 'element-ui/src/utils/clickoutside'
import tools from '@/js/tools'
let app
export default {
  directives: { Clickoutside },
  components: { LoginQueryInfo },
  name: 'UserDetail',
  data() {
    return {
      title: '用户详细信息',
      Type: this.$route.query.what,
      username: this.$route.query.username,
      bottomleft: {
        left: '0px',
        width: '50px',
      },
      Originbottomleft: {
        left: '0px',
        width: '50px',
      },
      tab: 1,
      user: '',
      userinfo: '',
      userotherinfo: '',
      modiInfo: '',
      PariseCount: 0,
      Mlist: '',
      id: 0,
      DelClass: false,
      lengthIsZhro: false,

      TypeVisible: false,
    }
  },
  computed: {
    LoginUserInfo() {
      return this.$store.state.loginUser
    },
  },
  mounted() {
    // 模拟外部点击
    document.addEventListener('click', (e) => {
      if (e.target.className != 'iconfont icon-gengduo-shuxiang message-more') {
        app.DelClass = false
      }
    })
    if (app.LoginUserInfo.isLogin == false) {
      app.$router.push('/Login')
    }
  },
  // 在组件生命周期结束时销毁
  beforeDestroy() {
    window.removeEventListener('click', () => {}, true)
  },
  methods: {
    // 给留言点赞
    PriseForMessage(umid) {
      if (app.LoginUserInfo.isLogin == true) {
        console.log(umid)
        tools.ajax('/message/support', { umid: umid }, (date) => {
          if (date.success) {
            app.QueryUserAllMessage()
          } else {
            app.$message.error(date.message)
          }
        })
      } else {
        app.LoginVisible = true
      }
    },
    // 进入留言详细信息
    MessageDetail(id) {
      app.$router.push({
        path: '/MessageDetail',
        query: {
          umid: id,
        },
      })
    },
    // 删除用户发布的留言板
    DelMessage(umid) {
      tools.ajax('/message/manage/deletUserMessage', { umid: umid }, (data) => {
        if (data.success) {
          app.QueryUserAllMessage()
        } else {
          app.$message.error(data.message)
        }
      })
    },
    // 查询用户发布的留言
    QueryUserAllMessage() {
      tools.ajax('/message/manage/queryUserAll', {}, (data) => {
        app.Mlist = data.list
        if (app.Mlist.length == 0) {
          app.lengthIsZhro = true
        }
        console.log(data)
      })
    },
    FindUser() {
      if (app.TypeVisible == false) {
        tools.ajax('/user/auth/getUserInfoByName', { username: app.username }, (data) => {
          app.user = data.tbUser
          app.userinfo = data.tbUserInfo
          app.userOtherInfo = data.userOtherInfo
          app.PariseCount = app.userotherinfo.supporteMessage + app.userotherinfo.supporteReply
        })
      }
    },
    QueryUserIfTypeIsMyself() {
      if (this.TypeVisible == true) {
        app.user = app.LoginUserInfo.tbUser
        app.userinfo = app.LoginUserInfo.tbUserInfo
        app.userotherinfo = app.LoginUserInfo.userOtherInfo
        app.PariseCount = app.userotherinfo.supporteMessage + app.userotherinfo.supporteReply
      }
    },
    queryType() {
      if (app.Type == 'Myself') {
        app.TypeVisible = true
      } else {
        app.TypeVisible = false
      }
      console.log(app.TypeVisible)
    },
    ChickLeft(id) {
      let elment = document.getElementById(id)
      app.bottomleft.left = elment.offsetLeft - 16 + 'px'
      app.bottomleft.width = elment.offsetWidth + 'px'
    },
    BackOringin() {
      app.bottomleft.left = app.Originbottomleft.left
      app.bottomleft.width = app.Originbottomleft.width
    },
    ChangeOrigin(id) {
      let elment = document.getElementById(id)
      app.Originbottomleft.left = elment.offsetLeft - 16 + 'px'
      app.Originbottomleft.width = elment.offsetWidth + 'px'
    },
    showinfo() {
      app.modiInfo = app.LoginUserInfo.tbUserInfo.info
    },
    modiinfo() {
      tools.ajax('/user/auth/updateUserInfo', { info: app.modiInfo }, function () {
        app.$store.dispatch('updateUserInfo')
      })
    },
  },
  created() {
    app = this
    app.queryType()
    app.QueryUserAllMessage()
    app.QueryUserIfTypeIsMyself()
    app.FindUser()
    app.showinfo()
    console.log(app.DelClass)
  },
}
</script>
<style scoped>
@import '@/css/user/UserDetail.css';
</style>
