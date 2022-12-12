<template>
  <div class="loginreg">
    <div>
      <el-card style="background-color: #fff">
        <div slot="header">{{ title }}</div>
        <div>
          <el-form :model="reginfo" v-loading="" ref="reg">
            <el-form-item prop="nickname">
              <el-input v-model="reginfo.nickname" placeholder="昵称">
                <i slot="prefix" class="el-input--icon iconfont">&#xe600;</i>
              </el-input>
            </el-form-item>
            <el-form-item prop="username">
              <el-input v-model="reginfo.username" placeholder="账号">
                <i slot="prefix" class="el-input--icon iconfont">&#xe600;</i>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" show-password v-model="reginfo.password" placeholder="密码">
                <i slot="prefix" class="el-input__icon iconfont">&#xe8b2;</i>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" show-password v-model="reginfo.password2" placeholder="确认密码">
                <i slot="prefix" class="el-input__icon iconfont">&#xe8b2;</i>
              </el-input>
            </el-form-item>
            <el-form-item class="tc">
              <el-button @click="Reg()" type="primary">注册</el-button>
              <el-button @click="reset()" type="danger">重填</el-button>
              <el-button @click="tologin()" type="danger">返回登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>

    <bei-an></bei-an>
  </div>
</template>

<script>
import BeiAn from '@/components/BeiAn.vue'
import tools from '@/js/tools'
// import tools from '../../js/tools'
let app
export default {
  components: { BeiAn },
  name: 'RegView',
  data() {
    return {
      title: '用户注册',
      reginfo: {
        nickname: '',
        username: '',
        password: '',
        password2: '',
      },
    }
  },
  methods: {
    Reg() {
      let key = app.reginfo.password
      let value = app.reginfo.password2
      switch (key) {
        case value:
          app.reginfo.password = tools.md5(app.reginfo.password)
          tools.ajax('/user/auth/reg', app.reginfo, (data) => {
            if (data.success) {
              app.$message.success('注册成功，正在跳转登录')
              setTimeout(() => {
                app.$router.push('/Login')
              }, 2000)
            } else {
              app.$message.error(data.message)
            }
          })

          break

        default:
          alert('密码不一致')
          break
      }
    },
    tologin() {
      app.$router.push('/Login')
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
