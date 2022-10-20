<template>
  <div
    ><el-button type="info" @click="dialogVisible = true">修改信息</el-button>
    <el-dialog title="用户附加信息修改" :visible.sync="dialogVisible">
      <div class="loginreg">
        <el-card style="background-color: #fff">
          <div>
            <el-form :model="info" v-loading="" ref="reg">
              <el-form-item prop="username">
                <el-input v-model="info.username" placeholder="昵称">
                  <i slot="prefix" class="el-input--icon iconfont">&#xe600;</i>
                </el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input type="password" show-password v-model="info.password" placeholder="电话号码">
                  <i slot="prefix" class="el-input__icon iconfont">&#xe88b;</i>
                </el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input type="password" show-password v-model="info.password2" placeholder="邮箱">
                  <i slot="prefix" class="el-input__icon iconfont">&#xe62e;</i>
                </el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="3" :on-exceed="handleExceed" :file-list="fileList">
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
              </el-form-item>
              <el-form-item class="tc">
                <el-button @click="Reg()" type="primary">保存</el-button>
                <el-button @click="reset()" type="danger">重填</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import tools from '../../js/tools'
let app
export default {
  name: 'UserView',
  data() {
    return {
      title: '用户注册',
      info: {},
      dialogVisible: false,
    }
  },
  methods: {},
  created() {
    app = this
    console.log(app.title)
  },
}
</script>
