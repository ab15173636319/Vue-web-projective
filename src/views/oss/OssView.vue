<template>
  <div>
    <div class="oss-top"> <div class="file_icon iconfont icon-wenjian"></div> {{ title }} </div>
    <div class="oss-option">
      <el-select v-model="value" placeholder="请选择">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
      </el-select>
      <el-select v-model="value" placeholder="请选择">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
      </el-select>
      <el-input v-model="input" placeholder="请输入内容"></el-input>
      <el-input v-model="input" placeholder="请输入内容"></el-input>
      <el-button type="primary" class="iconfont icon-sousuo">查询</el-button>
      <el-button type="success" class="iconfont icon-add">添加</el-button>
      <el-button type="warning" class="iconfont icon-fanhui2">返回</el-button>
    </div>
    <div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="bucket" label="bucket"> </el-table-column>
        <el-table-column prop="group" label="分组"> </el-table-column>
        <el-table-column prop="name" label="名称"> </el-table-column>
        <el-table-column prop="info" label="描述"> </el-table-column>
        <el-table-column prop="type" label="类型"> </el-table-column>
        <el-table-column prop="use" label="是否启用"> </el-table-column>
        <el-table-column prop="time" label="最后修改时间"> </el-table-column>
        <el-table-column label="操作" width="200px"> </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import tools from '@/js/tools'
let app
export default {
  name: 'OssView',
  data() {
    return {
      title: 'OSS文件管理',
      tableData: [{ bucket: '', group: '', name: '', info: '', type: '', use: '', time: '' }],
      input: '',
      value: '',
      options: [],
      Burcket: [],
    }
  },
  methods: {
    getBurcket() {
      tools.ajax('/oss/bucket/queryAll', {}, (data) => {
        app.Burcket = data.list
        console.log(app.Burcket)
      })
    },
  },
  created() {
    app = this
    app.getBurcket()
    console.log(app.title)
  },
}
</script>
<style scoped>
@import '../../css/osscss/ossmain.css';
@import '../../css/commom.css';
@import '../../iconfont/iconfont.css';
</style>
