<template>
  <div>
    <login-query-info></login-query-info>
    <div class="UserContainer">
      <div class="UserTop">
        <div class="img-userinfo">
          <img :src="userinfo.img" alt="" />
          <div>
            <h2>{{ user.nickname }}</h2>
            <h4 v-if="userinfo.info != ''">{{ userinfo.info }}</h4>
            <h4 v-else>这个人很懒，什么也没写QAQ~~</h4>
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
              获赞数<div>{{ userotherinfo.PariseCount }}</div>
            </div>
          </div>
        </div>
        <div :style="bottomleft" class="navigation-foot"></div>
      </div>
      <div class="Container">
        <div class="Container-left">
          <img v-if="lengthIsZhro" class="Noresult" src="../../../images/搜索无结果.png" alt="" />
          <div v-if="tab == 1" class="infinite-list-wrapper" style="overflow: auto">
            <ul class="list" infinite-scroll-disabled="disabled">
              <li v-for="m in Mlist" :key="m.umid" class="list-item messageUser">
                <img :src="m.userInfo.img" alt="" />
                <div>
                  <div class="message-name">
                    <div>
                      <h3>{{ m.user.nickname }}</h3>
                      <h6>{{ m.lastupdate | timer }}</h6>
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
              </li>
            </ul>
            <!-- <p v-if="loading">加载中...</p> -->
            <!-- <p v-if="noMore">没有更多了</p> -->
            <div class="block">
              <el-pagination :hide-on-single-page="true" @current-change="handleCurrentChange" layout="prev, pager, next" :total="page.total"> </el-pagination>
            </div>
          </div>
          <div v-if="tab == 2" class="infinite-list-wrapper" style="overflow: auto">
            <ul class="list" infinite-scroll-disabled="disabled">
              <li v-for="m in CommentList" :key="m.umrid" class="list-item messageUser">
                <img :src="m.userInfo.img" alt="" />
                <div>
                  <div class="message-name">
                    <div>
                      <h3>{{ m.user.nickname }}</h3>
                      <h6>{{ m.lastupdate | timer }}</h6>
                    </div>
                  </div>
                  <div class="message-title">
                    <div @click="MessageDetail(m.umid)" v-html="m.info"></div>
                  </div>
                  <div class="message-option">
                    <i class="iconfont icon-dianzan dianzhan" @click="PriseForMessage(m.umid)" :class="{ active: m.praise }">{{ m.praiseCount }}</i>
                  </div>
                </div>
              </li>
            </ul>
            <div class="block">
              <el-pagination :hide-on-single-page="true" @current-change="ChangeComment" layout="prev, pager, next" :total="CommentInfo.page.total"> </el-pagination>
            </div>
          </div>
          <div v-if="tab == 3" class="UserFans">
            <div class="fanstitle">粉丝 </div>
            <div class="fonsbottomline">
              <div></div>
            </div>
            <div v-for="f in FansList" :key="f.uid" class="fans">
              <div class="fans2">
                <div class="fansinfo">
                  <img @click="ToUserCebter(f.user.username)" :src="f.userInfo.img" alt="" />
                  <div class="fansname">
                    <div @click="ToUserCebter(f.user.username)">{{ f.user.nickname }}</div>
                    <div>{{ f.userInfo.info }}</div>
                  </div>
                </div>
                <div class="fansother">
                  <div class="eachotherfans" @click="FllowUser(f.user.username)" v-if="f.userOtherInfo.mineFollow">已互粉</div>
                  <div class="nofllow" @click="FllowUser(f.user.username)" s v-else>关注</div>
                </div>
              </div>
              <div class="fonsbottomline">
                <div></div>
              </div>
            </div>
            <div class="block">
              <el-pagination :hide-on-single-page="true" @current-change="ChangeComment" layout="prev, pager, next" :total="queryfansinfo.page.total"> </el-pagination>
            </div>
          </div>
          <div v-if="tab == 4" class="UserFans">
            <div class="fanstitle">我的关注 </div>
            <div class="fonsbottomline">
              <div></div>
            </div>
            <div v-for="f in Fllowlist" :key="f.uid" class="fans">
              <div class="fans2">
                <div class="fansinfo">
                  <img @click="ToUserCebter(f.user.username)" :src="f.userInfo.img" alt="" />
                  <div class="fansname">
                    <div @click="ToUserCebter(f.user.username)">{{ f.user.nickname }}</div>
                    <div>{{ f.userInfo.info }}</div>
                  </div>
                </div>
                <div class="fansother">
                  <div class="eachotherfans" @click="FllowUser(f.user.username)" v-if="f.userOtherInfo.mineFollow || TypeVisible">已互粉</div>
                  <div class="nofllow" @click="FllowUser(f.user.username)" s v-else>关注</div>
                </div>
              </div>
              <div class="fonsbottomline">
                <div></div>
              </div>
            </div>
            <div class="block">
              <el-pagination :hide-on-single-page="true" @current-change="ChangeComment" layout="prev, pager, next" :total="queryfllow.page.total"> </el-pagination>
            </div>
          </div>
        </div>
        <div class="Container-right">
          <div>
            <div>个人资料</div>
            <div>修改信息</div>
          </div>
          <div>
            <span></span>
          </div>
        </div>
      </div>
    </div>
    <bei-an></bei-an>
  </div>
</template>

