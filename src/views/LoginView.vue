<template>
  <div class="loginreg">
    <div>
      <el-card style="background-color: #fff">
        <div slot="header">{{ title }}</div>
        <div>
          <el-form :model="user" v-loading="loading" :rules="rules" ref="login">
            <el-form-item prop="username">
              <el-input v-model="user.username" placeholder="账号">
                <i slot="prefix" class="el-input--icon iconfont">&#xe600;</i>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" show-password v-model="user.password" placeholder="密码">
                <i slot="prefix" class="el-input__icon iconfont">&#xe8b2;</i>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-link type="info" :underline="false" @click="toupdeate()">忘记密码了？</el-link>
            </el-form-item>
            <el-form-item class="tc">
              <el-button @click="login()" type="primary">登录</el-button>
              <el-button @click="reset()" type="danger">重填</el-button>
              <el-button @click="toReg()" type="danger">注册</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
    <bei-an></bei-an>
  </div>
</template>

<script>
import tools from '@/js/tools'
import BeiAn from '@/components/BeiAn.vue'
let app
export default {
  components: { BeiAn },
  name: 'LoginView',
  data() {
    return {
      title: '用户注册登录',
      user: {
        username: '',
        password: '',
      },
      loading: false,
    }
  },
  methods: {
    login() {
      app.loading = true
      app.user.password = tools.md5(app.user.password)
      tools.ajax('/user/auth/login', app.user, (data) => {
        if (data.success) {
          this.$store.dispatch('updateUserInfo')
          app.$message.success(data.message)
          app.loading = false
          app.$router.push('/')
        } else {
          app.loading = false
          app.$message.error(data.message)
        }
      })
    },
    reset() {
      app.$refs.login.resetFields()
    },
    toReg() {
      app.$router.push('/Reg')
    },
    toupdeate() {
      app.$router.push('/update')
    },
  },
  created() {
    app = this
    console.log(app.title)
  },
}
</script>
<style scoped>
@import '../css/login&reg.css';
</style>
