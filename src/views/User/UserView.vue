<template>
  <div>
    <login-query-info></login-query-info>
    <div class="UserInfoOuter">
      <div class="UserInfoOuter-top"></div>
      <div class="UserInfoInner">
        <div class="UserInfoInner-left">
          <div style="cursor: default" class="UserInfoInner-left-title">用户中心</div>
          <div>
            <div
              @click="
                tab = 'home'
                routerToSelect()
              "
              :class="{ active: tab == 'home' }"
              ><i class="fa-solid fa-house"></i><i>首页</i></div
            >
            <div
              @click="
                tab = 'setting'
                routerToSelect()
              "
              :class="{ active: tab == 'setting' }"
              ><i class="fa-regular fa-user"></i><i>我的信息</i></div
            >
            <div
              @click="
                tab = 'face'
                routerToSelect()
              "
              :class="{ active: tab == 'face' }"
              ><i class="fa-regular fa-face-meh"></i><i>我的头像</i></div
            >
            <div
              @click="
                tab = 'security'
                routerToSelect()
              "
              :class="{ active: tab == 'security' }"
              ><i class="fa-solid fa-lock"></i><i>账号安全</i></div
            >
          </div>
          <div class="UserInfoInner-left-foot"> 个人空间<i class="fa-solid fa-chevron-right"></i> </div>
        </div>
        <div class="UserInfoInner-right">
          <!-- home -->
          <div v-if="tab == 'home'">
            <div class="home">
              <div class="home-top">
                <div class="homeimg">
                  <img :src="userinfo.tbUserInfo.img" alt="" />
                  <div class="img-hover">个人中心</div>
                </div>
                <div class="home-name">
                  <div>{{ userinfo.tbUser.nickname }}</div>
                  <div class="home-button">
                    <div
                      @click="
                        tomodiyi()
                        tab = 'setting'
                      "
                      >修改信息</div
                    >
                    <div>个人中心<i class="fa-solid fa-chevron-right"></i></div>
                  </div>
                </div>
              </div>
              <div class="line"></div>
            </div>
          </div>
          <!-- setting -->
          <div v-if="tab == 'setting'">
            <div class="title">
              <div></div>
              我的信息</div
            >
            <form class="modify-form" action="">
              <!-- 1 -->
              <div>
                <div>昵称：</div>
                <input v-model="modifyinfo.nickname" type="text" />
              </div>
              <!-- 2 -->
              <div>
                <div>用户名：</div>
                <div>{{ userinfo.tbUser.username }}</div>
              </div>
              <!-- 3 -->
              <div>
                <div>我的签名：</div>
                <textarea v-model="modifyinfo.info" name="" id="" cols="30" rows="10"></textarea>
              </div>
              <!-- 4 -->
              <div>
                <div>性别：</div>
                <div>
                  <span @click="modifyinfo.sex = 'm'" :class="{ active: modifyinfo.sex == 'm' }">男</span>
                  <span @click="modifyinfo.sex = 'f'" :class="{ active: modifyinfo.sex == 'f' }">女</span>
                  <span @click="modifyinfo.sex = 'n'" :class="{ active: modifyinfo.sex == 'n' }">保密</span>
                </div>
              </div>
              <!-- 5 -->
              <div>
                <span @click="modiUserInfo()">保存</span>
              </div>
            </form>
          </div>
          <!-- face -->
          <div v-if="tab == 'face'" class="face">
            <div>
              <img :src="userinfo.tbUserInfo.img" alt="" />
            </div>
            <el-upload action="" class="upload-demo" ref="upload" :on-change="handleChange" :auto-upload="false" :limit="1"> 点击上传 </el-upload>
          </div>
          <div v-if="tab == 'security'">
            <div class="security">
              <div class="SecureScore">
                <img src="https://s1.hdslb.com/bfs/static/security/static/img/logo_normal.79d580e.png" alt="" />
                <div class="Scorefont">
                  <div>{{ core }}</div>
                  <div>账号安全评分</div>
                </div>
              </div>
              <div class="bottomfont">{{ bottomfont }}</div>
              <div class="securitymodi">
                <div>
                  <i v-if="userinfo.tbUserInfo.email == ''" class="fa-solid fa-triangle-exclamation no"></i>
                  <i v-else class="fa-regular fa-circle-check ok"></i>
                  绑定邮箱
                </div>
                <div>
                  <div v-if="userinfo.tbUserInfo.email == ''">未绑定</div>
                  <div class="ok" v-else>{{ email }}</div>
                </div>
                <div v-if="userinfo.tbUserInfo.email == ''">绑定邮箱</div>
                <div v-else class="modiyiemail">修改邮箱</div>
              </div>
              <div class="securitymodi">
                <div>
                  <i v-if="userinfo.tbUserInfo.phone == ''" class="fa-solid fa-triangle-exclamation no"></i>
                  <i v-else class="fa-regular fa-circle-check ok"></i>
                  绑定电话
                </div>
                <div>
                  <div v-if="userinfo.tbUserInfo.phone == ''">未绑定</div>
                  <div class="ok" v-else>{{ phone }}</div>
                </div>
                <div v-if="userinfo.tbUserInfo.phone == ''">绑定电话</div>
                <div v-else class="modiyiemail">修改电话</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoginQueryInfo from '@/components/Login&QueryInfo.vue'
