<template>
  <div>
    <table border="1">
      <thead>
        <tr>
          <td>时间</td>
          <td v-for="t in title" :key="t">{{ t }}</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>注册数</td>
          <td v-for="s in serve_data" :key="s">{{ s }}</td>
        </tr>
      </tbody>
    </table>
    <div id="main" v-loading="loading"></div>
  </div>
</template>

<script>
import tools from '@/js/tools'
import * as echarts from 'echarts'

export default {
  name: 'AM',
  data() {
    return {
      message: {},
      list: [],
      title: [],
      serve_data: [],
      loading: false,
    }
  },
  props: {},
  methods: {
    getInfoOfWeb() {
      let Data = []
      this.loading = true
      tools.get('/statistics/queryUserGroupYearCount', {}, (data) => {
        this.message = data.data
        const date = new Date()
        const y = date.getFullYear()
        const M = date.getMonth() + 1
        const thismounth = y.toString() + (M > 9 ? M.toString() : '0' + M.toString())
        Data = data.data[thismounth]
        this.list = Data
        Data.forEach((element) => {
          this.title.push(element.title.slice(-2) + '日')
          // console.log(element.title);
          this.serve_data.push(element.data)
          this.eCharts()
          this.loading = false
        })
      })
    },
    eCharts() {
      setTimeout(() => {
        var chartDom = document.getElementById('main')
        var myChart = echarts.init(chartDom, 'dark')
        var option
        option = {
          title: {
            text: '本月网站注册数',
          },
          tooltip: {
            trigger: 'axis',
          },
          xAxis: {
            type: 'category',
            data: this.title,
          },
          yAxis: {
            type: 'value',
          },
          series: [
            {
              data: this.serve_data,
              type: 'line',
              smooth: true,
            },
          ],
        }
        option && myChart.setOption(option)
      }, 500)
    },
  },
  created() {
    this.getInfoOfWeb()
  },
}
</script>
<style scoped>
table {
  width: 100%;
}

td {
  margin: auto;
  padding: 10px;
  text-align: center;
  cursor: pointer;
}

td:hover {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
