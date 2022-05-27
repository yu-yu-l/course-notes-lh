<template>
  <!-- 登录页面的整体盒子 -->
  <div class="login-container">
    <!-- 登录的盒子 -->
    <div class="login-box">
      <!-- 标题的盒子 -->
      <div class="title-box"></div>
      <!-- 登录的表单区域 -->
      <el-form :model="loginForm" :rules="loginRules" ref="loginRef">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="请输入用户名"
            maxlength="10"
            minlength="1"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
            maxlength="15"
            minlength="6"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="btn-login" @click="login"
            >登录</el-button
          >
          <el-link type="info" @click="$router.push('/reg')">去注册</el-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      // 登录表单的数据对象
      loginForm: {
        username: '',
        password: ''
      },
      // 登录表单的验证规则对象
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9]{1,10}$/, message: '用户名必须是1-10的字母数字', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: /^\S{6,15}$/, message: '密码必须是6-15的非空字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 注册事件函数
    login () {
      this.$refs.loginRef.validate(async valid => {
        if (!valid) return
        // 发送请求
        const { data: res } = await this.$http.post('/api/login', this.loginForm)
        if (res.code !== 0) return this.$message.error(res.message)
        // 登录成功
        this.$message.success(res.message)
        // 保存token, 在vuex中
        this.$store.commit('updateToken', res.token)
        // 永久储存token
        // localStorage.setItem('token', res.token)
        // 跳转到首页
        this.$router.push('/')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  background: url('../../assets/images/login_bg.jpg') center;
  background-size: cover;
  height: 100%;

  .login-box {
    width: 400px;
    height: 270px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 0 30px;
    box-sizing: border-box;

    .title-box {
      height: 60px;
      background: url('../../assets/images/login_title.png') center no-repeat;
    }

    .btn-login {
      width: 100%;
    }
  }
}
</style>
