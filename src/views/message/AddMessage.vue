<template>
  <div class="main">
    <a class="back" type="primary" @click="$router.back()"><i class="fa-solid fa-backward"></i></a>
    <div class="form">
      <el-input class="addtextarea" rows="10" type="textarea" placeholder="请输入内容" v-model="textarea" maxlength="500" show-word-limit> </el-input>
      <div style="margin: 20px 0"></div>
      <div class="titletext">
        <el-input type="text" placeholder="请输入内容" v-model="text" maxlength="20" show-word-limit> </el-input>
        <el-button @click="IncreaseMessage()" type="primary"><i class="fa-regular fa-paper-plane" style="margin: 0px 10px"></i>发送</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import tools from '@/js/tools'
// import tools from '../../js/tools'
let app
export default {
  name: 'AddMessage',
  data() {
    return {
      title: '用户注册',
      textarea: '',
      text: '',
    }
  },
  methods: {
    IncreaseMessage() {
      tools.ajax('/message/add', { info: app.textarea, title: app.text }, (data) => {
        app.$message(data.message)
        if (data.success) {
          app.$router.back()
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
@import '../../css/AddMessage.css';
@import 'https://cdn.bootcdn.net/ajax/libs/font-awesome/6.2.0/css/all.css';
</style>
