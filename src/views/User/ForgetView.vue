<template>
  <div class="loginreg">
    <el-card style="background-color: #fff">
      <div slot="header">{{ title }}</div>
      <div>
        <el-form :model="user" v-loading="loading" :rules="rules" ref="login">
          <el-form-item prop="username">
            <el-input v-model="user.username" placeholder="账号">
              <i slot="prefix" class="el-input--icon iconfont">&#xe600;</i>
            </el-input>
          </el-form-item>
          <el-form-item> <el-input></el-input><el-button @click.prevent="removeDomain(domain)">删除</el-button> </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" show-password v-model="user.password" placeholder="密码">
              <i slot="prefix" class="el-input__icon iconfont">&#xe8b2;</i>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" show-password v-model="user.password" placeholder="确认密码">
              <i slot="prefix" class="el-input__icon iconfont">&#xe8b2;</i>
            </el-input>
          </el-form-item>
          <el-form-item class="tc">
            <el-button @click="login()" type="primary">确认</el-button>
            <el-button @click="reset()" type="danger">重填</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import tools from '@/js/tools'
// import tools from '../../js/tools'
let app
export default {
  name: 'ForgetPassword',
  data() {
    return {
      title: '用户注册',
      message: '',
      user: {},
      imgcode: {},
    }
  },
  methods: {
    getImg() {
      tools.ajax('/tool/getImageCode', {}, (data) => {
        app.message = data.message
      })
    },
  },
  created() {
    app = this
    app.getImg()
    console.log(app.title)
  },
}
</script>
