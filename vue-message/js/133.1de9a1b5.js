"use strict";(self["webpackChunkvuecli_router_vuer"]=self["webpackChunkvuecli_router_vuer"]||[]).push([[133],{1126:function(e,i,o){o.r(i),o.d(i,{default:function(){return h}});var t=function(){var e=this,i=e.$createElement,o=e._self._c||i;return o("div",[o("login-query-info"),o("div",{staticClass:"UserInfoOuter"},[o("div",{staticClass:"UserInfoOuter-top"}),o("div",{staticClass:"UserInfoInner"},[o("div",{staticClass:"UserInfoInner-left"},[o("div",{staticClass:"UserInfoInner-left-title",staticStyle:{cursor:"default"}},[e._v("用户中心")]),o("div",[o("div",{class:{active:"home"==e.tab},on:{click:function(i){e.tab="home",e.routerToSelect()}}},[o("i",{staticClass:"iconfont icon-shouye"}),o("i",[e._v("首页")])]),o("div",{class:{active:"setting"==e.tab},on:{click:function(i){e.tab="setting",e.routerToSelect()}}},[o("i",{staticClass:"iconfont icon-shezhi-xianxing"}),o("i",[e._v("我的信息")])]),o("div",{class:{active:"face"==e.tab},on:{click:function(i){e.tab="face",e.routerToSelect()}}},[o("i",{staticClass:"iconfont icon-xiaolian"}),o("i",[e._v("我的头像")])]),o("div",{class:{active:"security"==e.tab},on:{click:function(i){e.tab="security",e.routerToSelect()}}},[o("i",{staticClass:"iconfont icon-anquantianchong"}),o("i",[e._v("账号安全")])])]),o("div",{staticClass:"UserInfoInner-left-foot",on:{click:function(i){return e.RouterToUser()}}},[e._v(" 个人空间"),o("i",{staticClass:"iconfont icon-jiantouyou"})])]),o("div",{staticClass:"UserInfoInner-right"},["home"==e.tab?o("div",[o("div",{staticClass:"home"},[o("div",{staticClass:"home-top"},[o("div",{staticClass:"homeimg"},[o("img",{attrs:{src:e.userinfo.tbUserInfo.img,alt:""}}),o("div",{staticClass:"img-hover"},[e._v("个人中心")])]),o("div",{staticClass:"home-name"},[o("div",[e._v(e._s(e.userinfo.tbUser.nickname))]),o("div",{staticClass:"home-button"},[o("div",{on:{click:function(i){e.tomodiyi(),e.tab="setting"}}},[e._v("修改信息")]),o("div",{on:{click:function(i){return e.RouterToUser()}}},[e._v("个人中心"),o("i",{staticClass:"iconfont icon-jiantouyou"})])])])]),o("div",{staticClass:"line"})])]):e._e(),"setting"==e.tab?o("div",[e._m(0),o("form",{staticClass:"modify-form",attrs:{action:""}},[o("div",[o("div",[e._v("昵称：")]),o("input",{directives:[{name:"model",rawName:"v-model",value:e.modifyinfo.nickname,expression:"modifyinfo.nickname"}],attrs:{type:"text"},domProps:{value:e.modifyinfo.nickname},on:{input:function(i){i.target.composing||e.$set(e.modifyinfo,"nickname",i.target.value)}}})]),o("div",[o("div",[e._v("用户名：")]),o("div",[e._v(e._s(e.userinfo.tbUser.username))])]),o("div",[o("div",[e._v("我的签名：")]),o("textarea",{directives:[{name:"model",rawName:"v-model",value:e.modifyinfo.info,expression:"modifyinfo.info"}],attrs:{name:"",id:"",cols:"30",rows:"10"},domProps:{value:e.modifyinfo.info},on:{input:function(i){i.target.composing||e.$set(e.modifyinfo,"info",i.target.value)}}})]),o("div",[o("div",[e._v("性别：")]),o("div",[o("span",{class:{active:"m"==e.modifyinfo.sex},on:{click:function(i){e.modifyinfo.sex="m"}}},[e._v("男")]),o("span",{class:{active:"f"==e.modifyinfo.sex},on:{click:function(i){e.modifyinfo.sex="f"}}},[e._v("女")]),o("span",{class:{active:"n"==e.modifyinfo.sex},on:{click:function(i){e.modifyinfo.sex="n"}}},[e._v("保密")])])]),o("div",[o("span",{on:{click:function(i){return e.modiUserInfo()}}},[e._v("保存")])])])]):e._e(),"face"==e.tab?o("div",{staticClass:"face"},[o("div",[o("img",{attrs:{src:e.userinfo.tbUserInfo.img,alt:""}})]),o("div",{on:{click:function(i){return e.handleChange()}}},[e._v("修改头像")])]):e._e(),"security"==e.tab?o("div",[o("div",{staticClass:"security"},[o("div",{staticClass:"SecureScore"},[o("img",{attrs:{src:"https://s1.hdslb.com/bfs/static/security/static/img/logo_normal.79d580e.png",alt:""}}),o("div",{staticClass:"Scorefont"},[o("div",[e._v(e._s(e.core))]),o("div",[e._v("账号安全评分")])])]),o("div",{staticClass:"bottomfont"},[e._v(e._s(e.bottomfont))]),o("div",{staticClass:"securitymodi"},[o("div",[""==e.userinfo.tbUserInfo.email?o("i",{staticClass:"fa-solid fa-triangle-exclamation no"}):o("i",{staticClass:"fa-regular fa-circle-check ok"}),e._v(" 绑定邮箱 ")]),o("div",[""==e.userinfo.tbUserInfo.email?o("div",[e._v("未绑定")]):o("div",{staticClass:"ok"},[e._v(e._s(e.email))])]),""==e.userinfo.tbUserInfo.email?o("div",{on:{click:function(i){e.EmalVisible=!0}}},[e._v("绑定邮箱")]):o("div",{staticClass:"modiyiemail",on:{click:function(i){e.EmalVisible=!0}}},[e._v("修改邮箱")])]),o("div",{staticClass:"securitymodi"},[o("div",[""==e.userinfo.tbUserInfo.phone?o("i",{staticClass:"fa-solid fa-triangle-exclamation no"}):o("i",{staticClass:"fa-regular fa-circle-check ok"}),e._v(" 绑定电话 ")]),o("div",[""==e.userinfo.tbUserInfo.phone?o("div",[e._v("未绑定")]):o("div",{staticClass:"ok"},[e._v(e._s(e.phone))])]),""==e.userinfo.tbUserInfo.phone?o("div",[e._v("绑定电话")]):o("div",{staticClass:"modiyiemail",on:{click:function(i){e.PhoneVisible=!0}}},[e._v("修改电话")])])])]):e._e()])])]),o("el-dialog",{attrs:{close:"modiDialog",title:"修改邮箱",visible:e.EmalVisible,"close-on-press-escape":!1,width:"30%","before-close":e.handleClose},on:{"update:visible":function(i){e.EmalVisible=i}}},[o("span",[o("div",[o("el-input",{attrs:{placeholder:"请输入邮箱"},model:{value:e.modiemail.email,callback:function(i){e.$set(e.modiemail,"email",i)},expression:"modiemail.email"}})],1),o("div",{staticClass:"modiElmail"},[o("el-input",{attrs:{placeholder:"请输入验证码"},model:{value:e.modiemail.code,callback:function(i){e.$set(e.modiemail,"code",i)},expression:"modiemail.code"}}),o("el-button",{on:{click:e.getEmailCode}},[e._v("获取验证码")])],1)]),o("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:function(i){e.EmalVisible=!1}}},[e._v("取 消")]),o("el-button",{attrs:{type:"primary"},on:{click:function(i){e.EmalVisible=!1,e.ModiEmail()}}},[e._v("修改")])],1)]),o("el-dialog",{attrs:{title:"修改电话号码",visible:e.PhoneVisible},on:{"update:visible":function(i){e.PhoneVisible=i}}},[o("span",[o("div",[o("el-input",{attrs:{placeholder:"请输入电话号码"},model:{value:e.modiPhone.phone,callback:function(i){e.$set(e.modiPhone,"phone",i)},expression:"modiPhone.phone"}})],1),o("div",{staticClass:"modiElmail"},[o("el-input",{attrs:{placeholder:"请输入验证码"},model:{value:e.modiPhone.code,callback:function(i){e.$set(e.modiPhone,"code",i)},expression:"modiPhone.code"}}),o("el-button",{on:{click:function(i){return e.getPhoneCode()}}},[e._v("获取验证码")])],1)]),o("el-dialog",{attrs:{width:"30%",title:"请识别验证码",visible:e.ImgCodeVisible,"append-to-body":""},on:{"update:visible":function(i){e.ImgCodeVisible=i}}},[o("div",[o("img",{attrs:{src:e.DateMessage,alt:""},on:{click:function(i){return e.getPhoneCode()}}})]),o("el-input",{attrs:{placeholder:"请输入图片验证码"},model:{value:e.imgCode,callback:function(i){e.imgCode=i},expression:"imgCode"}}),o("el-button",{on:{click:function(i){return e.GetPhoneCode()}}},[e._v("获取验证码")])],1),o("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:function(i){e.PhoneVisible=!1}}},[e._v("取 消")]),o("el-button",{attrs:{type:"primary"},on:{click:function(i){e.PhoneVisible=!1,e.GetCode()}}},[e._v("修改")])],1)],1),o("bei-an")],1)},s=[function(){var e=this,i=e.$createElement,o=e._self._c||i;return o("div",{staticClass:"title"},[o("div"),e._v(" 我的信息 ")])}],n=o(9376),a=o(9868),l=o(2996),c=o(6265),r=o.n(c);let d;var m={components:{LoginQueryInfo:n.Z,BeiAn:l.Z},name:"UserView",data(){return{title:"用户首页",tab:"",core:0,email:"",phone:"",bottomfont:"",modifyinfo:{sex:"",nickname:"",info:"",img:"",qq:"",wechat:""},EmalVisible:!1,ImgCodeVisible:!1,PhoneVisible:!1,selectedFile:null,modiemail:{email:"",code:""},modiPhone:{phone:"",code:""},imgCode:"",DateMessage:""}},computed:{userinfo(){return this.$store.state.loginUser}},mounted(){0==this.userinfo.isLogin&&(alert("未登录"),d.$router.push("/Login"))},methods:{GetRandomImg(){let e=r()({url:"https://v.api.aa1.cn/api/api-fj/index.php?aa1=suf7y58th48u935",data:"",method:"get",headers:{"Content-Type":"multipart/form-data;charset=UTF-8"}});e.then((e=>{console.log(e)})).catch((e=>{console.log("错误",e)}))},GetCode(){a.Z.ajax("/user/auth/updateUserPhone",d.modiPhone,(e=>{d.$message.warning(e.message)}))},GetPhoneCode(){a.Z.ajax("/tool/sendValidateCode",{imageCode:d.imgCode,phone:d.modiPhone.phone},(e=>{d.$message.warning(e.message),e.success?d.ImgCodeVisible=!1:d.getPhoneCode()}))},getPhoneCode(){""!=d.modiPhone.phone?(d.ImgCodeVisible=!0,a.Z.ajax("/tool/getImageCode",{},(e=>{d.DateMessage=e.message}))):d.$message.warning("请先输入电话号码")},getEmailCode(){a.Z.ajax("/tool/sendEmailCode",{},(e=>{d.$message.warning(e.message)}))},ModiEmail(){a.Z.ajax("/user/auth/updateUserEmail",this.modiemail,(e=>{d.$message.warning(e.message)}))},handleChange(){a.Z.openFile((function(e){d.selectedFile=e,console.log("1"),(d.selectedFile.size/1048576).toFixed(2)<=2?"image/"==e.type.substr(0,6)?a.Z.upload(d.selectedFile,{fileinfo:"头像"},(e=>{console.log("2"),e.success?d.getFileUrl():d.$message.warning(e.message)})):d.imgdata="":d.$message.warning("大小不能超过2mb")}))},getFileUrl(){a.Z.ajax("/user/file/queryAll",{},(e=>{console.log("3"),console.log(e),d.modifyinfo.img=a.Z.getDownloadUrl(e.list[0].fid),d.modiUserInfo()}))},getemail(){this.email=this.userinfo.tbUserInfo.email.replace(/^(\d{4})\d{4}(\d+)/,"$1****$2"),this.phone=this.userinfo.tbUserInfo.phone.replace(/^(\d{4})\d{4}(\d+)/,"$1****$2")},getTab(){this.tab=this.$route.query.what},tomodiyi(){this.$router.push({path:"/user",query:{what:this.tab}})},routerToSelect(){d.$router.push({path:"/user",query:{what:this.tab}})},modiUserInfo(){delete d.modifyinfo.phone,delete d.modifyinfo.email,a.Z.ajax("/user/auth/updateUserInfo",d.modifyinfo,(function(e){d.$message.warning(e.message),e.success&&(d.$store.dispatch("updateUserInfo"),d.showModi())}))},showModi(){this.modifyinfo=JSON.parse(JSON.stringify(this.userinfo.tbUserInfo)),this.modifyinfo.nickname=this.userinfo.tbUser.nickname,console.log(this.modifyinfo)},score(){""!=this.userinfo.tbUserInfo.email&&(this.core+=50),""!=this.userinfo.tbUserInfo.phone&&(this.core+=50),0==this.core?this.bottomfont="你是真的不管我吗？":50==this.core?this.bottomfont="还不错哦":100==this.core&&(this.bottomfont="很好，很有精神！")},RouterToUser(){d.$router.push({path:"/UserDetail",query:{what:"Myself",username:d.userinfo.tbUser.username}})}},created(){d=this,d.score(),d.getemail(),d.showModi(),d.GetRandomImg(),0==d.userinfo.isLogin&&d.$router.push("/login"),this.getTab()}},f=m,u=o(1001),v=(0,u.Z)(f,t,s,!1,null,"7189954b",null),h=v.exports}}]);