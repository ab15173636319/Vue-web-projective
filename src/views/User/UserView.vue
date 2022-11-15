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
              ><i class="iconfont icon-shouye"></i><i>首页</i></div
            >
            <div
              @click="
                tab = 'setting'
                routerToSelect()
              "
              :class="{ active: tab == 'setting' }"
              ><i class="iconfont icon-shezhi-xianxing"></i><i>我的信息</i></div
            >
            <div
              @click="
                tab = 'face'
                routerToSelect()
              "
              :class="{ active: tab == 'face' }"
              ><i class="iconfont icon-xiaolian"></i><i>我的头像</i></div
            >
            <div
              @click="
                tab = 'security'
                routerToSelect()
              "
              :class="{ active: tab == 'security' }"
              ><i class="iconfont icon-anquantianchong"></i><i>账号安全</i></div
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
                    <div>个人中心<i class="iconfont icon-jiantouyou"></i></div>
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
            <div @click="handleChange()">修改头像</div>
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
                <div v-if="userinfo.tbUserInfo.email == ''" @click="EmalVisible = true">绑定邮箱</div>
                <div v-else class="modiyiemail" @click="EmalVisible = true">修改邮箱</div>
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
                <div v-else class="modiyiemail" @click="PhoneVisible = true">修改电话</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 修改邮箱 -->
    <el-dialog close="modiDialog" title="修改邮箱" :visible.sync="EmalVisible" :close-on-press-escape="false" width="30%" :before-close="handleClose">
      <span>
        <div><el-input v-model="modiemail.email" placeholder="请输入邮箱"></el-input></div>
        <div class="modiElmail">
          <el-input v-model="modiemail.code" placeholder="请输入验证码"></el-input>
          <el-button @click="getEmailCode">获取验证码</el-button>
        </div>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="EmalVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="
            EmalVisible = false
            ModiEmail()
          "
          >修改</el-button
        >
      </span>
    </el-dialog>
    <!-- 修改电话号码 -->
    <el-dialog title="修改电话号码" :visible.sync="PhoneVisible">
      <span>
        <div><el-input v-model="modiPhone.phone" placeholder="请输入电话号码"></el-input></div>
        <div class="modiElmail">
          <el-input v-model="modiPhone.code" placeholder="请输入验证码"></el-input>
          <el-button @click="getPhoneCode()">获取验证码</el-button>
        </div>
      </span>
      <el-dialog width="30%" title="请识别验证码" :visible.sync="ImgCodeVisible" append-to-body>
        <div><img @click="getPhoneCode()" :src="DateMessage" alt="" /></div>
        <el-input v-model="imgCode" placeholder="请输入图片验证码"></el-input>
        <el-button @click="GetPhoneCode()">获取验证码</el-button>
      </el-dialog>
      <span slot="footer" class="dialog-footer">
        <el-button @click="PhoneVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="
            PhoneVisible = false
            GetCode()
          "
          >修改</el-button
        >
      </span>
    </el-dialog>
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
      EmalVisible: false,
      ImgCodeVisible: false,
      PhoneVisible: false,
      selectedFile: null,
      modiemail: {
        email: '',
        code: '',
      },
      modiPhone: {
        phone: '',
        code: '',
      },
      imgCode: '',
      DateMessage: '',
    }
  },
  computed: {
    userinfo() {
      return this.$store.state.loginUser
    },
  },
  methods: {
    GetCode() {
      tools.ajax('/user/auth/updateUserPhone', app.modiPhone, (data) => {
        app.$message.warning(data.message)
      })
    },
    GetPhoneCode() {
      tools.ajax('/tool/sendValidateCode', { imageCode: app.imgCode, phone: app.modiPhone.phone }, (data) => {
        app.$message.warning(data.message)
        if (data.success) {
          app.ImgCodeVisible = false
        } else {
          app.getPhoneCode()
        }
      })
    },
    getPhoneCode() {
      if (app.modiPhone.phone != '') {
        app.ImgCodeVisible = true
        tools.ajax('/tool/getImageCode', {}, (data) => {
          app.DateMessage = data.message
        })
      } else {
        app.$message.warning('请先输入电话号码')
      }
    },
    getEmailCode() {
      tools.ajax('/tool/sendEmailCode', {}, (data) => {
        app.$message.warning(data.message)
      })
    },

    ModiEmail() {
      tools.ajax('/user/auth/updateUserEmail', this.modiemail, (data) => {
        app.$message.warning(data.message)
      })
    },

    handleChange() {
      tools.openFile(function (file) {
        app.selectedFile = file
        console.log('1')
        if ((app.selectedFile.size / (1024 * 1024)).toFixed(2) <= 2) {
          if (file.type.substr(0, 6) == 'image/') {
            tools.upload(app.selectedFile, { fileinfo: '头像' }, (data) => {
              console.log('2')
              if (data.success) {
                app.getFileUrl()
              } else {
                app.$message.warning(data.message)
              }
            })
          } else {
            app.imgdata = ''
          }
        } else {
          app.$message.warning('大小不能超过2mb')
        }
      })
    },

    getFileUrl() {
      tools.ajax('/user/file/queryAll', {}, (data) => {
        console.log('3')
        console.log(data)
        app.modifyinfo.img = tools.getDownloadUrl(data.list[0].fid)
        app.modiUserInfo()
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
          app.$store.dispatch('updateUserInfo')
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
    if (app.userinfo.isLogin == false) {
      app.$router.push('/login')
    }
    this.getTab()
  },
}
</script>
<style scoped>
@import '@/css/user/UserView.css';
</style>
