<template>
  <div class="loginreg">
    <el-card style="background-color: #fff">
      <div slot="header">{{ title }}</div>
      <div>
        <el-form :model="reginfo" v-loading="" ref="reg">
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
            <el-button @click="Reg()" type="primary">保存</el-button>
            <el-button @click="reset()" type="danger">重填</el-button>
            <el-button @click="toReg()" type="danger">返回登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
// import tools from '../../js/tools'
let app
export default {
  name: 'UserInfo',
  data() {
    return {
      title: '用户附加信息修改',
    }
  },
  methods: {},
  created() {
    app = this
    console.log(app.title)
  },
}
</script>
