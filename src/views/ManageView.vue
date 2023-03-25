<template>
  <div>
    <div>
      <el-button @click="addAnn = true" type="info">添加公告</el-button>
      <el-select v-model="value" placeholder="请选择分组">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
      </el-select>
      <el-button type="danger" icon="el-icon-search"></el-button>
      <div class="addAnn" v-if="addAnn">
        <div>
          <el-input v-model="message.message" placeholder="请输入信息内容"></el-input>
          <el-input v-model="message.messageGroup" placeholder="请输入信息分组"></el-input>
          <el-input v-model="message.messageKey" placeholder="请输入信息的标志键名"></el-input>
          <el-button @click="addAnnInfo">添加</el-button>
          <el-button type="danger" @click="addAnn = false">取消</el-button>
        </div>
      </div>
      <el-table :data="table" style="width: 100%; margin-top: 20px" v-loading="loading">
        <el-table-column prop="pmid" label="id"> </el-table-column>
        <el-table-column prop="messageKey" label="key"> </el-table-column>
        <el-table-column prop="message" label="内容"> </el-table-column>
        <el-table-column prop="messageGroup" label="分组"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-popover placement="right" width="400" trigger="click">
              <el-input placeholder="修改主键key"></el-input>
              <el-input placeholder="修改内容"></el-input>
              <el-input placeholder="修改分组"></el-input>
              <el-button type="info">提交</el-button>
              <el-button slot="reference" type="success" class="iconfont icon-xiugaioryijian" style="color: pink">修改 </el-button>
            </el-popover>
            <el-popconfirm title="确定从列表中移除吗？" @confirm="del(scope)">
              <el-button slot="reference" type="danger" class="iconfont icon-shanchu" style="color: #909399"> 删除 </el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import tools from '@/js/tools'
export default {
  name: 'MV',
  data() {
    return {
      title: '管理公告',
      table: [],
      visible: false,
      addAnn: false,
      loading: false,
      message: {
        message: '',
        messageGroup: '',
        messageKey: '',
      },
    }
  },
  computed: {
    userinfo() {
      return this.store.state.loginUser
    },
  },
  watch: {
    addAnn() {
      if (this.addAnn) {
        document.body.style.overflowY = 'hidden'
      } else {
        document.body.style.overflowY = 'auto'
      }
    },
  },
  methods: {
    confirm(e) {
      console.log(e)
    },
    GetMV() {
      this.loading = true
      tools.ajax('/portable/message/queryUserAll', {}, (data) => {
        this.loading = false
        this.table = data.list
        console.log(this.table)
      })
    },
    addAnnInfo() {
      tools.ajax('/portable/message/add', this.message, (data) => {
        this.addAnn = false
        this.$message.warning(data.message)
        this.GetMV()
      })
    },
    del(a) {
      tools.ajax('/portable/message/delete', { pmid: a.row.pmid }, (data) => {
        this.$message.success(data.message)
        this.GetMV()
      })
    },
  },
  created() {
    this.GetMV()
  },
}
</script>
<style scoped>
@import '@/css/commom.css';
@import '@/css/MV.css';
@import '@/iconfont/iconfont.css';
</style>
