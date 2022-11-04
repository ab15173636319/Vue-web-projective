<template>
  <div>
    <div></div>
    <div>
      <el-button @click="LoginVisible = true">登录</el-button>
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
  </div>
</template>

<script>
import tools from '@/js/tools'
let app
export default {
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
      LoginVisible: false,
      // userInfo: {},
      login: {
        username: '',
        password: '',
      },
    }
  },
  computed: {},
  methods: {
    userinfo() {
      return this.$store.state.loginUser
    },
    loginInfo() {
      app.login.password = tools.md5(app.login.password)
      tools.ajax('/user/auth/login', app.login, (data) => {
        if (data.success) {
          this.$store.dispatch('updateUserInfo').then(this.changeInfo()).catch(this.changeInfo())
          app.LoginVisible = false
        }
      })
    },
    logininfo() {
      this.login.password = tools.md5(app.login.password)
      tools.ajax('/user/auth/login', this.user, () => {
        let userInfo = {
          isLogin: true,
        }
        // 将表示用户已经登录的对象储存在localStorage和Vuex中
        localStorage.setItem('userInfo', JSON.stringify(userInfo))
        this.$store.state.userInfo = userInfo
        console.log('this.$store.state.userInfo', this.$store.state.userInfo)
      })
    },
    changeInfo() {
      this.$emit('status-chang')
    },
  },
  created() {
    app = this
    console.log(app.userinfo)
  },
}
</script>
<style scoped></style>
