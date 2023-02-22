<template>
  <div>
    <login-query-info></login-query-info>
    <nav class="topChatUserInfo">
      <div>
        <img :src="chatuserinfo.img" alt="" />
        <div @click="ToUserCebter(data.tbUser.username)">{{ chatuserinfo.nickname }}</div>
      </div>
    </nav>
    <div class="chatmessage">
      <div class="chatmessagebody">
        <div class="chatlist" v-for="c in chatlist" :key="c">
          <div>
            <div class="chatuserinfo">
              <img v-if="userinfo.tbUser.username == c.from" :src="userinfo.tbUserInfo.img" alt="" />
              <img v-else :src="data.tbUserInfo.img" alt="" />
              <div>{{ c.from }}</div>
            </div>
            <div class="chatinfo" :class="{ active: c.from == userinfo.tbUser.username }">{{ c.info }}</div>
            <span v-if="c.read" class="iconfont icon-yanjing chatok"></span>
            <span v-else class="iconfont icon-guanyu chatno"></span>
          </div>
        </div>
      </div>
    </div>
    <div class="chatbox">
      <input v-model="sendinfo.info" class="textarea" />
      <span @click="SendChat()">发送</span>
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
  name: 'ChatWith',
  data() {
    return {
      title: '聊天界面',
      username: this.$route.query.username,
      data: {},
      chatlist: [],
      sendinfo: {
        username: '',
        info: '',
      },
      chatuserinfo: {
        img: '',
        nickname: '',
      },
    }
  },
  computed: {
    userinfo() {
      return this.$store.state.loginUser
    },
  },
  methods: {
    ToUserCebter(username) {
      this.$router.push({
        path: '/Jump',
        query: {
          what: 'themself',
          username: username,
        },
      })
    },
    SendChat() {
      this.sendinfo.username = this.username
      tools.ajax('/user/auth/sendMesage', this.sendinfo, (data) => {
        if (data.success) {
          this.GetChatMessage()
          this.sendinfo.info = ''
        }
      })
    },
    GetChatUserInfo() {
      tools.ajax('/user/auth/getUserInfoByName', { username: this.username }, (data) => {
        this.data = data
        this.chatuserinfo.nickname = data.tbUser.nickname
        this.chatuserinfo.img = data.tbUserInfo.img
      })
    },
    GetChatMessage() {
      tools.ajax('/user/auth/findPrivateMessageByUser', { username: this.username }, (data) => {
        console.log(data)
        this.chatlist = data.list
      })
    },
    ReadMessage() {
      tools.ajax('/user/auth/readPrivateMessageByUser', { username: this.username })
    },
  },
  created() {
    // console.log(this.$router)
    this.GetChatUserInfo()
    this.GetChatMessage()
    this.ReadMessage()
  },
  watch: {
    data() {
      this.GetChatMessage()
    },
  },
}
</script>
<style scoped>
@import '@/css/user/UserDetail.css';
@import '@/css/user/chat.css';
</style>
