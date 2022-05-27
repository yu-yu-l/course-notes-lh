<template>
  <!-- 注册页面的整体盒子 -->
  <div class="reg-container">
    <!-- 注册的盒子 -->
    <div class="reg-box">
      <!-- 标题的盒子 -->
      <div class="title-box"></div>
      <!-- 注册的表单区域 -->
      <!-- 表单验证 -->
      <el-form
        :model="regForm"
        status-icon
        :rules="regFormRules"
        ref="regFormRef"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            placeholder="请输入用户名"
            prefix-icon="el-icon-user"
            v-model="regForm.username"
          ></el-input>
        </el-form-item>
        <!-- 密码框 -->
        <el-form-item prop="password">
          <el-input
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            v-model="regForm.password"
          ></el-input>
        </el-form-item>
        <!-- 确认密码框 -->
        <el-form-item prop="repassword">
          <el-input
            placeholder="请确认密码"
            prefix-icon="el-icon-lock"
            v-model="regForm.repassword"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100%" @click="regNewUser"
            >注册</el-button
          >
          <el-link type="info">去登录</el-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Reg',
  methods: {
    // 绑定事件处理函数
    regNewUser () {
      // this.$refs.regFormRef获取表单内容
      this.$refs.regFormRef.validate(async (valid) => {
        // console.log(valid)
        if (!valid) return   // 未通过校验 全部通过valid为true取反为false
        // console.log('通过校验')
        // 通过校验, 发送请求
        const {data:res} = await this.$http.post('/api/reg', this.regForm)
        // console.log(res)
        // 注册失败,提示失败消息
        if(!res.code==0) return this.$message.error(res.message)
        // 注册成功,提示成功消息,跳转登录页
        this.$message.success(res.message)
        this.$router.push('/login')
      })
    }
  },
  data () {
    // 判断两次密码是否一致, 自定义校验
    var samePwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.regForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    }
    return {
      // 保存表单里面所有的数据
      regForm: {
        username: '',
        password: '',
        repassword: ''
      },
      // 验证规则
      regFormRules: {
        username: [
          // required:必填项, message: 提示信息, tigger: 触发条件
          { required: true, message: '请输入用户名', trigger: blur },
          { pattern: /^[a-zA-Z][a-zA-Z0-9]{0,9}$/, message: '用户名必须是1~10位的字母或者数字,且必须以字母开头', tigger: blur }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: blur },
          { pattern: /^\S{6,15}$/, message: '密码长度必须是6~15位', trigger: blur }
        ],
        repassword: [
          { pattern: /^\S{6,15}$/, message: '密码长度必须是6~15位', trigger: blur },
          { validator: samePwd, trigger: 'blur' }
        ]
      }
    }
  },
}
</script>

<style lang="less" scoped>
.reg-container {
  background: url('../../assets/images/login_bg.jpg') center;
  background-size: cover;
  height: 100%;

  .reg-box {
    width: 400px;
    height: 335px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .title-box {
      height: 60px;
      background: url('../../assets/images/login_title.png') center no-repeat;
    }

    .el-form {
      padding: 0 25px;
    }
  }
}
</style>

