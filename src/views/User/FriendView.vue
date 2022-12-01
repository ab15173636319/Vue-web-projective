<template>
  <div>
    <login-query-info></login-query-info>
    <nav class="navTop">
      <div :style="bottomleft" id="b"></div>
      <div
        id="f"
        @click="
          ChangeOrigin('f')
          tab = 1
          queryMyFriend('friend')
        "
        @mousemove="ChickLeft('f')"
        @mouseout="BackOringin()"
        >好友</div
      >
      <div
        id="s"
        @click="
          ChangeOrigin('s')
          tab = 2
        "
        @mousemove="ChickLeft('s')"
        @mouseout="BackOringin()"
        >搜索</div
      >
      <div
        id="q"
        @click="
          ChangeOrigin('q')
          tab = 3
          queryMyFriend('apply')
        "
        @mousemove="ChickLeft('q')"
        @mouseout="BackOringin()"
        >申请</div
      >
    </nav>
    <div class="friendBar" v-if="tab == 1">
      <div class="friend" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 1)">
        <span>好友</span>
        <div class="friendlist">
          <img v-if="Arrow" class="Noresult" src="../../../images/搜索无结果.png" alt="" />
          <div v-for="f in friendInfo" :key="f.uid">
            <div class="friendName">
              <img :src="f.userInfo.img" alt="" />
              <div @click="ToUserDetail(f.user.username)">
                <div>昵称：{{ f.user.nickname }}</div>
                <div>账号：{{ f.user.username }}</div>
              </div>
            </div>
            <div class="friendOther">
              <div class="iconfont icon-lianxi chat" @click="toChat(f.user.username)">聊天</div>
              <div class="iconfont icon-shanchu del" @click="DelFriend(f.user.username)">删除好友</div>
            </div>
          </div>
        </div>
        <div class="pagonation">
          <el-pagination :hide-on-single-page="true" :current-page.sync="page.pageNumber" @current-change="queryMyFriend('friend')" layout="prev, pager, next,total" :total="page.total"> </el-pagination>
        </div>
      </div>
    </div>
    <div class="friendBar" v-if="tab == 2">
      <div class="friend">
        <div class="friendsearbar">
          <input placeholder="用户搜索" v-model="searchinfo.username" type="text" />
          <span @click="SearchFriend()">搜索</span>
        </div>
        <div class="friendlist" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 1)">
          <img v-if="Arrow2" class="Noresult" src="../../../images/搜索无结果.png" alt="" />
          <div v-for="f in Searchlist" :key="f.uid">
            <div class="friendName">
              <!-- <img v-if="f.userInfo.img" :src="f.userInfo.img" alt="" />
              <img v-else src="https://pic3.zhimg.com/v2-83296272d2431fd53e17bef56652cdc1_r.jpg?source=1940ef5c" alt="" /> -->
              <div @click="ToUserDetail(f.user.username)">
                <div>昵称：{{ f.user.nickname }}</div>
                <div>账号：{{ f.user.username }}</div>
              </div>
            </div>
            <div class="friendOther">
              <div class="iconfont icon-add chat" @click="application(f.user.username)">申请好友</div>
            </div>
          </div>
        </div>
        <div class="pagonation">
          <el-pagination :hide-on-single-page="true" :current-page.sync="searchinfo.pageNumber" @current-change="SearchFriend()" layout="prev, pager, next,total" :total="searchinfo.total"> </el-pagination>
        </div>
      </div>
    </div>
    <div class="friendBar" v-if="tab == 3">
      <div class="friend" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 1)">
        <span>申请</span>
        <div class="friendlist">
          <img v-if="Arrow" class="Noresult" src="../../../images/搜索无结果.png" alt="" />
          <div v-for="f in friendInfo" :key="f.uid">
            <div class="friendName">
              <img :src="f.userInfo.img" alt="" />
              <div @click="ToUserDetail(f.user.username)">
                <div>昵称：{{ f.user.nickname }}</div>
                <div>账号：{{ f.user.username }}</div>
              </div>
            </div>
            <div class="friendOther">
              <div class="iconfont icon-add chat" @click="applicationInfoAgree('agree', f.user.username)">同意</div>
              <div class="iconfont icon-chacha del" @click="applicationInfoAgree('deny', f.user.username)">哒咩</div>
            </div>
          </div>
        </div>
        <div class="pagonation">
          <el-pagination :hide-on-single-page="true" :current-page.sync="page.pageNumber" @current-change="queryMyFriend('apply')" layout="prev, pager, next,total" :total="page.total"> </el-pagination>
        </div>
      </div>
    </div>
    <bei-an></bei-an>
  </div>
