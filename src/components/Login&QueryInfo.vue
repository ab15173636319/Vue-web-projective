<template>
  <div class="UserOuter">
    <span class="hover-span">
      <img v-if="userInfo.img" :src="userInfo.img" />
      <img v-else src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
    </span>
    <div slot="dropdown" v-if="code == 200" class="display-div">
      <div>
        <div class="nickname">
          <div
            ><i class="iconfont">&#xe8c8;</i>
            <i
              ><user>{{ user.nickname }}</user></i
            ></div
          ></div
        >
        <div class="userfans">
          <div><i class="iconfont">&#xe8b7;</i> <i>动态管理</i></div
          ><i class="iconfont">&#xe607;</i></div
        >
        <div class="usercenter">
          <div><i class="iconfont">&#xe600;</i> <i>个人中心</i></div
          ><i class="iconfont">&#xe607;</i></div
        >
        <div class="exite">
          <div><i class="iconfont">&#xe647;</i> <i>退出登录</i></div></div
        >
      </div>
    </div>
    <div slot="dropdown" v-else>
      <el-dropdown-item> <el-button @click="tologin()" type="danger">登录</el-button></el-dropdown-item>
    </div>
  </div>
</template>

<script>
import tools from '@/js/tools'
// import tools from '../../js/tools'
let app
export default {
  name: 'LoginQuery',
  data() {
    return {
      title: '1',
      code: '',
      user: '',
      userInfo: '',
      userotherinfo: '',
      allNumber: '',
    }
  },
  methods: {
    queryuser() {
      tools.ajax('/user/auth/getUserInfo', {}, (data) => {
        app.code = data.code
        app.user = data.tbUser
        app.userInfo = data.tbUserInfo
        app.userotherinfo = data.userOtherInfo
        app.allNumber = app.userotherinfo.reply + app.userotherinfo.message
      })
    },
    exite() {
      tools.ajax('/user/auth/logout', {}, (data) => {
        if (data.success) {
          app.$message.warning(data.message)
          // setTimeout(() => {
          //   app.$router.push('/Login')
          // })
          app.queryuser()
          app.queryMessage()
        }
      })
    },
    tologin() {
      app.$router.push('/Login')
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
  },
  created() {
    app = this
    app.queryuser()
  },
}
</script>
<style>
@import '../css/message.css';
@import '../css/media.css';
.UserOuter {
  width: 50px;
  /* line-height: 64px; */
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  /* background-color: aqua; */
}
.hover-span {
  cursor: pointer;
  height: auto;
  position: absolute;
}

.hover-span img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  transition: width 0.3s, height 0.3s, top 0.15s, right 0.5s;
}

.UserOuter:hover .hover-span img {
  z-index: 999;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  position: absolute;
  top: 14px;
  right: -10px;
}

.display-div {
  display: none;
  width: 240px;
  /* height: 200px; */
  transform-origin: center center;
  position: absolute;
  top: 64px;
  background-color: #fff;
  right: 0px;
  box-shadow: 3px 3px 10px black;
  border-radius: 5%;
}

.UserOuter:hover .display-div {
  border-radius: 5%;
  display: flex;
  /* width: 300px; */
}

i {
  font-style: normal;
}
.display-div > div > div {
  width: 200px;
  display: flex;
  cursor: pointer;
  margin: 10px 20px;
  line-height: 30px;
}

.display-div > div > div > div:first-child i {
  margin: 5px 10px;
}

.nickname {
  font-weight: bold;
}

.usercenter,
.userfans {
  display: flex;
  justify-content: left;
  position: relative;
}

.usercenter > i,
.userfans > i {
  position: absolute;
  right: 10px;
}

.userfans:hover,
.usercenter:hover {
  background-color: rgb(227, 229, 231);
  border-radius: 5px;
}
</style>
