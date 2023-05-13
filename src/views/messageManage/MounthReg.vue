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
    }
  },
  methods: {
    Mounth() {
      this.loading = true
      let Data = []
      this.list = []
      tools.get('/statistics/queryUserGroupYearCount', { date: this.date }, (data) => {
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
        series: [
          {
            name: 'Nightingale Chart',
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
        alert(this.date)
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
