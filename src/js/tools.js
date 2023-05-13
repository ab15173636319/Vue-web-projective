// npm install的插件和js直接不需要路径就能导入
import qs from 'qs'
import axios from 'axios'
import spark from 'spark-md5'
import router from '@/router'

// 后端接口的服务器基础地址/doc.html#/default/%E7%AE%80%E6%98%93%E7%95%99%E8%A8%80%E6%9D%BF/queryAllUsingPOST_8
const SERVER_BASE_URL = 'https://service.huhuiyu.top/teach_project_service'
// 本地存储token的名称
const SERVER_TOKEN_KEY = 'huhuiyu.teach.token'
// 本地存储开发者key的名称

// 保存服务器token信息
function saveToken(data) {
  if (data && data.token) {
    localStorage.setItem(SERVER_TOKEN_KEY, data.token)
  }
}

// 加载本地存储的token信息
function loadToken() {
  let token = localStorage.getItem(SERVER_TOKEN_KEY)
  return token ? token : ''
}

// 这里面的js按照es6的module规范编写即可
let tools = {
  info: '通用工具类',
  test() {
    // console.log('js导入测试', qs, axios, spark)
  },
  // md5加密方法
  md5(info) {
    if (info && info.trim() != '') {
      return spark.hash(info)
    }
    return ''
  }, // ajax请求对象
  // ajax的要素：1：后端api的path，2：请求的参数
  // 3：应答结果的处理回调function，4：请求的方式（可选，默认为post）

  get(path, params, cb) {
    // 完整的请求路径
    let url = SERVER_BASE_URL + path
    // 请求参数的处理（需要qs）
    let data = qs.stringify(params, { allowDots: true })
    url = url + '?' + data
    // 通过axios发起ajax请求
    let promise = axios({
      url: url,
      data: data,
      method: 'get',
      // token需要通过头信息传递
      headers: {
        token: loadToken(),
      },
    })
    // 应答结果的处理
    promise
      .then((resp) => {
        // 保存token
        saveToken(resp.data)
        // 回调只需要应答的服务器端数据，不需要完整的resp信息
        cb(resp.data)
      })
      // es6的箭头函数
      .catch((error) => {
        console.error('请求异常：', error)
        // 定制错误请求信息
        cb({ code: 500, success: false, message: '请求异常' })
      })
  },
  ajax(path, params, cb) {
    // 完整的请求路径
    let url = SERVER_BASE_URL + path
    // 请求参数的处理（需要qs）
    let data = qs.stringify(params, { allowDots: true })
    // 通过axios发起ajax请求
    let promise = axios({
      url: url,
      data: data,
      method: 'post',
      // token需要通过头信息传递
      headers: {
        token: loadToken(),
      },
    })
    // 应答结果的处理
    promise
      .then((resp) => {
        // 保存token
        saveToken(resp.data)
        // 回调只需要应答的服务器端数据，不需要完整的resp信息
        cb(resp.data)
      })
      // es6的箭头函数
      .catch((error) => {
        console.error('请求异常：', error)
        // 定制错误请求信息
        cb({ code: 500, success: false, message: '请求异常' })
      })
  },

  // ajax文件上传
  // 参数1：上传的文件
  // 参数2：请求的参数
  // 参数3：请求的回调处理function
  upload(file, params, cb) {
    if (!file) {
      cb({ code: 500, success: false, message: '请选择文件' })
      return
    }
    if (file.size >= 2 * 1024 * 1024) {
      cb({ code: 500, success: false, message: '文件太大' })
      return
    }
    // ajax文件上传必须使用FormData处理
    let data = new FormData()
    data.append('file', file)
    // 处理请求参数
    for (let key in params) {
      data.append(key, params[key])
    }
    // 发起请求
    let promise = axios({
      url: SERVER_BASE_URL + '/user/file/upload',
      data: data,
      method: 'post',
      headers: {
        token: loadToken(),
        'Content-Type': 'multipart/form-data',
      },
    })

    // 应答结果的处理
    promise
      .then((resp) => {
        // console.log('ajax请求结果：', resp)
        // 保存token
        saveToken(resp.data)
        // 回调只需要应答的服务器端数据，不需要完整的resp信息
        cb(resp.data)
      })
      // es6的箭头函数
      .catch((error) => {
        console.error('请求异常：', error)
        // 定制错误请求信息
        cb({ code: 500, success: false, message: '请求异常' })
      })
  },

  openFile(cb, accept) {
    let file = document.createElement('input')
    file.setAttribute('type', 'file')
    file.setAttribute('accept', 'image/png/gif')
    if (accept) {
      file.setAttribute('accept', accept)
    }
    file.addEventListener('change', function () {
      cb(file.files[0])
    })
    file.click()
  },

  // 预览图片（获取图片信息）,参数1是文件对象，参数2是读取完成后的回馈
  loadImgData(file, cb) {
    if (!file) {
      cb('')
      return
    }
    // 读取图片文件内容
    let fr = new FileReader()
    // 监听文件读取完成事件
    fr.addEventListener('load', function () {
      cb(fr.result)
    })
    // 读取
    fr.readAsDataURL(file)
  },

  // 获取fid对应的文件下载链接地址
  getDownloadUrl(fid) {
    return SERVER_BASE_URL + '/user/file/download?fid=' + fid
  },
  // 获取开发者密钥
  getAccessKey() {
    return '42c7dba5-a802-46c4-b9e9-5c1fb250b0ef'
  },
  // 合并任意数量的json对象
  concatJson() {
    // 不定数量参数
    // console.log('参数数组' + arguments)
    let result = {}
    for (let i = 0; i < arguments.length; i++) {
      // 参数循环，逐个获取json参数
      let info = JSON.parse(JSON.stringify(arguments[i]))
      // json循环
      for (let key in info) {
        result[key] = info[key]
      }
    }
    return result
  },
  // 合并两个json对象
  // 判断是否是手机端还是pc段的方法
  getBrowserInfo() {
    let browser = {
      versions: (() => {
        let u = navigator.userAgent
        // let app = navigator.appVersion;
        return {
          trident: u.indexOf('Trident') > -1, //IE内核
          presto: u.indexOf('Presto') > -1, //opera内核
          webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
          gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
          mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
          ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
          android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
          iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
          iPad: u.indexOf('iPad') > -1, //是否iPad
          webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
          weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
          qq: u.match(/\sQQ/i) == ' qq', //是否QQ
        }
      })(),
      language: (navigator.browserLanguage || navigator.language).toLowerCase(),
    }

    return browser
  },

  judgment() {
    var sUserAgent = navigator.userAgent
    return sUserAgent.indexOf('Android') > -1 || sUserAgent.indexOf('iPhone') > -1 || sUserAgent.indexOf('iPad') > -1 || sUserAgent.indexOf('iPod') > -1 || sUserAgent.indexOf('Symbian') > -1
  },

  isPhone(path, isphone) {
    if (isphone == true) {
      router.push(path)
    } else {
      router.push('/mobile')
    }
  },

  isload() {
    var oldonload = window.onload
    // let boo = false
    // if (typeof window.onload != 'function') {
    //   boo = true
    // } else {
    //   boo = false
    // }
    return oldonload
  },
}

export default tools
