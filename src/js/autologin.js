let UserLoginInfo = {
  username: '',
  password: '',
  token: ''
}

import tools from './tools.js'

let AutoLogin = {
  //保存用户输入的正确信息
  StorageInfo(uzh, upwd, token) {
    console.log(uzh, upwd, token)
    UserLoginInfo.username = uzh,
      UserLoginInfo.password = upwd,
      UserLoginInfo.token = token
    uni.setStorageSync("UserKey", JSON.stringify(UserLoginInfo))
  },
  //删除保存的用户信息
  delInfo() {
    uni.removeStorageSync('UserKey')
  },
  //获取保存的信息
  getStorageInfo() {
    let Info = uni.getStorageSync("UserKey")
    return Info
  },
  //判断是否为第一次登录
  isFristLogin() {
    if (this.getStorageInfo() == '') {
      return false
    } else {
      return true
    }
  },
  //自动登录
  AutoLogin() {
    tools.ajax('/user/auth/login', {
      username: JSON.parse(this.getStorageInfo()).username,
      password: tools.md5(JSON.parse(this.getStorageInfo()).password)
    }, (data) => {
      if (data.success) {
        uni.navigateTo({
          url: '/pages/main/main'
        })
      }
    })
  },
  //获取用户信息
  autoGetUserInfo() {
    console.log(JSON.parse(this.getStorageInfo()).token)
    tools.ajax('/user/auth/getUserInfo', {
      token: JSON.parse(this.getStorageInfo()).token
    }, (data) => {
      console.log("信息", data)
    })
  },
}

export default AutoLogin
