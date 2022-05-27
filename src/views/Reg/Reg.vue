<template>
  <!-- 注册页面的整体盒子 -->
  <div class="reg-container">
    <!-- 注册的盒子 -->
    <div class="reg-box">
      <!-- 标题的盒子 -->
      <div class="title-box"></div>
      <!-- 注册的表单区域 -->
      <el-form :model="regForm" :rules="regRules" ref="regRef">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            v-model="regForm.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="regForm.password"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <!-- 确认密码 -->
        <el-form-item prop="repassword">
          <el-input
            v-model="regForm.repassword"
            type="password"
            placeholder="请再次确认密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="btn-reg">注册</el-button>
          <el-link type="info">去登录</el-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Reg-name',

  data () {
    const samePwd = (rules, value, callback) => {
      if (value !== this.regForm.password) {
        callback(new Error('密码不一致'))
      } else {
        callback()
      }
    }
    return {
      // 存储表单数据的对象
      regForm: {
        username: '',
        password: '',
        repassword: ''
      },
      // 存储表单验证规则对象
      regRules: {
        username: [
          {
            required: true,
            message: '请输入用户名',
            tigger: 'blur'
          },
          {
            pattern: /^[a-zA-Z0-9]{1,10}$/,
            message: '用户名必须是1-10的字母或者数字',
            tigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            tigger: 'blur'
          },
          {
            pattern: /^\S{6,15}$/,
            message: '密码必须是6-15位数字',
            tigger: 'blur'
          }
        ],
        repassword: [
          // 自定义校验规则
          {
            validator: samePwd,
            tigger: 'blur'
          }
        ]
      }
    }
  }
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
  }
}
</style>
