<template>
  <div class="position">
    <div class="topbar">
      <!-- <div class="information"><i class="iconfont">&#xe62e;</i>消息</div> -->
      <div @mouseenter="changeHeight()" @mouseleave="changeHeight2()" v-if="userinfo.isLogin == true" class="user-title">
        <img v-if="userinfo.tbUserInfo.img" :src="userinfo.tbUserInfo.img" alt="" />
        <img v-else src="https://pic3.zhimg.com/v2-83296272d2431fd53e17bef56652cdc1_r.jpg?source=1940ef5c" alt="" />
        <div @mouseenter="changeHeight()" @mouseleave="changeHeight2()" class="userInfoDiv" :style="{ height: height2, opacity: opacity2, display: display2 }">
          <div class="userInfoDiv-title">{{ userinfo.tbUser.nickname }}</div>
          <div class="userInfoDiv-fans">
            <div
              ><i class="fa-solid fa-clipboard"></i><i>动态({{ userinfo.userOtherInfo.supporteMessage + userinfo.userOtherInfo.supporteReply }})</i></div
            >
            <div
              ><i class="fa-solid fa-heart"></i><i>粉丝({{ userinfo.userOtherInfo.followMe }})</i></div
            >
            <div
              ><i class="fa-solid fa-handshake"></i><i>关注({{ userinfo.userOtherInfo.follow }})</i></div
            >
          </div>
          <div class="userInfoDiv-usercenter">
            <div class="userInfoDiv-user-center" @click="routerTouser()">用户中心<i class="fa-solid fa-chevron-right"></i></div>
          </div>
          <div class="logout"><el-button @click="exite()" type="danger">退出登录</el-button></div>
        </div>
      </div>
      <div v-else class="user-title logout"><el-button @click="LoginVisible = true">登录</el-button></div>
      <div class="addmessage" @click="$router.push('/AddMessage')"><i class="fa-regular fa-square-plus"></i>发布留言</div>
    </div>
    <announce-ment></announce-ment>
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
import AnnounceMent from './AnnounceMent.vue'
// import tools from '../../js/tools'
let app
export default {
  components: { AnnounceMent },
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
      title: '1',
      // code: '',
      // user: '',
      // userInfo: '',
      // userotherinfo: '',
      allNumber: '',
      LoginVisible: false,
      itemNmae: '',
      login: {
        username: '',
        password: '',
      },
      height2: '',
      opacity2: '0',
      display2: 'none',
    }
  },
  computed: {
    userinfo() {
      return this.$store.state.loginUser
    },
  },
  methods: {
    routerTouser() {
      this.$router.push({
        path: '/user',
        query: {
          what: 'home',
        },
      })
    },
    changeHeight() {
      setTimeout(() => {
        this.height2 = 'auto'
        this.opacity2 = '1'
        this.display2 = 'block'
      }, 0.5 * 1000)
    },
    changeHeight2() {
      setTimeout(() => {
        this.height2 = '0px'
        this.opacity2 = '0'
        this.display2 = 'none'
      }, 0.5 * 1000)
    },
    exite() {
      tools.ajax('/user/auth/logout', {}, (data) => {
        this.$store.dispatch('updateUserInfo')
        if (data.success) {
          app.changeHeight2()
          app.$message.warning(data.message)
          app.queryuser()
        }
      })
    },
    loginInfo() {
      app.login.password = tools.md5(app.login.password)
      tools.ajax('/user/auth/login', app.login, (data) => {
        this.$store.dispatch('updateUserInfo')
        if (data.success) {
          app.changeHeight2()
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
  created() {
    app = this
    console.log(this.userinfo)
  },
}
</script>
<style>
@import '../css/components/Login&Query.css';
</style>
