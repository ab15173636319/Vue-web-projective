<template>
  <div>
    <div class="sel">
      <el-select v-model="yyyy" placeholder="请选择年份">
        <el-option v-for="item in year" :key="item" :label="item + '年'" :value="item"></el-option>
      </el-select>
      <el-select v-model="mm" placeholder="请选择月份" :disabled="haveYear">
        <el-option v-for="item in mounth" :key="item" :label="item + '月'" :value="item"></el-option>
      </el-select>
    </div>
    <div id="main" v-loading="loading"></div>
  </div>
</template>

<script>
import tools from '@/js/tools'
import * as echarts from 'echarts'

export default {
  name: 'WD',
  data() {
    return {
      message: {},
      list: [],
      wheel: [],
      title: [],
      yyyy: '',
      mm: '',
      serve_data: [],
      loading: false,
      year: [],
      mounth: [],
      haveYear: true,
      date: '',
    }
  },
  methods: {
    DayData() {
      if (this.date != '') {
        this.loading = true
        let Data = []
        this.wheel = []
        tools.get('/statistics/queryUserCount', { date: this.date }, (data) => {
          this.message = data.data
          Data = data.data[this.date]
          Data.forEach((element) => {
            let obj = { value: 0, name: '' }
            obj.value = element.data
            let name = element.title.slice(-2)
            if (name.indexOf('0') !== -1 || name.includes('0')) {
              obj.name = name.slice(-1)
            }
            obj.name = name + '日'
            this.wheel.push(obj)
          })
          this.eCharts()
          console.log('===', this.wheel)
          this.loading = false
        })
      }
    },
    eCharts() {
      var chartDom = document.getElementById('main')
      var myChart = echarts.init(chartDom)
      var option
      option = {
        title: {
          text: this.mm + '月每日网站注册量',
        },
        tooltip: {
          trigger: 'item', //item数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: '{a} <br/>{b} : {c} <br/>百分比 : {d}%', //{a}（系列名称），{b}（数据项名称），{c}（数值）, {d}（百分比）
        },
        legend: {
          top: '5%',
          left: 'center',
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2,
            },
            label: {
              show: false,
              position: 'center',
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: 'bold',
              },
            },
            labelLine: {
              show: false,
            },
            data: this.wheel,
          },
        ],
      }
      option && myChart.setOption(option)
    },
  },
  mounted() {
    const date = new Date()
    const y = date.getFullYear()
    const m = date.getMonth() + 1
    for (let index = 2023; index <= y; index++) {
      this.year.push(index)
    }
    if (this.year != y) {
      for (let index = 1; index <= 12; index++) {
        this.mounth.push(index)
      }
    } else {
      for (let index = 1; index <= m; index++) {
        this.mounth.push(index)
      }
    }
  },
  watch: {
    yyyy() {
      if (this.yyyy != '') {
        this.haveYear = false
      } else {
        this.haveYear = true
      }
    },
    mm() {
      if (this.mm != '' && this.yyyy != null) {
        this.date = [this.yyyy].toString() + (this.mm > 9 ? [this.mm].toString() : '0' + [this.mm].toString())
        this.DayData()
      }
    },
  },
  created() {
    this.DayData()
  },
}
</script>
<style scoped>
.sel {
  z-index: 1;
  position: absolute;
  top: 50px;
  left: 0px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

#main {
  width: 800px;
  height: 400px;
}
</style>