</template>

<script>
import tools from '@/js/tools'
import LoginQueryInfo from '@/components/Login&QueryInfo.vue'
import BeiAn from '@/components/BeiAn.vue'
export default {
  components: { LoginQueryInfo, BeiAn },
  name: 'FriendView',
  data() {
    return {
      title: '好友',
      bottomleft: {
        left: '0px',
      },
      Originbottomleft: {
        left: 0,
      },
      tab: 1,
      friendInfo: {
        info: '',
        pageNumber: 1,
        pageSize: 10,
      },
      page: {},
      friendlist: [],
      loading: false,
      Arrow: false,
      Arrow2: false,

      Searchlist: [],
      searchinfo: {
        username: '',
        pageNumber: 1,
        pageSize: 5,
        total: 0,
      },
    }
  },
  computed: {
    userinfo() {
      return this.$store.state.loginUser
    },
  },
  methods: {
    toChat(username) {
      this.$router.push({
        path: '/friend/chat',
        query: {
          username: username,
        },
      })
    },
    DelFriend(username) {
      this.$confirm('是否删除[' + username + ']', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          tools.ajax('/user/auth/friendDelete', { username: username }, (data) => {
            if (data.success) {
              this.$message.success('删除成功')
            }
          })
        })
        .catch(() => {
          this.$message.warning('取消')
        })
    },
    applicationInfoAgree(info, username) {
      tools.ajax('/user/auth/friendAgree', { info: info, username: username }, (data) => {
        if (data.success) {
          this.queryMyFriend('apply')
        }
      })
    },
    application(username) {
      tools.ajax('/user/auth/friend', { username: username }, (data) => {
        this.$message.warning(data.success)
      })
    },
    ToUserDetail(username) {
      let what = ''
      if (username == this.userinfo.tbUser.username) {
        what = 'Myself'
      } else {
        what = 'themself'
      }
      this.$router.push({
        path: '/UserDetail',
        query: {
          what: what,
          username: username,
        },
      })
    },
    SearchFriend() {
      this.loading = true
      tools.ajax('/user/auth/findUserInfo', this.searchinfo, (data) => {
        this.Searchlist = data.list
        this.searchinfo.pageNumber = data.page.pageNumber
        this.searchinfo.pageSize = data.page.pageSize
        this.searchinfo.total = data.page.total
        if (data.list.length == 0) {
          this.Arrow2 = true
        } else {
          this.Arrow2 = false
        }
        this.loading = false
      })
    },
    queryMyFriend(info) {
      this.loading = true
      this.friendInfo.info = info
      this.friendInfo.pageNumber = this.page.pageNumber
      this.friendInfo.pageSize = this.page.pageSize
      tools.ajax('/user/auth/friendQuery', this.friendInfo, (data) => {
        this.loading = false
        this.friendInfo = data.list
        this.page = data.page
        if (data.list.length == 0) {
          this.Arrow = true
        } else {
          this.Arrow = false
        }
      })
    },
    ChickLeft(id) {
      let elment = document.getElementById(id)
      this.bottomleft.left = elment.offsetLeft + 'px'
    },
    BackOringin() {
      this.bottomleft.left = this.Originbottomleft.left
    },
    ChangeOrigin(id) {
      let elment = document.getElementById(id)
      this.Originbottomleft.left = elment.offsetLeft + 'px'
    },
  },
  created() {
    this.queryMyFriend('friend')
  },
}
</script>
<style scoped>
@import '@/css/user/friend.css';
@import '@/css/commom.css';
</style>
