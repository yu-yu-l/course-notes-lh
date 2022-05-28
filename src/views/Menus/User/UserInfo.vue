<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>基本资料</span>
    </div>
    <!-- 表单 -->
    <el-form
      :model="userForm"
      :rules="userFormRules"
      ref="userFormRef"
      label-width="100px"
    >
      <el-form-item label="登录名称" prop="username">
        <el-input v-model="userForm.username" disabled></el-input>
      </el-form-item>
      <el-form-item label="用户昵称" prop="nickname">
        <el-input v-model="userForm.nickname"></el-input>
      </el-form-item>
      <el-form-item label="用户邮箱" prop="email">
        <el-input v-model="userForm.email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">提交修改</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: "UserInfo",
  methods: {
    resetForm () {
      this.userForm = Object.assign({}, this.$store.state.userInfo)
    },
    submit () {
      this.$refs.userFormRef.validate(async valid => {
        if (!valid) return // 校验未通过
        // console.log('验证通过')
        //发送ajax
        const { data: res } = await this.$http.put('/my/userinfo', this.userForm)
        if (res.code !== 0) return this.$message.error(res.message)
        this.$message.success(res.message)
        // 触发actions里面的函数实现vuex中数据的更新
        this.$store.dispatch("initUserInfo")
      })
    }
  },
  data () {
    return {
      // 存储表单的数据对象
      /* userForm: {
        username: "",
        nickname: "",
        email: "",
      }, */
      // 给表单设置初始值
      // 每次重置，都把 store 中最新的值取出来，赋值给 userForm
      // this.userForm = this.$store.state.userInfo
      // 因为v-model和userForm是双向绑定，如果直接将vuex中地址给到userForm，那么当表单数据改变就会改变vuex里面的数据
      // 所以可以使用浅拷贝，将vuex里面的数据拷贝到一个新的对象中，这样就不会改变vuex的数据了
      userForm: Object.assign({}, this.$store.state.userInfo),
      // 存储表单验证规则对象
      userFormRules: {
        nickname: [
          { required: true, message: '用户昵称不能为空!', trigger: 'blur' },
          { pattern: /^\S{1,10}$/, message: '昵称必须是1-10位的非空字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '邮箱不能为空!', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确!', trigger: 'blur' }
        ]
      }
    }
  }
}
</script>

<style lang="less" scoped>
.el-form {
  width: 500px;
}
</style>
