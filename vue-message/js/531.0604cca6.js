"use strict";(self["webpackChunkvuecli_router_vuer"]=self["webpackChunkvuecli_router_vuer"]||[]).push([[531],{3531:function(e,t,n){n.r(t),n.d(t,{default:function(){return f}});var i=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("login-query-info"),i("nav",{staticClass:"navTop"},[i("div",{style:e.bottomleft,attrs:{id:"b"}}),i("div",{attrs:{id:"f"},on:{click:function(t){e.ChangeOrigin("f"),e.tab=1,e.queryMyFriend("friend")},mousemove:function(t){return e.ChickLeft("f")},mouseout:function(t){return e.BackOringin()}}},[e._v("好友")]),i("div",{attrs:{id:"s"},on:{click:function(t){e.ChangeOrigin("s"),e.tab=2},mousemove:function(t){return e.ChickLeft("s")},mouseout:function(t){return e.BackOringin()}}},[e._v("搜索")]),i("div",{attrs:{id:"q"},on:{click:function(t){e.ChangeOrigin("q"),e.tab=3,e.queryMyFriend("apply")},mousemove:function(t){return e.ChickLeft("q")},mouseout:function(t){return e.BackOringin()}}},[e._v("申请")])]),1==e.tab?i("div",{staticClass:"friendBar"},[i("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"friend",attrs:{"element-loading-text":"拼命加载中","element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(0, 0, 0, 1)"}},[i("span",[e._v("好友")]),i("div",{staticClass:"friendlist"},[e.Arrow?i("img",{staticClass:"Noresult",attrs:{src:n(8611),alt:""}}):e._e(),e._l(e.friendInfo,(function(t){return i("div",{key:t.uid},[i("div",{staticClass:"friendName"},[i("img",{attrs:{src:t.userInfo.img,alt:""}}),i("div",{on:{click:function(n){return e.ToUserDetail(t.user.username)}}},[i("div",[e._v("昵称："+e._s(t.user.nickname))]),i("div",[e._v("账号："+e._s(t.user.username))])])]),i("div",{staticClass:"friendOther"},[i("div",{staticClass:"iconfont icon-lianxi chat",on:{click:function(n){return e.toChat(t.user.username)}}},[e._v("聊天")]),i("div",{staticClass:"iconfont icon-shanchu del",on:{click:function(n){return e.DelFriend(t.user.username)}}},[e._v("删除好友")])])])}))],2),i("div",{staticClass:"pagonation"},[i("el-pagination",{attrs:{"hide-on-single-page":!0,"current-page":e.page.pageNumber,layout:"prev, pager, next,total",total:e.page.total},on:{"update:currentPage":function(t){return e.$set(e.page,"pageNumber",t)},"update:current-page":function(t){return e.$set(e.page,"pageNumber",t)},"current-change":function(t){return e.queryMyFriend("friend")}}})],1)])]):e._e(),2==e.tab?i("div",{staticClass:"friendBar"},[i("div",{staticClass:"friend"},[i("div",{staticClass:"friendsearbar"},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.searchinfo.username,expression:"searchinfo.username"}],attrs:{placeholder:"用户搜索",type:"text"},domProps:{value:e.searchinfo.username},on:{input:function(t){t.target.composing||e.$set(e.searchinfo,"username",t.target.value)}}}),i("span",{on:{click:function(t){return e.SearchFriend()}}},[e._v("搜索")])]),i("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"friendlist",attrs:{"element-loading-text":"拼命加载中","element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(0, 0, 0, 1)"}},[e.Arrow2?i("img",{staticClass:"Noresult",attrs:{src:n(8611),alt:""}}):e._e(),e._l(e.Searchlist,(function(t){return i("div",{key:t.uid},[i("div",{staticClass:"friendName"},[i("div",{on:{click:function(n){return e.ToUserDetail(t.user.username)}}},[i("div",[e._v("昵称："+e._s(t.user.nickname))]),i("div",[e._v("账号："+e._s(t.user.username))])])]),i("div",{staticClass:"friendOther"},[i("div",{staticClass:"iconfont icon-add chat",on:{click:function(n){return e.application(t.user.username)}}},[e._v("申请好友")])])])}))],2),i("div",{staticClass:"pagonation"},[i("el-pagination",{attrs:{"hide-on-single-page":!0,"current-page":e.searchinfo.pageNumber,layout:"prev, pager, next,total",total:e.searchinfo.total},on:{"update:currentPage":function(t){return e.$set(e.searchinfo,"pageNumber",t)},"update:current-page":function(t){return e.$set(e.searchinfo,"pageNumber",t)},"current-change":function(t){return e.SearchFriend()}}})],1)])]):e._e(),3==e.tab?i("div",{staticClass:"friendBar"},[i("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"friend",attrs:{"element-loading-text":"拼命加载中","element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(0, 0, 0, 1)"}},[i("span",[e._v("申请")]),i("div",{staticClass:"friendlist"},[e.Arrow?i("img",{staticClass:"Noresult",attrs:{src:n(8611),alt:""}}):e._e(),e._l(e.friendInfo,(function(t){return i("div",{key:t.uid},[i("div",{staticClass:"friendName"},[i("img",{attrs:{src:t.userInfo.img,alt:""}}),i("div",{on:{click:function(n){return e.ToUserDetail(t.user.username)}}},[i("div",[e._v("昵称："+e._s(t.user.nickname))]),i("div",[e._v("账号："+e._s(t.user.username))])])]),i("div",{staticClass:"friendOther"},[i("div",{staticClass:"iconfont icon-add chat",on:{click:function(n){return e.applicationInfoAgree("agree",t.user.username)}}},[e._v("同意")]),i("div",{staticClass:"iconfont icon-chacha del",on:{click:function(n){return e.applicationInfoAgree("deny",t.user.username)}}},[e._v("哒咩")])])])}))],2),i("div",{staticClass:"pagonation"},[i("el-pagination",{attrs:{"hide-on-single-page":!0,"current-page":e.page.pageNumber,layout:"prev, pager, next,total",total:e.page.total},on:{"update:currentPage":function(t){return e.$set(e.page,"pageNumber",t)},"update:current-page":function(t){return e.$set(e.page,"pageNumber",t)},"current-change":function(t){return e.queryMyFriend("apply")}}})],1)])]):e._e(),i("bei-an")],1)},a=[],r=n(9868),s=n(9376),o=n(2996),u={components:{LoginQueryInfo:s.Z,BeiAn:o.Z},name:"FriendView",data(){return{title:"好友",bottomleft:{left:"0px"},Originbottomleft:{left:0},tab:1,friendInfo:{info:"",pageNumber:1,pageSize:10},page:{},friendlist:[],loading:!1,Arrow:!1,Arrow2:!1,Searchlist:[],searchinfo:{username:"",pageNumber:1,pageSize:5,total:0}}},computed:{userinfo(){return this.$store.state.loginUser}},methods:{toChat(e){this.$router.push({path:"/friend/chat",query:{username:e}})},DelFriend(e){this.$confirm("是否删除["+e+"]",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((()=>{r.Z.ajax("/user/auth/friendDelete",{username:e},(e=>{e.success&&this.$message.success("删除成功")}))})).catch((()=>{this.$message.warning("取消")}))},applicationInfoAgree(e,t){r.Z.ajax("/user/auth/friendAgree",{info:e,username:t},(e=>{e.success&&this.queryMyFriend("apply")}))},application(e){r.Z.ajax("/user/auth/friend",{username:e},(e=>{this.$message.warning(e.success)}))},ToUserDetail(e){let t="";t=e==this.userinfo.tbUser.username?"Myself":"themself",this.$router.push({path:"/UserDetail",query:{what:t,username:e}})},SearchFriend(){this.loading=!0,r.Z.ajax("/user/auth/findUserInfo",this.searchinfo,(e=>{this.Searchlist=e.list,this.searchinfo.pageNumber=e.page.pageNumber,this.searchinfo.pageSize=e.page.pageSize,this.searchinfo.total=e.page.total,0==e.list.length?this.Arrow2=!0:this.Arrow2=!1,this.loading=!1}))},queryMyFriend(e){this.loading=!0,this.friendInfo.info=e,this.friendInfo.pageNumber=this.page.pageNumber,this.friendInfo.pageSize=this.page.pageSize,r.Z.ajax("/user/auth/friendQuery",this.friendInfo,(e=>{this.loading=!1,this.friendInfo=e.list,this.page=e.page,0==e.list.length?this.Arrow=!0:this.Arrow=!1}))},ChickLeft(e){let t=document.getElementById(e);this.bottomleft.left=t.offsetLeft+"px"},BackOringin(){this.bottomleft.left=this.Originbottomleft.left},ChangeOrigin(e){let t=document.getElementById(e);this.Originbottomleft.left=t.offsetLeft+"px"}},created(){this.queryMyFriend("friend")}},c=u,l=n(1001),d=(0,l.Z)(c,i,a,!1,null,"fc90adec",null),f=d.exports},8611:function(e,t,n){e.exports=n.p+"img/搜索无结果.dcf01b77.png"}}]);