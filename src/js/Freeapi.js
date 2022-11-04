import axios from 'axios'
const SERVER_BASE_URL = 'https://api.gmit.vip/Api/'

let free = {
  FreeApi(path, cb, method) {
    let url = SERVER_BASE_URL + path
    method = method ? method : 'post'
    let promise = axios({
      method: method,
      url: url,
      data: {
        format: 'json',
      },
      headers: { 'Content-Type': 'multipart/form-data;charset=UTF-8' },
    })
    promise
      .then((resp) => {
        cb(resp.data)
      })
      .catch((error) => {
        console.error('请求异常：', error)
        cb({ code: 500, success: false, message: '请求异常' })
      })
  },
}

export default free
