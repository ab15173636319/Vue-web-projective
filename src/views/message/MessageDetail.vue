<template>
  <div>
    <login-query-info :LoginIsVisible="LoginProp"></login-query-info>
    <div class="Back">
      <i @click="$router.back()" class="iconfont icon-fanhui1"></i>
      <div class="title">
        <div class="title-title">{{ info.title }}</div>
        <div class="title-user">
          <div class="title-author">
            作者：<div @click="ToUserCebter()">{{ user.nickname }} </div>
          </div>
          <div>|</div>
          <div>发布时间:{{ info.lastupdate | timer }} </div>
        </div>
      </div>
      <div class="title-user-img"> <img @click="ToUserCebter()" :src="userInfo.img" alt="" /> </div>
    </div>
    <div class="messageBody">
      <div class="message-out">
        <div class="message-info" v-html="info.info"></div>
      </div>
      <div class="prise">
        <div>
          <i @click="PriseForMessage(info.umid)" :class="{ active: info.praise == true }" class="iconfont icon-dianzan1 hover"></i>
          <i style="color: red" v-if="info.praise == true" class="display">已点赞({{ info.praiseCount }})</i>
          <i v-else class="display">点赞({{ info.praiseCount }})</i>
        </div>
        <div>
          <i class="iconfont icon-yanjing hover2"></i>
          <i class="display">点击量({{ info.hits }})</i>
        </div>
        <div>
          <i class="iconfont icon-pingbi1 hover"></i>
          <i class="display">屏蔽</i>
        </div>
        <div>
          <i
            @click="
              JBVisible = true
              JBumid = info.umid
            "
            class="iconfont icon-chakantiezigengduojubao hover"
          ></i>
          <i class="display">举报</i>
        </div>
        <div>
          <i @click="followUser(user.username)" v-if="userOtherInfo.mineFollow" class="iconfont icon-yiguanzhu hover" style="font-weight: 300; color: red"></i>
          <i @click="followUser(user.username)" v-else class="iconfont icon-guanzhu hover" style="font-weight: 300"></i>
          <i v-if="userOtherInfo.mineFollow" class="display" style="color: red">已关注</i>
          <i v-else class="display">关注</i>
        </div>
      </div>
    </div>
    <el-dialog :close-on-press-escape="false" title="举报" :visible.sync="JBVisible" width="30%" center>
      <span>
        <el-input v-model="JBinfo" type="textarea" placeholder="举报的原因"></el-input>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="JBVisible = false">取 消</el-button>
        <el-button type="primary" @click="JBmessage()">确 定</el-button>
      </span>
    </el-dialog>
    <div class="center-line">
      <div></div>
    </div>
    <div class="comment">
      <div class="CommentHeat">
        <div>
          <span>评论</span>
          <span>{{ info.replyCount }}</span>
        </div>
        <div>
          <span @click="orderBy = 1" :class="{ active: orderBy == 1 }">时间</span>
          <span>|</span>
          <span @click="orderBy = 2" :class="{ active: orderBy == 2 }">热度</span>
        </div>
      </div>
      <div class="AddComment"> <input type="text" v-model="replyInfo" placeholder="快来沙发╭(′▽`)╭(′▽`)╯" /><button @click="Reply()">评论</button> </div>
      <div class="nocomment" v-if="CommomVisible">还没有人评论哦，快来沙发吧(づ￣ 3￣)づ </div>
      <div v-else class="comment-body" v-for="c in commentlist" :key="c.umrid">
        <div>
          <img class="comment-img" :src="c.userInfo.img" alt="" />
          <div>{{ c.user.nickname }}</div>
        </div>
        <div class="comment-info">
          <div class="comment-title">{{ c.info }}</div>
          <div class="comment-info-other">
            <div class="comment-operate">
              <div>
                <i @click="praiseComment(c.umrid)" :class="{ active: c.praise }" class="iconfont hover">&#xe613;</i>
                <i style="color: red" v-if="c.praise == true" class="display">已点赞({{ c.praiseCount }})</i>
                <i v-else class="display">点赞({{ c.praiseCount }})</i>
              </div>
              <div>
                <i class="iconfont hover">&#xe61e;</i>
                <i class="display">屏蔽</i>
              </div>
              <div>
                <i
                  @click="
                    JBCVisible = true
                    JBcumrid = c.umrid
                  "
                  class="iconfont hover"
                  >&#xe662;</i
                >
                <i class="display">举报</i>
              </div>
            </div>
            <div class="comment-time">
              <div>{{ c.lastupdate | timer }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="block">
        <el-pagination :hide-on-single-page="true" @current-change="handleCurrentChange" :page-size="page.pageSize" layout="total, prev, pager, next, jumper" :total="page.total"> </el-pagination>
      </div>
    </div>
    <el-dialog :close-on-press-escape="false" title="举报" :visible.sync="JBCVisible" width="30%" center>
      <span>
        <el-input v-model="JBCinfo" type="textarea" placeholder="举报的原因"></el-input>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="JBCVisible = false">取 消</el-button>
        <el-button type="primary" @click="JBmessage()">确 定</el-button>
      </span>
    </el-dialog>
    <bei-an></bei-an>
  </div>
</template>

<script>
import tools from '@/js/tools'
import LoginQueryInfo from '@/components/Login&QueryInfo.vue'
import BeiAn from '@/components/BeiAn.vue'
let app
export default {
  components: { LoginQueryInfo, BeiAn },
  name: 'MessageDetail',
  data() {
    return {
      title: '留言详情',
      LoginVisible: false,
      loading: false,
      umid: '',
      info: '',
      user: '',
      userInfo: '',
      userOtherInfo: '',
      page: {},
      commentlist: {},
      JBVisible: false,
      JBinfo: '',
      JBumid: 0,
      JBCVisible: false,
      JBCinfo: '',
      JBcumrid: 0,
      LoginProp: false,
      CommomVisible: false,
      orderBy: 1,
      replyInfo: '',
    }
  },
  computed: {
    userinfo() {
      return this.$store.state.loginUser
    },
  },
  methods: {
    // 评论
    Reply() {
      tools.ajax('/message/addReply', { umid: app.umid, info: app.replyInfo }, (data) => {
        console.log(data.message)
        if (data.success) {
          tools.ajax('/message/queryDetail', { umid: app.umid, pageNumber: app.page.pageNumber, pageSize: 5, orderBy: app.orderBy }, (data) => {
            app.info = data.info
            app.user = data.info.user
            app.commentlist = data.list
            if (app.commentlist.length == 0) {
              app.CommomVisible = true
            }
            app.page = data.page
            app.userOtherInfo = app.info.userOtherInfo
            app.userInfo = app.info.userInfo
          })
        }
      })
    },
    // 进入用户中心
    ToUserCebter() {
      app.$router.push({
        path: '/UserDetail',
        query: {
          what: 'themself',
          username: app.user.username,
        },
      })
    },
    // 评论分页
    handleCurrentChange(val) {
      app.page.pageNumber = val
      console.log(`当前页: ${val}`)
      app.queryMessage()
    },
    // 关注用户
    followUser(username) {
      tools.ajax('/message/followUser', { username: username }, () => {
        app.queryMessage()
      })
    },
    // 举报评论
    JBcommont() {
      tools.ajax('/message/examineReply', { info: app.JBCinfo, umrid: app.JBcumrid }, (data) => {
        if (data.success) {
          app.JBCVisible = false
          app.queryMessage()
        }
        app.$message.warning(data.message)
      })
    },
    // 举报留言
    JBmessage() {
      app.$message.success(app.JBumid)
      tools.ajax(
        '/message/examine',
        {
          info: app.JBinfo,
          umid: app.JBumid,
        },
        (data) => {
          if (data.success) {
            app.JBVisible = false
            app.queryMessage()
          }
          app.$message.warning(data.message)
        }
      )
    },
    // 点赞评论
    praiseComment(umrid) {
      if (app.userinfo.isLogin) {
        tools.ajax('/message/supportReply', { umrid: umrid }, () => {
          this.queryMessage()
        })
      } else {
        app.$message.error('请先登录，正在跳转登录')
        setTimeout(() => {
          app.$router.push('/Login')
        }, 1500)
      }
    },
    // 查询留言id
    queryUmid() {
      app.umid = app.$route.query.umid
    },
    // 根据留言id查询留言
    queryMessage() {
      tools.ajax('/message/queryDetail', { umid: app.umid, pageNumber: app.page.pageNumber, pageSize: 5, orderBy: app.orderBy }, (data) => {
        app.info = data.info
        app.user = data.info.user
        app.commentlist = data.list
        if (app.commentlist.length == 0) {
          app.CommomVisible = true
        }
        app.page = data.page
        app.userOtherInfo = app.info.userOtherInfo
        app.userInfo = app.info.userInfo
      })
    },
    // 给留言点赞
    PriseForMessage(umid) {
      if (app.userinfo.isLogin == true) {
        tools.ajax('/message/support', { umid: umid }, (date) => {
          if (date.success) {
            app.queryMessage()
          } else {
            app.$message.error(date.message)
          }
        })
      } else {
        app.$message.error('请先登录，正在跳转登录')
        setTimeout(() => {
          app.$router.push('/Login')
        }, 1500)
      }
    },
  },
  created() {
    app = this
    app.queryUmid()
    app.queryMessage()
    // pathname

    // tools.isPhone(location.pathname, tools.getBrowserInfo)
  },
  watch: {
    orderBy() {
      app.queryMessage()
    },
  },
}
</script>
<style scoped>
@import '../../css/messagedetail/messagedetail.css';
@import '../../css/commom.css';
</style>
