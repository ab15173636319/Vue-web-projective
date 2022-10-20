Vue.filter('timer', function (value, format) {
  // console.log('结果' + value);
  format = format ? format : 'yyyy年MM月dd日hh:mm:ss'
  let time = new Date()
  let time2 = new Date()
  time.setTime(value)
  let year = time.getFullYear()
  let mouth = time.getMonth() + 1
  let day = time.getDate()
  let day2 = time2.getDate()
  let hour = time.getHours()
  let min = time.getMinutes()
  let sec = time.getSeconds()
  if (day2 - day == 0) {
    let result = format.replace(/yyyy年MM月dd日/g, '')
    result = result.replace(/hh/g, hour)
    result = result.replace(/mm/g, min)
    result = result.replace(/ss/g, sec)
    return result
  } else if (day2 - day == 1) {
    let result = format.replace(/yyyy年MM月dd日/g, '昨天 ')
    result = result.replace(/hh/g, hour)
    result = result.replace(/mm/g, min)
    result = result.replace(/ss/g, sec)
    return result
  } else {
    let result = format.replace(/yyyy/g, year)
    result = result.replace(/MM/g, mouth)
    result = result.replace(/dd/g, day)
    result = result.replace(/hh/g, hour)
    result = result.replace(/mm/g, min)
    result = result.replace(/ss/g, sec)
    return result
  }
})
