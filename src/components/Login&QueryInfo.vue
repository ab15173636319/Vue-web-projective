<template>
  <div class="position">
    <div class="topbar">
      <div @mouseenter="DisplayUser()" @mouseleave="noDisplayUser()" v-if="userinfo.isLogin == true" class="user-title">
        <img v-if="userinfo.tbUserInfo.img" :src="userinfo.tbUserInfo.img" alt="" />
        <img v-else src="https://pic3.zhimg.com/v2-83296272d2431fd53e17bef56652cdc1_r.jpg?source=1940ef5c" alt="" />
        <div class="userInfoDivOut">
          <div v-if="userVisible" class="userInfoDiv">
            <div class="userInfoDiv-title">{{ userinfo.tbUser.nickname }}</div>
            <div class="userInfoDiv-fans">
              <div @click="ToUserCebter"
                ><i class="iconfont icon-youxiang"></i><i>动态({{ userinfo.userOtherInfo.supporteMessage + userinfo.userOtherInfo.supporteReply }})</i></div
              >
              <div @click="ToUserCebter"
                ><i class="iconfont icon-ganxingquzhiwei"></i><i>粉丝({{ userinfo.userOtherInfo.followMe }})</i></div
              >
              <div @click="ToUserCebter"
                ><i class="iconfont icon-icon-fensi"></i><i>关注({{ userinfo.userOtherInfo.follow }})</i></div
              >
            </div>
            <div class="userInfoDiv-usercenter">
              <div class="userInfoDiv-user-center" @click="routerTouser()">用户中心<i class="fa-solid fa-chevron-right"></i></div>
            </div>
            <div class="userInfoDiv-usercenter">
              <div class="userInfoDiv-user-center" @click="routerToFriend()">社交<i class="fa-solid fa-chevron-right"></i></div>
            </div>
            <div class="logout"><el-button @click="exite()" type="danger">退出登录</el-button></div>
          </div>
        </div>
      </div>
      <div v-else class="user-title logout"><el-button @click="LoginVisible = true">登录</el-button></div>
      <!-- <button @click="$router.push('/lottery')">抽奖</button> -->
      <div class="addmessage" @click="AddVisible = true"><i class="iconfont icon-add"></i>发布留言</div>
    </div>
    <!-- 添加留言弹出框 -->
    <div class="messagemeun" v-if="AddVisible">
      <div><i @click="AddVisible = false" class="iconfont icon-chacha"></i></div>
      <form action="" :class="{ active: AddVisible }">
        <div>
          <div style="border: 1px solid #ccc">
            <Toolbar style="border-bottom: 1px solid #ccc" :editor="editor" :defaultConfig="toolbarConfig" :mode="mode" />
            <Editor style="height: 350px; width: 100%; overflow-y: hidden" v-model="html" :defaultConfig="editorConfig" :mode="mode" @onCreated="onCreated" />
          </div>
        </div>
        <div><input v-model="AddmessageInfo.title" placeholder="请输入内容标题" type="text" /></div>
        <div class="addBtn">
          <div @click="Addmessage()">发布</div>
        </div>
      </form>
    </div>
    <!-- 登录弹出框 -->
    <el-dialog width="400px" :close-on-press-escape="false" :close-on-click-modal="false" title="登录" :visible.sync="LoginVisible">
      <el-form :rules="rules" :model="login" ref="login">
        <el-form-item label="账号" prop="username">
          <el-input v-model="login.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="login.password"></el-input>
        </el-form-item>
        <el-form-item>
          <a href="/Reg">我要创建一个账号</a>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="LoginVisible = false">取 消</el-button>
        <el-button type="warning" @click="Blank('login')">清 空</el-button>
        <el-button type="primary" @click="loginInfo()">登录</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import tools from '@/js/tools'
// import AnnounceMent from './AnnounceMent.vue'
import 'animate.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
// import tools from '../../js/tools'
let app
export default {
  components: { Editor, Toolbar },
  name: 'LoginQuery',
  data() {
    var validatePass = (rule, value, callback) => {
      if (value == '') {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value == '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      rules: {
        username: [{ validator: validatePass, tigger: blur }],
        password: [{ validator: validatePass2, tigger: blur }],
      },
      userVisible: false,
      allNumber: '',
      LoginVisible: false,
      itemNmae: '',
      login: {
        username: '',
        password: '',
      },
      editor: null,
      html: '<p></p>',
      toolbarConfig: {},
      editorConfig: { placeholder: '请输入内容......' },
      mode: 'default', // or 'simple'
      AddVisible: false,
      AddmessageInfo: {
        title: '',
        info: '',
      },
      ChildPeop: false,
    }
  },
  computed: {
    userinfo() {
      return this.$store.state.loginUser
    },
  },
  mounted() {},
  beforeDestroy() {
    const editor = this.editor
    if (editor == null) return
    editor.destroy() // 组件销毁时，及时销毁编辑器
  },
  props: {
    LoginIsVisible: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    // 进入社交页
    routerToFriend() {
      app.$router.push('/friend')
    },
    // 进入用户中心
    ToUserCebter() {
      app.$router.push({
        path: '/UserDetail',
        query: {
          what: 'Myself',
          username: app.userinfo.tbUser.username,
        },
      })
    },
    // 用户弹出框出现
    DisplayUser() {
      setTimeout(() => {
        app.userVisible = true
        console.log(app.userVisible)
      }, 500)
    },
    noDisplayUser() {
      setTimeout(() => {
        app.userVisible = false
        console.log(app.userVisible)
      }, 500)
    },
    queryMessage() {
      tools.ajax('/message/queryAll', app.messageabout, () => {})
    },
    Addmessage() {
      app.AddmessageInfo.info = app.html
      tools.ajax('/message/add', app.AddmessageInfo, (data) => {
        app.$message.warning(data.message)
        if (data.success) {
          app.AddVisible = false
          app.queryMessage()
        }
      })
    },
    onCreated(editor) {
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
    },
    routerTouser() {
      this.$router.push({
        path: '/user',
        query: {
          what: 'home',
        },
      })
    },
    exite() {
      tools.ajax('/user/auth/logout', {}, (data) => {
        app.$store.dispatch('updateUserInfo')
        if (data.success) {
          app.$message.warning(data.message)
          app.queryuser()
        }
      })
    },
    loginInfo() {
      app.login.password = tools.md5(app.login.password)
      tools.ajax('/user/auth/login', app.login, (data) => {
        app.$store.dispatch('updateUserInfo')
        if (data.success) {
          app.LoginVisible = false
          app.login = {
            password: '',
            username: '',
          }
        }
        app.$message.warning(data.message)
      })
    },
    toMyfollow() {
      app.$router.push('/MyfollowView')
    },
    toMyfans() {
      app.$router.push('/MessageFans')
    },

    mymessage() {
      app.$router.push('/Mymessage')
    },
    Blank(form) {
      app.$refs[form].resetFields()
    },
  },
  watch: {
    LoginIsVisible(v) {
      app.LoginVisible = v
    },
    LoginVisible(c) {
      console.log()
      console.log('变了', c, this.LoginIsVisible)
    },
  },
  created() {
    app = this
    setInterval(() => {
      // console.log(app.LoginVisible)
      // console.log(this.LoginIsVisible)
    })
  },
}
</script>
<style>
@import '../css/components/Login&Query.css';
@import '@wangeditor/editor/dist/css/style.css';
</style>
