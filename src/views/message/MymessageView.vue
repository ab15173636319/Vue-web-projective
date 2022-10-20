<template>
  <div class="mymessage">
    <div class="top"> </div>
    <div>
      <button
        @click="
          tab = 1
          queryMy()
        "
        :class="{ active: tab == 1 }"
        class="btn_message"
        >留言</button
      >
      <button @click="tab = 2" :class="{ active: tab == 2 }" class="btn_comments">评论</button>
    </div>
    <div v-if="tab == 1" v-loading="loading" class="outer">
      <div class="query_btn">
        <div>
          按照发帖时间降序
          <i class="el-icon-caret-top">&#xe60a;</i>
        </div>
        <div>
          按照发帖时间升序
          <i class="el-icon-caret-bottom">&#xe60a;</i>
        </div>
        <div></div>
      </div>
      <div v-for="l in list" :key="l.uid" class="Messagelist">
        <div>
          <img class="user_img" :src="l.userInfo.img" alt="" />
        </div>
        <div class="message_info">
          <div>
            <div class="user_name">{{ l.user.nickname }}</div>
            <div></div>
          </div>
          <div class="message_time">{{ l.lastupdate | timer }}</div>
          <div>{{ l.title }}</div>
          <div class="operate">
            <div>
              <i class="iconfont">&#xe613;</i>
              <span>{{ l.praiseCount }}</span>
            </div>
            <div>
              <i class="iconfont">&#xe627;</i>
              <span>{{ l.replyCount }}</span>
            </div>
            <div class="del" @click="deleteMessage(l)">
              <i class="iconfont">&#xe74b;</i>
              <span class="del_font">删除</span>
            </div>
          </div>
        </div>
      </div>
      <el-pagination hide-on-single-page @current-change="queryMy" :current-page.sync="messageInfo.page.pageNumber" :page-size="100" layout="prev, pager, next, jumper" :total="messageInfo.page.total"> </el-pagination>
    </div>
    <div v-if="tab == 2"></div>
  </div>
</template>

<script>
import tools from '@/js/tools'
// import tools from '../../js/tools'
let app
export default {
  name: 'MymessageView',
  data() {
    return {
      tab: 1,
      title: '用户动态',
      list: [],
      loading: false,
      messageInfo: {
        orderBy: '',
        page: {
          pageNumber: 1,
          pageSize: 5,
        },
      },
    }
  },
  methods: {
    queryMy() {
      app.loading = true
      tools.ajax('/message/manage/queryUserAll', {}, (data) => {
        console.log(data)
        if (data.success) {
          app.list = data.list
          app.messageInfo.page = data.page
          app.loading = false
          console.log(app.list)
        }
      })
    },
    queryComments() {},
    deleteMessage(e) {
      app.delDialogVisible = true
      app
        .$confirm('是否删除' + '《' + e.title + '》' + '这条动态?', '删除', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
        .then(() => {
          tools.ajax('/message/manage/deletUserMessage', { umid: e.umid }, (data) => {
            if (data.success) {
              app.$message({
                type: 'success',
                message: '删除成功!',
              })
              app.queryMy()
            } else {
              app.$message({
                type: 'error',
                message: '删除失败!',
              })
            }
          })
        })
        .catch(() => {
          app.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
      console.log(e)
    },
  },
  created() {
    app = this
    app.queryMy()
  },
}
</script>
<style>
@import '../../css/Mymessage.css';
</style>