<script>
import LoginQueryInfo from '@/components/Login&QueryInfo.vue'
import Clickoutside from 'element-ui/src/utils/clickoutside'
import tools from '@/js/tools'
import BeiAn from '@/components/BeiAn.vue'
let app
export default {
  directives: { Clickoutside },
  components: { LoginQueryInfo, BeiAn },
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
      user: {},
      userinfo: {},
      userotherinfo: {},
      modiInfo: '编辑个性签名吧',
      PariseCount: 0,
      Mlist: '',
      id: 0,
      DelClass: false,
      lengthIsZhro: false,
      page: {
        pageSize: 5,
        pageNumber: 1,
      },

      CommentList: [],
      CommentInfo: {
        // username: app.username,
        page: {
          pageSize: 5,
          pageNumber: 1,
        },
      },

      TypeVisible: false,
      pageNumber: 1,

      // 用户粉丝
      FansList: [],
      queryfansinfo: {
        page: {
          pageSize: 5,
          pageNumber: 1,
        },
      },

      // 用户关注
      Fllowlist: [],
      queryfllow: {
        page: {
          pageSize: 5,
          pageNumber: 1,
        },
      },
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
    // 进入用户中心
    ToUserCebter(username) {
      app.$router.push({
        path: '/UserDetail',
        query: {
          what: 'themself',
          username: username,
        },
      })
      app.$router.go(0)
    },

    // 关注&取消关注
    FllowUser(username) {
      tools.ajax('/message/followUser', { username: username }, () => {
        app.QueryUserFans()
      })
    },
    // 关注列表

    QueryFllow() {
      app.queryfllow['username'] = app.username
      app.queryfllow.pageNumber = app.queryfllow.page.pageNumber
      app.queryfllow.pageSize = app.queryfllow.page.pageSize
      tools.ajax('/message/queryFollowUserListByName', app.queryfllow, (data) => {
        app.Fllowlist = data.list
      })
    },

    // 粉丝
    QueryUserFans() {
      app.queryfansinfo['username'] = app.username
      app.queryfansinfo.pageNumber = app.queryfansinfo.page.pageNumber
      app.queryfansinfo.pageSize = app.queryfansinfo.page.pageSize
      tools.ajax('/message/queryFollowMeUserListByName', app.queryfansinfo, (data) => {
        console.log(data.list)
        app.FansList = data.list
      })
    },
    // 删除评论
    DelComment(umrid, info) {
      this.$confirm('此操作将永久删除该"' + info + '"评论, 是否继续?', {
        confirmButtonText: '就算玉皇大帝来了都救不了',
        cancelButtonText: '我回心转意了',
        type: 'warning',
      })
        .then(() => {
          tools.ajax('/message/manage/deletUserMessageReply', { umrid: umrid }, (data) => {
            this.$message({
              type: 'warning',
              message: data.message,
            })
            app.QueryUserComment()
          })
        })
        .catch(() => {
          this.$message({
            type: 'success',
            message: '已取消删除',
          })
        })
    },
    // 查询指定用户评论信息
    QueryUserComment() {
      app.CommentInfo['username'] = app.username
      app.CommentInfo.pageNumber = app.CommentInfo.page.pageNumber
      app.CommentInfo.pageSize = app.CommentInfo.page.pageSize
      tools.ajax('/message/queryReplyByUsername', app.CommentInfo, (data) => {
        app.CommentList = data.list
        app.CommentInfo.page = data.page
      })
    },
    ChangeComment(val) {
      app.CommentInfo.page.pageNumber = val
      app.QueryUserComment()
    },
    handleCurrentChange(val) {
      app.page.pageNumber = val
      app.QueryPorintMessage()
    },
    // 给留言点赞
    PriseForMessage(umid) {
      if (app.LoginUserInfo.isLogin == true) {
        console.log(umid)
        tools.ajax('/message/support', { umid: umid }, (date) => {
          if (date.success) {
            app.QueryPorintMessage()
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
    // 查询用户发布的留言登录名用户
    QueryUserAllMessage() {
      tools.ajax('/message/manage/queryUserAll', app.page, (data) => {
        app.Mlist = data.list
        app.page = data.page
        if (app.Mlist.length == 0) {
          app.lengthIsZhro = true
        }
      })
    },
    // 查询用户发布的留言指定用户
    QueryPorintMessage() {
      let porintInfo = {
        username: app.username,
        pageSize: app.page.pageSize,
        pageNumber: app.page.pageNumber,
      }
      tools.ajax('/message/queryAll', porintInfo, (data) => {
        app.Mlist = data.list
        app.page = data.page
        if (app.Mlist.length == 0) {
          app.lengthIsZhro = true
        }
      })
    },
    FindUser() {
      tools.ajax('/user/auth/getUserInfoByName', { username: app.username }, (data) => {
        console.log('User:', data)
        app.user = data.tbUser
        app.userinfo = data.tbUserInfo
        app.userOtherInfo = data.userOtherInfo
        app.PariseCount = app.userotherinfo.supporteMessage + app.userotherinfo.supporteReply
      })
    },
    QueryUserIfTypeIsMyself() {
      app.user = app.LoginUserInfo.tbUser
      app.userinfo = app.LoginUserInfo.tbUserInfo
      app.userotherinfo = app.LoginUserInfo.userOtherInfo
      app.PariseCount = app.userotherinfo.supporteMessage + app.userotherinfo.supporteReply
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
    app.QueryPorintMessage()
    app.QueryUserIfTypeIsMyself()
    app.FindUser()
    app.showinfo()
    app.QueryUserComment()
    app.QueryUserFans()
    app.QueryFllow()
  },
}
</script>
<style scoped>
@import '@/css/user/UserDetail.css';
@import '@/css/commom.css';
</style>
