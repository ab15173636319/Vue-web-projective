<template>
  <div class="meun">
    <el-button-group>
      <el-button @click="decide = 'phone'" type="primary" icon="el-icon-phone">通过手机找回</el-button>
      <el-button @click="decide = 'email'" type="primary" icon="el-icon-eleme">通过邮箱找回</el-button>
    </el-button-group>
    <el-form v-if="decide == 'phone'" :model="ruleForm" status-icon :rules="rules" ref="" label-width="100px" class="demo-ruleForm form" size="small">
      <el-form-item label="账户名称" prop="">
        <el-input type="password" v-model="update.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="" class="send-emailcode">
        <el-input class="send-emailcode" type="phone" v-model="phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item class="button">
        <el-button type="">发送验证码</el-button>
      </el-form-item>
      <el-form-item label="密码" prop="">
        <el-input type="password" v-model="update.code" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="">
        <el-input type="password" v-model="update.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认" prop="">
        <el-input type="password" v-model="update.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="1">提交</el-button>
        <el-button @click="1">重置</el-button>
      </el-form-item>
    </el-form>

    <el-form v-if="decide == 'email'" :model="ruleForm" status-icon :rules="rules" ref="" label-width="100px" class="demo-ruleForm form" size="small">
      <el-form-item label="账户名称" prop="">
        <el-input type="password" v-model="update.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱地址" prop="" class="send-emailcode">
        <el-input class="send-emailcode" type="email" v-model="email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item class="button">
        <el-button type="">发送验证码</el-button>
      </el-form-item>
      <el-form-item label="密码" prop="">
        <el-input type="password" v-model="update.code" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="">
        <el-input type="password" v-model="update.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认" prop="">
        <el-input type="password" v-model="update.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="1">提交</el-button>
        <el-button @click="1">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import tools from '@/js/tools'
// import tools from '../../js/tools'
let app
export default {
  name: 'ForgetPass',
  data() {
    return {
      title: '用户忘记密码',
      decide: 'phone',
      email: '',
      phone: '',
      update: {
        code: '',
        username: '',
        password: '',
      },
      // rules:[]
    }
  },
  methods: {
    UPByEmail() {
      tools.ajax('/user/auth/findPwdByEmail', app.update, (data) => {
        if (data.success) {
          //如果修改成功就会弹出提示框提示用户，
          app.$message.success('修改成功')
          //通过路由跳转到登录界面
          app.$router.push('/login')
        } else {
          //如果未成功就弹出错误理由，
          app.$message.error(data.message)
          //并清空用户填写的内容
          app.update = {
            code: '',
            username: '',
            password: '',
          }
        }
      })
    },
  },
  created() {
    app = this
    console.log(app.title)
  },
}
</script>
<style>
.meun {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: antiquewhite;
}
.form {
  padding: 20px 20px 20px 0px;
  /* background-color: aqua; */
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: center;
}
.button {
  padding-left: 10px;
  width: 100%;
}
.color {
  background-color: gray;
  outline: gray;
  border: gray;
}
</style>
