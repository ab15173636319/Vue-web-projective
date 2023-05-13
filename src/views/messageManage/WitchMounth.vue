<template>
  <div>
    <div class="sel">
      <el-select v-model="yyyy" placeholder="请先选择年份">
        <el-option v-for="item in year" :key="item" :label="item + '年'" :value="item"></el-option>
      </el-select>
    </div>
    <div v-if="yyyy != ''" id="main" v-loading="loading"></div>
  </div>
</template>

<script>
import tools from '@/js/tools'
import * as echarts from 'echarts'

export default {
  name: 'WM',
  data() {
    return {
      year: [],
      date: '',
      list: [],
      title: [],
      loading: false,
      yyyy: '',
      mm: '',
    }
  },
  methods: {
    Mounth() {
      this.loading = true
      let Data = []
      this.list = []
      tools.get('/statistics/queryUserMonthCount', { date: this.date }, (data) => {
        const date = new Date()
        const y = date.getFullYear()
        Data = data.data[y]
        Data.forEach((element) => {
          let obj = { value: 0, name: '' }
          obj.value = element.data
          let name = element.title.slice(-2)
          if (name.indexOf('0') !== -1 || name.includes('0')) {
            obj.name = name.slice(-1)
          }
          obj.name = name + '月'
          this.list.push(obj)
        })
        this.eCharts()
        this.loading = false
      })
    },
    eCharts() {
      var chartDom = document.getElementById('main')
      var myChart = echarts.init(chartDom)
      var option
      option = {
        legend: {
          top: 'bottom',
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        tooltip: {
          trigger: 'item', //item数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: '{a} <br/>{b} : {c} <br/>百分比 : {d}%', //{a}（系列名称），{b}（数据项名称），{c}（数值）, {d}（百分比）
        },
        series: [
          {
            name: this.yyyy + '年某月流量',
            type: 'pie',
            radius: [50, 250],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
              borderRadius: 8,
            },
            data: this.list,
          },
        ],
      }
      option && myChart.setOption(option)
    },
  },
  mounted() {
    const date = new Date()
    const y = date.getFullYear()
    for (let index = 2023; index <= y; index++) {
      this.year.push(index)
    }
  },
  watch: {
    yyyy() {
      if (this.yyyy != null) {
        this.date = [this.yyyy].toString()
        this.Mounth()
      }
    },
  },
  created() {
    this.Mounth()
  },
}
</script>
<style scoped>
.sel {
  position: absolute;
  top: 50px;
  left: 0px;
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 1;
}

#main {
  width: 800px;
  height: 600px;
}
</style>