import tools from '@/js/tools'
let app
export default {
  components: { LoginQueryInfo },
  name: 'UserView',
  data() {
    return {
      title: '用户首页',
      tab: '',
      core: 0,
      email: '',
      phone: '',
      bottomfont: '',
      modifyinfo: {
        sex: '',
        nickname: '',
        info: '',
        img: '',
        qq: '',
        wechat: '',
      },
      selectedFile: null,
    }
  },
  computed: {
    userinfo() {
      return this.$store.state.loginUser
    },
  },
  methods: {
    handleChange(file) {
      app.selectedFile = file
      console.log(app.selectedFile)
      tools.upload(app.selectedFile, { fileinfo: '头像' }, (data) => {
        app.$message.warning(data.message)
      })
    },

    getemail() {
      this.email = this.userinfo.tbUserInfo.email.replace(/^(\d{4})\d{4}(\d+)/, '$1****$2')
      this.phone = this.userinfo.tbUserInfo.phone.replace(/^(\d{4})\d{4}(\d+)/, '$1****$2')
    },
    getTab() {
      this.tab = this.$route.query.what
    },
    tomodiyi() {
      this.$router.push({
        path: '/user',
        query: {
          what: this.tab,
        },
      })
    },
    routerToSelect() {
      app.$router.push({
        path: '/user',
        query: {
          what: this.tab,
        },
      })
    },
    // 修改用户附加信息
    modiUserInfo() {
      delete app.modifyinfo.phone
      delete app.modifyinfo.email
      tools.ajax('/user/auth/updateUserInfo', app.modifyinfo, function (data) {
        app.$message.warning(data.message)
        if (data.success) {
          this.$store.dispatch('updateUserInfo')
          app.showModi()
        }
      })
    },

    showModi() {
      this.modifyinfo = JSON.parse(JSON.stringify(this.userinfo.tbUserInfo))
      this.modifyinfo.nickname = this.userinfo.tbUser.nickname
      console.log(this.modifyinfo)
      // app.modifyinfo.nickname = app.tbUser.nickname
      // delete app.modifyinfo.phone
      // delete app.modifyinfo.email
    },
    score() {
      if (this.userinfo.tbUserInfo.email != '') {
        this.core += 50
      }
      if (this.userinfo.tbUserInfo.phone != '') {
        this.core += 50
      }
      if (this.core == 0) {
        this.bottomfont = '你是真的不管我吗？'
      } else if (this.core == 50) {
        this.bottomfont = '还不错哦'
      } else if (this.core == 100) {
        this.bottomfont = '很好，很有精神！'
      }
    },
  },
  created() {
    app = this
    app.score()
    app.getemail()
    app.showModi()
    this.getTab()
  },
}
</script>
<style scoped>
@import '@/css/user/UserView.css';
</style>
