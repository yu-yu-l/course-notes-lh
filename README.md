# vue大事件项目

[项目演示地址](http://www.escook.cn:06/ev/#/login)

[接口文档](https://www.showdoc.com.cn/1425457596992351/697262026446225)

[接口根路径](http://www.liulongbin.top:300)

## 1.项目前置准备

### 1.1 项目初始化

```javascript
// 创建项目
vue create course-notes
// 手动选择功能
? Please pick a preset: Manually select features // 手动选择
? Check the features needed for your project: Babel, Router, Vuex, CSS Pre-processors, Linter // 选择项目所需的功能
? Choose a version of Vue.js that you want to start the project with 2.x // 选择vue版本
? Use history mode for router? (Requires proper server setup for index fallback in production) No // 选择哈希模式还是history模式，默认history模式。
? Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default): Less // 选择css预编译
? Pick a linter / formatter config: Standard // 选择ESLint规则
? Pick additional lint features: Lint on save // 选择语法检测（保存时检测）或者fix和commit时检测
? Where do you prefer placing config for Babel, ESLint, etc.? In dedicated config files 配置文件存放位置（单独文件夹）
? Save this as a preset for future projects? (y/N) n // 是否记录以便下次继续用这套配置
```

### 1.2运行项目

`yarn serve`

### 1.3安装必要依赖element-ui和axios

`yarn add element-ui`

`yarn add axios`

### 1.4配置axios

```js
// main.js
// 1.导入axios
import axios from 'axios'
// 2.把axios挂载到Vue的原型对象中
Vue.prototype.$http = axios
// 设置axios根路径
axios.defaults.baseURL = 'http://www.liulongbin.top:300'
```

### 1.5配置element-ui

项目需要结合`element-ui`搭建

```js
// main.js
// 1 导入element-ui组件
import ElementUi from 'element-ui'
// 2 引入element-ui样式
import 'element-ui/lib/theme-chalk/index.css'
// 3 注册ElementUi
Vue.use(ElementUi)
```

### 1.6项目结构

```html
ev-cms                  项目目录
├─ node_module         项目依赖包
├─ public
│  ├─ favicon.ico
│  └─ index.html        静态页面，渲染好的组件最终通过这个页面进行展示
├─ src                  源码目录
│  ├─ assets            存放静态资源的文件夹，例如css、img、js、font等等
│  │  └─ logo.png
│  ├─ components        存放vue公共复用组件的文件
│  │  └─ HelloWorld.vue
│  ├─ router            vue-router目录，路由配置文件
│  │  └─ index.js
│  ├─ store             vuex目录，vuex配置文件
│  │  └─ index.js
│  └─ views   视图，存放页面文件
│  │   ├─ About.vue
│  │   └─ Home.vue
│  ├─ App.vue           项目的根组件，页面入口文件
│  ├─ main.js           程序入口文件
├─ .browserslistrc      兼容浏览器配置
├─ .editorconfig        代码风格配置
├─ .eslintrc.js         eslintrc配置文件
├─ .git                 git 仓库
├─ .gitignore           git忽略文件
├─ README.md            项目说明文件
├─ babel.config.js      Babel的配置文件
├─ package.json         依赖包配置文件
└─ yarn.lock

```

### 1.7git提交

```html
// 1. 将文件添加到暂存区
git add .
// 2. commit 提交
git commit -m "项目初始化完成"
// 3. 上传远程仓库
git remote add origin 远程仓库地址
git branch -M master
git push -u origin master
```

## 2.注册功能

在`views`文件夹下创建`Reg/Reg.vue`和`Login/Login.vue`文件

在`App.vue`中增加路由出口 `<router-view></router-view>`

### 2.1Reg.vue基本样式

```vue
// Reg.vue
<template>
  <!-- 注册页面的整体盒子 -->
  <div class="reg-container">
    <!-- 注册的盒子 -->
    <div class="reg-box">
      <!-- 标题的盒子 -->
      <div class="title-box"></div>
      <!-- 注册的表单区域 -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'Reg'
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
```

### 2.2导入登录注册模块并声明路由规则

```js
// routers/index.js
// 1. 导入登录和注册模块
import Reg from '@/views/Reg/Reg.vue'
import Login from '@/views/Login/Login.vue'
// 2. 声明路由规则
const routes = [
  // 1.2 声明路由规则
  // path: 路径, component: 组件。 
  {path: '/reg', component: Reg},
  {path: '/login', component: Login}
]
```

### 2.3在assets文件夹下创建global.less样式文件

```less
// global.less
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}

// 全局重置 element-ui 组件库的基础样式
.el-input__inner,
.el-button,
.el-link,
.el-menu-item,
.el-submenu__title,
.el-form-item__label {
  font-size: 12px;
}

// 重置菜单的基础样式
.el-menu.el-menu--horizontal {
  height: 60px;
  border-bottom: none;
}

// 重置卡片的基础样式
.el-card.is-always-shadow,
.el-card.is-hover-shadow:focus,
.el-card.is-hover-shadow:hover {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  font-size: 13px;
}

// 全局重置 el-table 的样式
.el-table thead {
  color: #000;
}

.el-table {
  font-size: 12px;
}

.el-dialog__body {
  padding: 10px 20px;
}
```

### 2.4在mian.js中引入

```js
// mian.js
// 3. 导入全局样式表
import '@/assets/global.less'
```

### 2.5渲染注册页面UI结构

```vue
// Reg.vue
<!-- 注册的表单区域 -->
<el-form>
	<!-- 用户名 -->
	<el-form-item>
    <el-input 
    placeholder="请输入用户名"
    prefix-icon="el-icon-user"
    >
    </el-input>
	</el-form-item>
	<!-- 密码 -->
	<el-form-item>
    <el-input 
    placeholder="请输入密码"
    prefix-icon="el-icon-lock"
    >
    </el-input>
	</el-form-item>
	<!-- 确认密码 -->
	<el-form-item>
    <el-input 
    placeholder="请确认密码"
    prefix-icon="el-icon-lock"
    >
    </el-input>
	</el-form-item>
	<el-form-item>
    <el-button style="width: 100%"  type="primary">注册</el-button>
    <el-link  type="info">去登录</el-link>
	</el-form-item>
</el-form>
```

### 2.6保存表单数据到data函数中并进行校验

```vue
// Reg.vue
<template>
  <!-- 注册页面的整体盒子 -->
  <div class="reg-container">
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
          <el-link type="info" @click="$router.push('/login')">去登录</el-link>
        </el-form-item>
      </el-form>
  </div>
</template>

<script>
export default {
  name: 'Reg',
  methods: {
    // 绑定事件处理函数
    regNewUser () {
      // this.$refs.regFormRef获取表单内容
      this.$refs.regFormRef.validate(async valid => {
        // console.log(valid)
        if (!valid) return   // 未通过校验 全部通过valid为true取反为false
        // console.log('通过校验')
        // 通过校验, 发送请求
        const { data: res } = await this.$http.post('/api/reg', this.regForm)
        // console.log(res)
        // 注册失败,提示失败消息
        if (res.code !== 0) return this.$message.error(res.message)
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
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { pattern: /^[a-zA-Z][a-zA-Z0-9]{0,9}$/, message: '用户名必须是1~10位的字母或者数字,且必须以字母开头', tigger: blur }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: /^\S{6,15}$/, message: '密码长度必须是6~15位', trigger: 'blur' }
        ],
        repassword: [
          { pattern: /^\S{6,15}$/, message: '密码长度必须是6~15位', trigger: 'blur' },
          { validator: samePwd, trigger: 'blur' }
        ]
      }
    }
  },
}
</script>
```

## 3.登录功能

### 3.1类比注册页面

```vue
// Login.vue
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
          <el-input v-model="loginForm.username" placeholder="请输入用户名" maxlength="10" minlength="1"></el-input>
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
          <el-button type="primary" class="btn-login">登录</el-button>
          <el-link type="info">去注册</el-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
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
```

### 3.2登录注册页面切换

> 使用编程式导航实现路由切换

在`Login.vue`页面中

```vue
// Login.vue
<el-link type="info" @click="$router.push('/reg')">去注册</el-link>
```

在`Reg.vue`页面中

```vue
// Reg.vue
<el-link type="info" @click="$router.push('/login')">去登录</el-link>
```

### 3.3点击登录按钮发送ajax请求

```vue
// Login.vue
// 1. 按钮注册点击事件绑定处理函数
// 2. 发送请求对整个表单进行兜底验证
// 3. 校验通过发送请求
<el-button type="primary" class="btn-login" @click="login">登录</el-button>
methods: {
    login() {
      this.$refs.loginRef.validate(async valid => {
        if(!valid) return
        //发起请求
        const {data:res} = await this.$http.post('/api/login', this.loginForm)
        // 登录失败
        if(res.code !== 0) return this.$message.error(res.message)
        //登录成功
        this.$message.success(res.message)
        // 在vuex中保存token
        this.$store.commit('updateToken', res.token)
        // 跳转主页
        this.$router.push('/')
      })
    }
  }
```

### 3.4永久保存token

在 `src/store/index.js` 中，定义`token`数据，以及更新token的`updateToken` mutation函数

```js
// store/index.js
export default new Vuex.Store({
  state: {
    // 1. 用来存储登录成功之后，得到的 token
    token: ''
  },
  mutations: {
    // 2. 更新 token 的 mutation 函数
    updateToken(state, newToken) {
      state.token = newToken
    }
  }
})
```

在`Login.vue`组件中，登录成功之后，调用vuex中的 `updateToken` 函数

```vue
// Login.vue
// 把 token 记录到 vuex 中
this.$store.commit('updateToken', res.token)
```

安装第三方包

> npm install --save vuex-persistedstate

在 `src/store/index.js` 模块中，导入并配置 `vuex-persistedstate` 包：

```js
// store/index.js
import Vue from 'vue'
import Vuex from 'vuex'
// 1. 导入包
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  // 2. 配置为 vuex 的插件
  plugins: [createPersistedState()],
  state: {
    token: ''
  },
  mutations: {
    updateToken(state, newToken) {
      state.token = newToken
    }
  }
})

```

### 3.5登录成功后跳转主页

在`views`文件夹下新建`Main/Main.vue`文件夹

```vue
// Main.vue
<template>
  <el-container class="main-container">
    <!-- 头部区域 -->
    <el-header>
      <!-- 左侧的 logo -->
      <img src="../../assets/images/logo.png" alt="" />
      <!-- 右侧的菜单 -->
      <el-menu
        class="el-menu-top"
        mode="horizontal"
        background-color="#23262E"
        text-color="#fff"
        active-text-color="#409EFF"
      >
        <el-submenu index="1">
          <template slot="title">
            <!-- 头像 -->
            <img src="../../assets/logo.png" alt="" class="avatar" />
            <span>个人中心</span>
          </template>
          <el-menu-item index="1-1"><i class="el-icon-s-operation"></i>基本资料</el-menu-item>
          <el-menu-item index="1-2"><i class="el-icon-camera"></i>更换头像</el-menu-item>
          <el-menu-item index="1-3"><i class="el-icon-key"></i>重置密码</el-menu-item>
        </el-submenu>
        <el-menu-item index="2"><i class="el-icon-switch-button"></i>退出</el-menu-item>
      </el-menu>
    </el-header>
    <el-container>
      <!-- 侧边栏区域 -->
      <el-aside width="200px">Aside</el-aside>
      <el-container>
        <!-- 页面主体区域 -->
        <el-main>
          Main.vue后台主页
        </el-main>
        <!-- 底部 footer 区域 -->
        <el-footer>© www.itheima.com - 黑马程序员</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Main'
}
</script>

<style lang="less" scoped>
.main-container {
  height: 100%;
  .el-header,
  .el-aside {
    background-color: #23262e;
  }
  .el-header {
    padding: 0;
    display: flex;
    justify-content: space-between;
  }
  .el-main {
    overflow-y: scroll;
    height: 0;
    background-color: #F2F2F2;
  }
  .el-footer {
    background-color: #eee;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.avatar {
  border-radius: 50%;
  width: 35px;
  height: 35px;
  background-color: #fff;
  margin-right: 10px;
  object-fit: cover;
}
</style>
```

导入并声明路由规则

```js
// router/index.js
// 1. 导入主页组件
import Main from '@/views/Main/Main.vue'
// 2. 声明路由规则
{ path: '/', component: Main }
```

### 3.6退出登录

> 1. 给对应按钮注册点击事件
> 2. 添加询问弹框
> 3. 跳转登录页
> 4. 清空token和用户信息

```vue
// Main.vue
// 1. 注册点击事件
<el-menu-item index="2" @click="logout">
  <i class="el-icon-switch-button"></i>退出
</el-menu-item>
logout() {
	// 2. 询问用户是否退出登录
	this.$confirm('您确定退出登录吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          // 成功之后的提示
          type: 'success',
          message: '退出登录成功!'
					// 3. 清空 token 和 用户信息,调用commit方法
					this.$store.commit('updateToken', '')
					this.$store.commit('updateUserInfo', {})
					// 4. 路由跳转登录页
					this.$router.push('/login')
     }).catch(() => {
        // 取消则不提示消息
      })
}
```

## 4.搭建侧边栏

### 4.1搭建侧边栏信息

```vue
// Main.vue
<!-- 顶部的用户头像 -->
<template slot="title">
  <!-- 头像 -->
  <img :src="userInfo.user_pic" alt="" class="avatar" v-if="userInfo.user_pic" />
  <img src="../../assets/logo.png" alt="" class="avatar" v-else />
  <span>个人中心</span>
</template>
<!-- 左侧边栏的用户信息 -->
<el-aside width="200px">
  <div class="user-box">
    <img :src="userInfo.user_pic" alt="" v-if="userInfo.user_pic" />
    <img src="../../assets/logo.png" alt="" v-else />
    <span>欢迎 {{ userInfo.nickname || userInfo.username }}</span>
  </div>
</el-aside>
```

`css`样式

```css
<!--Main.vue-->
// 左侧边栏用户信息区域
.user-box {
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
  user-select: none;
  img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-color: #fff;
    margin-right: 15px;
    object-fit: cover;
  }
  span {
    color: white;
    font-size: 12px;
  }
}
```

### 4.2给需要的接口设置统一的header以及处理401状态码

```js
// main.js
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // startsWith() 用来判断字符串是否以固定数据开头
  if(config.url.startsWith('/my')) {
    // 设置统一的headers
    config.headers.Authorization = store.state.token
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
})
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  // console.log(error)
  if(error.request.status === 401) {
    //清空token和用户信息
    store.commit('updateToken', '')
    store.commit('updateUserInfo', {})
    // 跳转登录页
    router.push('/login')
  }
  return Promise.reject(error)
})
```

参考文档 [`axios`中文文档](http://www.axios-js.com/zh-cn/docs/index.html)

### 4.3获取用户信息存储vuex

> 1. 在`Main.vue`组件中触发`vuex`的函数
> 2. 在`vuex`的`actions`中定义函数，使用`axios`发送请求获取用户信息
> 3. 将获取到的数据保存到`vuex`中

在`Main.vue`组件的`created`钩子函数中调用`vuex`中的`initUserInfo`函数，获取用户信息。

```js
// Main.vue
// 1. 在`Main.vue`组件中触发`vuex`的函数
created () {
    // 判断是否有token
    if (this.token) {
      // 如果有token, 可以请求数据获取用户的基本信息
      // 1. 调用actions中的函数
      // this.$store.dispatch('actions中的函数名)
      this.$store.dispatch('initUserInfo')
    }else {
      // 如果没有token就跳转到登录页
      this.$router.push('/login')
    }
  }
```

在`store/index.js`中，定义`initUserInfo`函数发送请求获取用户信息。

```js
// store/index.js
// 异步操作数据的地方
// 3. 将获取到的数据保存到`vuex`中
// 3.1 导入axios
import axios from 'axios'
// 3.2 在state中定义用户信息对象
...
state: {
  ...
  userInfo: {}
}
// 3.3 定义更新userInfo的函数
mutations; {
  ...
  updateUserInfo(state, info) {
      state.userInfo = info
    }
}
actions: {
    // 2. 在`vuex`的`actions`中定义函数，使用`axios`发送请求获取用户信息
    // 2.1 定义发送请求, 获取用户信息
    async initUserInfo (context) {
      // context: 是store的实例对象
      const { data: res } = await axios.get('/my/userinfo')
      if(res.code === 0) {
        // 2.2 将获取到的信息保存到vuex中的res.data
        context.commit('updateUserInfo', res.data)
}
    }
  }
```

流程图

![image-20220531212618584](E:\前端学习\00-typora笔记\08-vue项目\images\image-20220531212618584.png)

### 4.4渲染用户数据

> 1. 基于`mapState`辅助函数，把 `Vuex` 中的`userInfo`数据映射到当前组件中使用

```vue
// Main.vue
// 基于mapState辅助函数，把 Vuex 中的userInfo数据映射到当前组件中使用：
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['userInfo'])
  }
}
```

### 4.5搭建左侧菜单

> 1. 搭建页面结构
> 2. 定义`initMenus`函数获取左侧菜单的数据
> 3. 渲染左侧菜单的数据
> 4. 设置左侧菜单默认激活以及路由模式

```vue
<!-- 左侧边栏区域 -->
<el-aside width="200px">
     <div class="user-box">
     		<img :src="userInfo.user_pic" alt="" v-if="userInfo.user_pic" />
     		<img src="../../assets/logo.png" alt="" v-else />
     		<span>欢迎 {{ userInfo.nickname || userInfo.username }}</span>
     </div>
        <!-- $route当前组件的路由对象 -->
  			<!-- default-active设置默认激活，router属性开启路由模式 -->
  			<!-- :default-active="$route.path"将页面路径设为值，动态激活，router属性开启路由模式 -->
     <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      background-color="#23262E"
      text-color="#fff"
      active-text-color="#409EFF"
      unique-opened
      router
     >
          <!--unique-opened 是否只保持一个子菜单的展开 -->
       		<!--渲染菜单数据 -->
     <template v-for="item in menusList">
           <!-- 用template标签包裹 -->
           <!-- 不包含子菜单的“一级菜单” -->
      <el-menu-item
       :index="item.indexPath"
       :key="item.indexPath"
       v-if="!item.children"
      ><i :class="item.icon"></i>{{ item.title }}</el-menu-item
      >
            <!-- 包含子菜单的“一级菜单” -->
      <el-submenu :index="item.indexPath" :key="item.indexPath" v-else>
        <template slot="title">
        	<i :class="item.icon"></i>
        	<span>{{ item.title }}</span>
        </template>
      <el-menu-item
        :index="childItem.indexPath"
        v-for="childItem in item.children"
        :key="childItem.indexPath"
        ><i :class="childItem.icon"></i>{{ childItem.title }}
      </el-menu-item>
     </el-submenu>
    </template>
  </el-menu>
</el-aside>
```

> 侧边菜单栏的样式

```css
// Main.vue
// 侧边栏菜单的样式
.el-aside {
  .el-submenu,
  .el-menu-item {
    width: 200px;
    user-select: none;
  }
}
```

> 定义`initMenus`函数获取左侧菜单的数据

```js
// 初始化菜单数据
async initMenus () {
      const { data: res } = await this.$http.get('/my/menus')
      console.log(res)
      if(res.code === 0) {
        this.menusList = res.data
      }
}
```

> 在`data`中保存数据

```js
data(){
  return {
    menusList: []
  }
}
```

> 在`created`钩子函数中调用`initMenus`函数

```js
created() {
  ...
  this.initMenus()
},
```

### 4.6控制后台主页的访问权限以及路由重复调用path报错

> 1. 获取组件`token`
> 2. 判断是否有`token`值，有就允许访问，没有就跳转登录页。

```js
// 1. 在 `Main.vue` 组件中，通过 `mapState` 辅助函数，从 vuex 中把 `token` 映射到当前组件中使用
computed: {
    // 通过计算属性获取token的值
    ...mapState(['userInfo', 'token'])
  }
// 2. 判断是否有token
created () {
    // 判断是否有token
    if (this.token) {
      // 如果有token, 可以请求数据
      // 获取用户的基本信息
			...
      this.initMenus()
    }else {
      // 如果没有token就跳转到登录页
      this.$router.push('/login')
    }
  }
```

```js
// src/router/index.js 路由模块
Vue.use(VueRouter)
// 把下面的代码粘贴到路由模块中对应的位置，即可防止路由报错的问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
```

## 5.搭建主页

### 5.1页面基本结构

在 `src/views/` 目录下，新建 `/Menus/Home/Home.vue` 组件

```vue
<template>
  <div>
    <div class="container-fluid">
      <el-row class="spannel_list" :gutter="10">
        <el-col :sm="6" :xs="12">
          <div class="spannel">
            <em>10015</em><span>篇</span>
            <b>总文章数</b>
          </div>
        </el-col>
        <el-col :sm="6" :xs="12">
          <div class="spannel scolor01">
            <em>123</em><span>篇</span>
            <b>日新增文章数</b>
          </div>
        </el-col>
        <el-col :sm="6" :xs="12">
          <div class="spannel scolor02">
            <em>35</em><span>条</span>
            <b>评论总数</b>
          </div>
        </el-col>
        <el-col :sm="6" :xs="12">
          <div class="spannel scolor03">
            <em>123</em><span>条</span>
            <b>日新增评论数</b>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="container-fluid">
      <el-row class="curve-pie" :gutter="10">
        <el-col :sm="16" :xs="16">
          <div class="gragh_pannel" id="curve_show"></div>
        </el-col>
        <el-col :sm="8" :xs="8">
          <div class="gragh_pannel" id="pie_show"></div>
        </el-col>
      </el-row>
    </div>

    <div class="container-fluid">
      <div class="column_pannel" id="column_show"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'Home',
  mounted() {
    var oChart = echarts.init(document.getElementById('curve_show'))
    var aListAll = [
      { count: 36, date: '2019-04-13' },
      { count: 52, date: '2019-04-14' },
      { count: 78, date: '2019-04-15' },
      { count: 85, date: '2019-04-16' },
      { count: 65, date: '2019-04-17' },
      { count: 72, date: '2019-04-18' },
      { count: 88, date: '2019-04-19' },
      { count: 64, date: '2019-04-20' },
      { count: 72, date: '2019-04-21' },
      { count: 90, date: '2019-04-22' },
      { count: 96, date: '2019-04-23' },
      { count: 100, date: '2019-04-24' },
      { count: 102, date: '2019-04-25' },
      { count: 110, date: '2019-04-26' },
      { count: 123, date: '2019-04-27' },
      { count: 100, date: '2019-04-28' },
      { count: 132, date: '2019-04-29' },
      { count: 146, date: '2019-04-30' },
      { count: 200, date: '2019-05-01' },
      { count: 180, date: '2019-05-02' },
      { count: 163, date: '2019-05-03' },
      { count: 110, date: '2019-05-04' },
      { count: 80, date: '2019-05-05' },
      { count: 82, date: '2019-05-06' },
      { count: 70, date: '2019-05-07' },
      { count: 65, date: '2019-05-08' },
      { count: 54, date: '2019-05-09' },
      { count: 40, date: '2019-05-10' },
      { count: 45, date: '2019-05-11' },
      { count: 38, date: '2019-05-12' }
    ]

    const aCount = []
    const aDate = []

    for (var i = 0; i < aListAll.length; i++) {
      aCount.push(aListAll[i].count)
      aDate.push(aListAll[i].date)
    }

    var chartopt = {
      title: {
        text: '月新增文章数',
        left: 'center',
        top: '10'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['新增文章'],
        top: '40'
      },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['line', 'bar'] },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      calculable: true,
      xAxis: [
        {
          name: '日',
          type: 'category',
          boundaryGap: false,
          data: aDate
        }
      ],
      yAxis: [
        {
          name: '月新增文章数',
          type: 'value'
        }
      ],
      series: [
        {
          name: '新增文章',
          type: 'line',
          smooth: true,
          areaStyle: { type: 'default' },
          itemStyle: { color: '#f80', lineStyle: { color: '#f80' } },
          data: aCount
        }
      ],
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(255,136,0,0.39)'
            },
            {
              offset: 0.34,
              color: 'rgba(255,180,0,0.25)'
            },
            {
              offset: 1,
              color: 'rgba(255,222,0,0.00)'
            }
          ])
        }
      },
      grid: {
        show: true,
        x: 50,
        x2: 50,
        y: 80,
        height: 220
      }
    }

    oChart.setOption(chartopt)

    var oPie = echarts.init(document.getElementById('pie_show'))
    var oPieopt = {
      title: {
        top: 10,
        text: '分类文章数量比',
        x: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      color: ['#5885e8', '#13cfd5', '#00ce68', '#ff9565'],
      legend: {
        x: 'center',
        top: 65,
        data: ['奇趣事', '会生活', '爱旅行', '趣美味']
      },
      toolbox: {
        show: true,
        x: 'center',
        top: 35,
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          magicType: {
            show: true,
            type: ['pie', 'funnel'],
            option: {
              funnel: {
                x: '25%',
                width: '50%',
                funnelAlign: 'left',
                max: 1548
              }
            }
          },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      calculable: true,
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: ['45%', '60%'],
          center: ['50%', '65%'],
          data: [
            { value: 300, name: '奇趣事' },
            { value: 100, name: '会生活' },
            { value: 260, name: '爱旅行' },
            { value: 180, name: '趣美味' }
          ]
        }
      ]
    }
    oPie.setOption(oPieopt)

    var oColumn = echarts.init(document.getElementById('column_show'))
    var oColumnopt = {
      title: {
        text: '文章访问量',
        left: 'center',
        top: '10'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['奇趣事', '会生活', '爱旅行', '趣美味'],
        top: '40'
      },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['line', 'bar'] },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      calculable: true,
      xAxis: [
        {
          type: 'category',
          data: ['1月', '2月', '3月', '4月', '5月']
        }
      ],
      yAxis: [
        {
          name: '访问量',
          type: 'value'
        }
      ],
      series: [
        {
          name: '奇趣事',
          type: 'bar',
          barWidth: 20,
          areaStyle: { type: 'default' },
          itemStyle: {
            color: '#fd956a'
          },
          data: [800, 708, 920, 1090, 1200]
        },
        {
          name: '会生活',
          type: 'bar',
          barWidth: 20,
          areaStyle: { type: 'default' },
          itemStyle: {
            color: '#2bb6db'
          },
          data: [400, 468, 520, 690, 800]
        },
        {
          name: '爱旅行',
          type: 'bar',
          barWidth: 20,
          areaStyle: { type: 'default' },
          itemStyle: {
            color: '#13cfd5'
          },
          data: [500, 668, 520, 790, 900]
        },
        {
          name: '趣美味',
          type: 'bar',
          barWidth: 20,
          areaStyle: { type: 'default' },
          itemStyle: {
            color: '#00ce68'
          },
          data: [600, 508, 720, 890, 1000]
        }
      ],
      grid: {
        show: true,
        x: 50,
        x2: 30,
        y: 80,
        height: 260
      },
      dataZoom: [
        // 给x轴设置滚动条
        {
          start: 0, // 默认为0
          end: 100 - 1000 / 31, // 默认为100
          type: 'slider',
          show: true,
          xAxisIndex: [0],
          handleSize: 0, // 滑动条的 左右2个滑动条的大小
          height: 8, // 组件高度
          left: 45, // 左边的距离
          right: 50, // 右边的距离
          bottom: 26, // 右边的距离
          handleColor: '#ddd', // h滑动图标的颜色
          handleStyle: {
            borderColor: '#cacaca',
            borderWidth: '1',
            shadowBlur: 2,
            background: '#ddd',
            shadowColor: '#ddd'
          }
        }
      ]
    }
    oColumn.setOption(oColumnopt)
  }
}
</script>

<style lang="less" scoped>
.spannel_list {
  margin-top: 20px;
}

.spannel {
  height: 100px;
  overflow: hidden;
  text-align: center;
  position: relative;
  background-color: #fff;
  border: 1px solid #e7e7e9;
  margin-bottom: 20px;
}

.spannel em {
  font-style: normal;
  font-size: 50px;
  line-height: 50px;
  display: inline-block;
  margin: 10px 0 0 20px;
  font-family: 'Arial';
  color: #83a2ed;
}

.spannel span {
  font-size: 14px;
  display: inline-block;
  color: #83a2ed;
  margin-left: 10px;
}

.spannel b {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  line-height: 24px;
  background: #e5e5e5;
  color: #333;
  font-size: 14px;
  font-weight: normal;
}

.scolor01 em,
.scolor01 span {
  color: #6ac6e2;
}

.scolor02 em,
.scolor02 span {
  color: #5fd9de;
}

.scolor03 em,
.scolor03 span {
  color: #58d88e;
}

.gragh_pannel {
  height: 350px;
  border: 1px solid #e7e7e9;
  background-color: #fff !important;
  margin-bottom: 20px;
}

.column_pannel {
  margin-bottom: 20px;
  height: 400px;
  border: 1px solid #e7e7e9;
  background-color: #fff !important;
}
</style>
```

### 5.2安装`echarts`

```bash
yarn add echarts@5.2.1 -S
```

### 5.3导入组件并声明路由规则

```js
// 导入 Home组件
import Home from '@/views/Menus/Home/Home.vue'
{ path: '/', component: Main ,
  // 开启路由重定向
  redirect: '/home',
  children: [
    // home为子路由
{ path: 'home', component: Home }, ]}
```

### 5.4在`Main.vue`声明 `router-view` 

```vue
<!-- 页面主体区域 -->
<el-main>
  <router-view></router-view>
</el-main>
```

## 6.用户信息表单

![](D:\新建文件夹\feiq\Recv Files\作业\01-就业班\10-vue项目\course-notes-lh\images\Snipaste_2022-06-01_10-03-19.png)

> 1. 搭建页面结构
> 2. 给表单添加验证规则
> 3. 给表单绑定数据设置初始值
> 4. 重置表单功能
> 5. 提交修改发送请求

### 1.渲染用户表单的基本机构

新建`views\Menus\User\UserInfo.vue`文件，搭建基本结构

其中`model`是表单数据对象，`rules`是表单验证规则，`props`是表单域`model`字段

```vue
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
<style lang="less" scoped>
.el-form {
  width: 500px;
}
</style>
```

### 2.设置表单验证规则

```js
data () {
    return {
      // 2.1 给表单设置初始值
      // 2.2 使用浅拷贝，将vuex里面的数据拷贝到一个新的对象中，这样就不会改变vuex的数据了
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
```

### 3.重置表单功能

（注册点击事件 + 使用浅拷贝）

```js
methods: {
  // 重置表单的数据
  resetForm() {
    // 每次重置，都把 store 中最新的值取出来，赋值给 userForm
    // this.userForm = this.$store.state.userInfo
    // 因为v-model和userForm是双向绑定，如果直接将vuex中地址给到userForm，那么当表单数据改变就会改变vuex里面的数据
    // 所以可以使用浅拷贝，将vuex里面的数据拷贝到一个新的对象中，这样就不会改变vuex的数据了
     this.userForm = Object.assign({}, this.$store.state.userInfo);
  }
}
```

### 4.验证成功，提交修改

（注册点击事件 + 表单兜底校验 + 发送请求 + 更新vuex中的数据）

```js
submit () {
      this.$refs.userFormRef.validate(async valid => {
        if (!valid) return // 校验未通过
        //发送ajax
        const { data: res } = await this.$http.put('/my/userinfo', this.userForm)
        if (res.code !== 0) return this.$message.error(res.message)
        this.$message.success(res.message)
        // 触发actions里面的函数实现vuex中数据的更新
        this.$store.dispatch("initUserInfo")
      })
    }
```

## 7.更换头像

> 1. 搭建页面结构
> 2. 配置路由
> 3. 选择图片
> 4. 获取图片渲染到页面
> 5. 实现更换头像

### 1.搭建页面基本机构

新建`src\views\Menus\User\UserAvatar.vue`

```vue
<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>更换头像</span>
    </div>
    <div>
      <!-- 图片，用来展示用户选择的头像 -->
      <img :src="avatar" class="preview" alt="" v-if="avatar" />
      <img
        src="../../../assets/images/avatar.jpg"
        alt=""
        class="preview"
        v-else
      />
      <!-- 增加文件选择框 并隐藏 accept上传的类型 -->
      <input
        type="file"
        accept="image/*"
        style="display: none"
        ref="iptFile"
        @change="onFileChange"
      />
      <!-- 按钮区域 -->
      <div class="btn-box">
        <!-- 模拟文件选择框的点击事件 -->
        <el-button type="primary" icon="el-icon-plus" @click="$refs.iptFile.click()"
          >选择图片</el-button
        >
        <el-button
          type="success"
          icon="el-icon-upload"
          :disabled="avatar === ''"
          @click="uploadAvatar"
          >上传头像</el-button
        >
      </div>
    </div>
  </el-card>
</template>
<style lang="less" scoped>
.btn-box {
  margin-top: 10px;
}
.preview {
  object-fit: cover;
  width: 350px;
  height: 350px;
}
</style>
```

### 2.配置路由

```js
// 导入头像组件
import UserAvatar from '@/views/Menus/User/UserAvatar.vue'
// 头像子路由
{ path: 'user-avatar', component: UserAvatar }
```

### 3.选择图片

新建一个文件框并隐藏，给选择图片按钮模拟点击文件框事件

```vue
<!-- 增加文件选择框 并隐藏 accept上传的类型 -->
      <input
        type="file"
        accept="image/*"
        style="display: none"
        ref="iptFile"
        @change="onFileChange"
      />
<!-- 模拟文件选择框的点击事件 -->
        <el-button type="primary" icon="el-icon-plus" @click="$refs.iptFile.click()">
          选择图片</el-button>
```

### 4.获取图片渲染到页面

给文件框注册`change`事件，监听数据变化，通过事件对象获取选择的图片。

```js
<!-- 1. 给文件框注册`change`事件 -->
			<input
        type="file"
				...
        @change="onFileChange"
      />
// 3. data中新增 avatar 数据
  data () {
    return {
      avatar: ''
    }
  },
	methods: {
    // 2. 通过事件对象获取选择的图片
    onFileChange (e) {
      const files = e.target.files
      if (files.length > 0) {
        // 选择了图片
        // 2.1 创建FileReader对象
        const reader = new FileReader()
        // 2.2 调用readAsDataURL函数
        // readAsDataURL 方法会读取指定的 Blob 或 File 对象。
        /* 读取操作完成的时候，readyState 会变成已完成DONE，
        并触发 loadend (en-US) 事件，
        同时 result 属性将包含一个data:URL格式的字符串（base64编码）以表示所读取文件的内容。 */
        reader.readAsDataURL(files[0])
        // 此处需要使用箭头函数,不然this指向的是事件源 默认false事件冒泡,true事件捕获
        // 2.3 load监听读取完成, reader.resulet 图片对象
        reader.addEventListener("load",  () => {
        // 2.4 获取到base64字符串，存储到data中
          this.avatar = reader.result
        })
      } else {
        // 没有选择图片
        this.avatar = ''
      }
    },
  }
```

### 5.更换头像

给上传头像按钮注册点击事件，发送请求，更新vuex中的数据

```js
// 1. 注册点击事件
<el-button @click="uploadAvatar">上传头像</el-button>
// 2. 发送请求更新数据
async uploadAvatar () {
      const { data: res } = await this.$http.patch('/my/update/avatar',
        {
          avatar: this.avatar
        })
        if (res.code !== 0) return this.$message.error(res.message)
        this.$message.success(res.message)
        this.avatar = ''
        this.$store.dispatch('initUserInfo')
    }
```

## 8.更换密码

> 1. 搭建页面基本结构并验证表单规则
> 2. 配置路由
> 3. 重置表单
> 4. 更换密码

### 1.搭建页面基本结构并验证表单规则

新建`src\views\Menus\User\UserPwd.vue`文件

```vue
<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>重置密码</span>
    </div>
    <!-- 表单 -->
    <el-form
      :model="pwdForm"
      :rules="pwdFormRules"
      ref="pwdFormRef"
      label-width="100px"
    >
      <el-form-item label="原密码" prop="old_pwd">
        <el-input
          v-model="pwdForm.old_pwd"
          type="password"
          minlength="6"
          maxlength="15"
        ></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="new_pwd">
        <el-input v-model="pwdForm.new_pwd" type="password"></el-input>
      </el-form-item>
      <el-form-item label="确认新密码" prop="re_pwd">
        <el-input v-model="pwdForm.re_pwd" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updataPwd">修改密码</el-button>
        <!-- 重置表单 -->
        <el-button @click="$refs.pwdFormRef.resetFields()">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
export default {
  name: 'UserPwd',
  data () {
     // 检测新旧密码是否相同
    const samePwd = (rules, value, callback) => {
      if (value === this.pwdForm.old_pwd) {
        return callback(new Error('新旧密码不能相同'))
      } else {
        callback()
      }
    };
    // 检测两次新密码是否一致
    const rePwd = (rules, value, callback) => {
      if(value !== this.pwdForm.new_pwd) {
        return callback(new Error('密码不一致'))
      }else {
        callback()
      }
    }
    return {
      // 表单的数据对象
      pwdForm: {
        old_pwd: '',
        new_pwd: '',
        re_pwd: ''
      },
      // 表单的验证规则对象
      pwdFormRules: {
        old_pwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: /^\S{6,15}$/, message: '密码长度必须是6-15位的非空字符串', trigger: 'blur' }
        ],
        new_pwd: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { pattern: /^\S{6,15}$/, message: '密码长度必须是6-15位的非空字符串', trigger: 'blur' },
          { validator: samePwd, trigger: 'blur' }
        ],
        re_pwd: [
          { required: true, message: '请再次确认新密码', trigger: 'blur' },
          { pattern: /^\S{6,15}$/, message: '密码长度必须是6-15位的非空字符串', trigger: 'blur' },
          { validator: rePwd, trigger: 'blur' }
        ]
      },

    }
  },
}
</script>

<style lang="less" scoped>
.el-form {
  width: 500px;
}
</style>
```

### 2.配置路由

```js
// 导入重置密码模块
import UserPwd from '@/views/Menus/User/UserPwd.vue'
// 密码子路由
{ path: 'user-pwd', component: UserPwd }
```

### 3.重置表单

调用 `el-form` 提供的 `resetFields()` 函数，即可实现重置密码表单的功能，

注意：只能重置带有`prop`属性的表单

```vue
<el-button @click="$refs.pwdFormRef.resetFields()">重置</el-button>
```

### 4.更改密码

注册事件函数，表单校验，发送请求，重置表单

```js
// 1. 注册点击事件
<el-button type="primary" @click="updataPwd">修改密码</el-button>
// 
methods: {
  updataPwd() {
    // 2. 表单预校验 + 发起请求 + 重置表单
      this.$refs.pwdFormRef.validate(async valid => {
        if(!valid) return
        const { data:res } = await this.$http.patch('/my/updatepwd',this.pwdForm)
        if(res.code !== 0) return this.$message.error(res.message)
        this.$message.success(res.message)
        this.$refs.pwdFormRef.resetFields()
      })
    }
  }
```

## 9.文章管理-文章分类

> 1. 搭建页面结构并配置路由
> 2. 查询文章分类
> 3. 添加文章分类
> 4. 修改文章分类
> 5. 删除文章分类

### 1.搭建页面结构并配置路由

#### 搭建页面结构

新建`src\views\Menus\Article\ArtCate.vue`文件

```vue
<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix header-box">
        <span>文章分类</span>
        <el-button type="primary" size="mini" @click="addVisible = true"
          >添加分类</el-button
        >
      </div>

      <el-table style="width: 100%" :data="cateList" border stripe>
        <el-table-column label="序号" type="index" width="50">
        </el-table-column>
        <el-table-column prop="cate_name" label="分类名称"> </el-table-column>
        <el-table-column prop="cate_alias" label="分类别名"> </el-table-column>
        <el-table-column label="操作">
          <!-- row 每条数据的信息 -->
          <template v-slot="{ row }">
            <el-button
              type="primary"
              size="mini"
              @click="showEditDialog(row.id)"
              >修改</el-button
            >
            <el-button type="danger" size="mini" @click="remove(row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加分类的对话框 -->
    <!-- 关闭对话框时重置表单 -->
    <el-dialog
      title="添加文章分类"
      @closed="$refs.addFormRef.resetFields()"
      :visible.sync="addVisible"
      width="35%"
    >
      <el-form
        :model="addForm"
        label-width="70px"
        :rules="addFormRules"
        ref="addFormRef"
      >
        <el-form-item label="分类名称" prop="cate_name">
          <el-input v-model="addForm.cate_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类名称" prop="cate_alias">
          <el-input v-model="addForm.cate_alias" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCate">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改分类的对话框 -->
    <!-- 修改的表单 -->
    <el-dialog
      title="修改文章分类"
      @closed="$refs.editFormRef.resetFields()"
      :visible.sync="editVisible"
      width="35%"
    >
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="editCate">确 定</el-button>
      </span>
      <el-form
        :model="editForm"
        :rules="addFormRules"
        ref="editFormRef"
        label-width="100px"
      >
        <el-form-item label="分类名称" prop="cate_name">
          <el-input v-model="editForm.cate_name"></el-input>
        </el-form-item>
        <el-form-item label="分类别名" prop="cate_alias">
          <el-input v-model="editForm.cate_alias"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<style lang="less" scoped>
.header-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
```

#### 配置路由

```js
// 导入文章分类模块
import ArtCate from '@/views/Menus/Article/ArtCate.vue'
// 文章分类子路由
{ path: 'art-cate', component: ArtCate }
```

### 2.查询文章分类

```js
// 获取文章列表数据
    async initArtCateList () {
      const { data: res } = await this.$http.get('/my/cate/list')
      if (res.code === 0) {
        this.cateList = res.data
      }
    }
// data中声明 cateList 数组
data () {
    return {
      cateList: []
    }
}
// created 钩子函数中调用
created () {
    this.initArtCateList()
  }
```

```vue
// table 表格中添加data数据，prop根据接口文档。
<el-table style="width: 100%" :data="cateList" border stripe>
        <el-table-column label="序号" type="index" width="50">
        </el-table-column>
        <el-table-column prop="cate_name" label="分类名称"> </el-table-column>
        <el-table-column prop="cate_alias" label="分类别名"> </el-table-column>
        <el-table-column label="操作">
          <!-- row 每条数据的信息 -->
          <template v-slot="{ row }">
            <el-button
              type="primary"
              size="mini"
              @click="showEditDialog(row.id)"
              >修改</el-button
            >
            <el-button type="danger" size="mini" @click="remove(row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
```

### 3.添加文章分类

> 1. 渲染添加文章分类对话框
> 2. 在对话框关闭时重置表单
> 3. 实现添加文章分类功能

####  渲染添加分类弹框

```vue
<!-- 添加分类的对话框 -->
<!-- @closed="$refs.addFormRef.resetFields()"在对话框关闭时重置表单 -->
    <el-dialog
      title="添加文章分类"
      @closed="$refs.addFormRef.resetFields()"
      :visible.sync="addVisible"
      width="35%"
    >
      <el-form
        :model="addForm"
        label-width="70px"
        :rules="addFormRules"
        ref="addFormRef"
      >
        <el-form-item label="分类名称" prop="cate_name">
          <el-input v-model="addForm.cate_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类名称" prop="cate_alias">
          <el-input v-model="addForm.cate_alias" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCate">确 定</el-button>
      </div>
    </el-dialog>
```

表单验证规则

```js
data () {
    return {
      // 添加表单数据对象
      addForm: {
        cate_name: '',
        cate_alias: ''
      },
      // 显示隐藏添加分类对话框
      addVisible: false,
      // 添加验证规则
      addFormRules: {
        cate_name: [
          { required: true, message: '分类名称不能为空!', trigger: 'blur' },
          { pattern: /^\S{1,10}$/, message: '分类名称必须是1-10位的非空字符！', trigger: 'blur' }
        ],
        cate_alias: [
          { required: true, message: '分类别名不能为空!', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9]{1,15}$/, message: '分类别名必须是1-15位的字母数字！！', trigger: 'blur' }
        ]
      },
```

#### 添加文章分类功能

给确定按钮注册事件，表单预校验，发送请求，关闭对话框，重新请求列表数据。

```vue
// 给确定按钮注册事件
<el-button type="primary" @click="addCate">确 定</el-button>
```

```js
// 表单预校验，发送请求，关闭对话框，重新请求列表数据。
addCate () {
      // 表单预校验
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return // 未通过校验
        const { data: res } = await this.$http.post('/my/cate/add', this.addForm)
        if (res.code === 0) {
          // 通过校验,关闭对话框,重新请求列表数据
          this.addVisible = false
          this.initArtCateList()
          this.$message.success(res.message)
        }
      })
    }
```

### 4.修改文章分类

> 1. 渲染修改文章分类对话框
> 2. 在对话框关闭时重置表单
> 3. 根据Id获取文章分类数据填充到表单中
> 4. 实现修改文章分类功能

####  渲染修改文章分类对话框

```vue
<!-- 修改分类的对话框 -->
<!-- 在对话框关闭时重置表单 @closed="$refs.editFormRef.resetFields()"  -->
    <el-dialog
      title="修改文章分类"
      @closed="$refs.editFormRef.resetFields()"
      :visible.sync="editVisible"
      width="35%"
    >
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="editCate">确 定</el-button>
      </span>
      <el-form
        :model="editForm"
        :rules="addFormRules"
        ref="editFormRef"
        label-width="100px"
      >
        <el-form-item label="分类名称" prop="cate_name">
          <el-input v-model="editForm.cate_name"></el-input>
        </el-form-item>
        <el-form-item label="分类别名" prop="cate_alias">
          <el-input v-model="editForm.cate_alias"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
```

表单验证规则

```js
data () {
    return {
      ...
      editForm: {
        // 文章修改的数据
        cate_name: '',
        cate_alias: ''
      },
			...
      // 显示隐藏修改分类对话框
      editVisible: false
    }
  }
```

#### 根据Id获取文章分类数据

为修改按钮注册点击事件，发送请求获取数据，展示对话框

```vue
// 注册点击事件
<template v-slot="{ row }">
            <el-button
              ...
              @click="showEditDialog(row.id)"
              >修改</el-button>
</template>
```

```js
// 发送请求根据id获取数据，展示对话框
async showEditDialog (id) {
      // 获取分类信息
      const { data: res } = await this.$http.get('/my/cate/info', {
        params: {
          id
        }
      }
      )
      if (res.code === 0) {
        this.editForm = res.data
        // 展示对话框
        this.editVisible = true
      }
    }
```

#### 修改文章分类

给确定按钮注册点击事件，表单预校验，发送请求，关闭对话框，刷新列表。

```vue
// 给确定按钮注册点击事件
<el-button type="primary" @click="editCate">确 定</el-button>
```

```js
// 表单预校验，发送请求，关闭对话框，刷新列表。
editCate () {
      // 注册事件 + 表单验证 + 发送请求 + 关闭对话框 + 刷新列表
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.put('/my/cate/info', this.editForm)
        if (res.code !== 0) return this.$message.error(res.message)
        this.$message.success(res.message)
        this.editVisible = false
        this.initArtCateList()
      })
    }
```

### 5.删除文章分类

> 1. 注册点击事件
> 2. 询问对话框
> 3. 发送请求
> 4. 刷新列表

```vue
// 给删除按钮注册事件
<el-button type="danger" size="mini" @click="remove(row.id)">删除</el-button>
```

```js
// 询问对话框 + 发送请求 + 刷新列表
    async remove (id) {
      this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 删除对应的分类
        const { data: res } = await this.$http.delete('/my/cate/del', {
          params: {id}
        })
        if (res.code !== 0) return this.$message.error('删除文章分类失败')
        this.$message.success('删除文章分类成功')
        this.editVisible = false
        this.initArtCateList()
      }).catch(err => err)
    }
```

## 10.文章管理-文章列表

> 1. 搭建页面结构并配置路由
> 2. 搭建发布文章弹框
> 3. 完成发布文章功能
> 4. 渲染文章列表数据
> 5. 渲染表格数据
> 6. 分页功能
> 7. 筛选功能和重置功能
> 8. 点击文章标题获取详情
> 9. 删除文章

### 搭建页面结构并配置路由

新建`src/views/Menus/Article/ArtList.vue`组件

```vue
<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>文章列表</span>
      </div>
      <!-- 搜索区域 -->
      <div class="search-box">
        <el-form :inline="true" :model="q">
          <el-form-item label="文章分类">
            <el-select v-model="q.cate_id" placeholder="请选择分类" size="small">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发布状态" style="margin-left: 15px;">
            <el-select v-model="q.state" placeholder="请选择状态" size="small">
              <el-option label="已发布" value="已发布"></el-option>
              <el-option label="草稿" value="草稿"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small">筛选</el-button>
            <el-button type="info" size="small">重置</el-button>
          </el-form-item>
        </el-form>
        <!-- 发表文章的按钮 -->
        <el-button type="primary" size="small" class="btn-pub">发表文章</el-button>
      </div>

      <!-- 文章表格区域 -->

      <!-- 分页区域 -->
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'ArtList',
  data() {
    return {
      // 查询参数对象
      q: {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
.search-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  .btn-pub {
    margin-top: 5px;
  }
}
</style>
```

配置路由

```js
// 导入文章列表模块
import ArtList from '@/views/Menus/Article/ArtList.vue'
// 文章列表子路由
{ path: 'art-list', component: ArtList }
```

### 搭建发布文章弹框

```vue
<!-- 发表文章对话框start -->
        <!-- 对话框关闭后,清空内容 -->
        <el-dialog
          title="发表文章"
          :visible.sync="pubDialogVisible"
          fullscreen
          :before-close="handleClose"
          @close="onloadClosed"
        >
        </el-dialog>
<!-- 发表文章对话框end -->
```

在`data`中定义数据控制发表文章对话框的显示与隐藏

```js
data() {
  return {
    // 控制发表文章对话框的显示与隐藏
    pubDialogVisible: false
  }
}
```

#### 点击发表文章按钮，展示对话框

```vue
<el-button
          type="primary"
          size="small"
          class="btn-pub"
          @click="pubDialogVisible = true"
          >发表文章</el-button>
```

#### 文章标题和文章分类表单

```vue
<!-- 发布文章的对话框 -->
          <el-form
            :model="pubForm"
            :rules="pubFormRules"
            ref="pubFormRef"
            label-width="100px">
            <!-- 文章标题 -->
            <el-form-item label="文章标题" prop="title">
              <el-input
                v-model="pubForm.title"
                placeholder="请输入标题"
              ></el-input>
            </el-form-item>
            <!-- 文章分类 -->
            <el-form-item label="文章分类" prop="cate_id">
              <el-select
                v-model="pubForm.cate_id"
                placeholder="请选择分类"
                style="width: 100%">
                <el-option
                  v-for="item in getList"
                  :key="item.id"
                  :label="item.cate_name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
           </el-form>
```

表单验证

```js
data () {
    return {
      pubForm: {
        title: '',
        cate_id: '',
      },
      pubFormRules: {
        title: [{ required: true, message: '请输入文章标题', trigger: 'blur' },
        { min: 1, max: 30, message: '文章标题的长度为1-30个字符', trigger: 'blur' }],
        cate_id: [{ required: true, message: '请选择文章分类', trigger: 'change' }],
      }
```

#### 富文本编辑器

安装富文本编辑器

```bash
yarn add vue-quill-editor@3.0.6 -S
```

在`main.js`中引入并注册

```js
// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
// 导入富文本编辑器的样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
...
// 全局注册富文本编辑器
Vue.use(VueQuillEditor)
```

在`ArtList.vue`组件的 data 中，定义富文本编辑器对应的数据项：

```js
data() {
  return {
    // 表单的数据对象
    pubForm: {
			...
      // 文章的内容
      content: ''
    },
  }
}
```

在模板结构中添加

```vue
<el-form-item label="文章内容">
  <!-- 使用 v-model 进行双向的数据绑定 -->
  <quill-editor v-model="pubForm.content"></quill-editor>
</el-form-item>
```

美化富文本编辑器样式

```css
// 设置富文本编辑器的默认最小高度
// deep 深度作用选择器
/deep/ .ql-editor {
  min-height: 300px;
}
```

增加验证规则

```js
// 表单验证规则对象
pubFormRules: {
  content: [
    ...
    { required: true, message: "请输入文章内容", trigger: "blur" },
  ]
}
```

#### 文章封面

基本结构

```vue
<!-- 文章封面 -->
            <el-form-item label="文章封面">
              <!-- 用来显示封面的图片 -->
              <!-- 默认图片 -->
              <img
                src="../../../assets/images/cover.jpg"
                class="cover-img"
                ref="imgRef"
                alt=""/>
              <!-- 文件上传框，默认隐藏 -->
              <input
                type="file"
                style="display: none"
                accept="image/*"
                @change="onloadCover"
                ref="iptFile"/>
              <div>
                <!-- 选择封面按钮 -->
                <el-button @click="$refs.iptFile.click()">+选择封面</el-button>
              </div>
            </el-form-item>
```

封面样式

```css
// 设置图片封面的宽高
.cover-img {
  width: 400px;
  height: 280px;
  object-fit: cover;
}
```

类似更换头像功能

隐藏一个文件上传框，给选择封面按钮注册模拟点击文件上传事件，给file框注册change事件(把图片对象转化为url)

```js
onloadCover (e) {
      // 获取用户选择的文件
      const files = e.target.files
      if (files.length === 0) {
        // 没有选择封面
        this.pubForm.cover_img = null
        // 设置封面的默认地址
        this.$refs.imgRef.setAttribute('src', defaultImg)

      } else {
        this.pubForm.cover_img = files[0]
        const url = URL.createObjectURL(files[0])
        this.$refs.imgRef.setAttribute('src', url)
        // element.setAttribute(name, value) 将value新值赋值给name,
        // 清空value
        e.target.value = ''
      }
    }
```

在`data`中添加用户选择的封面图片

```js
data() {
  return {
    pubForm: {
			...
      // 用户选择的封面图片（null 表示没有选择任何封面）
      cover_img: null
    },
  }
}
```

给file框注册change事件

```js
// 导入默认的封面图片
import defaultImg from '@/assets/images/cover.jpg'
onloadCover (e) {
      // 获取用户选择的文件
      const files = e.target.files
      if (files.length === 0) {
        // 没有选择封面
        this.pubForm.cover_img = null
        // 设置封面的默认地址
        this.$refs.imgRef.setAttribute('src', defaultImg)
      } else {
        // 选择封面
        this.pubForm.cover_img = files[0]
        const url = URL.createObjectURL(files[0])
        this.$refs.imgRef.setAttribute('src', url)
        // element.setAttribute(name, value) 将value新值赋值给name,
        // 清空value，不然上传同一张图片不会触发change事件
        e.target.value = ''
      }
    }
```

#### 发表文章与存为草稿

给对应按钮注册事件，在data中的pubForm对象上，定义`state`属性，用来存储文章的发布状态，设置函数。

```vue
// 注册事件
<el-button type="primary" @click="pubArticle('已发布')">发布</el-button>
<el-button type="info" @click="pubArticle('草稿')">存为草稿</el-button>
```

在data中的pubForm对象上，定义`state`属性

```js
data() {
  return {
    // 表单的数据对象
    pubForm: {
			...
      // 文章的发布状态，可选值有两个：草稿、已发布
      state: ''
    }
  }
}
```

设置函数

> 1. 设置发布状态，表单预校验，判断是否有文章封面，发送请求，重新获取列表，关闭对话框。

```js
pubArticle (state) {
      // 设置发布状态
      this.pubForm.state = state
      // 表单预校验
      this.$refs.pubFormRef.validate(async valid => {
        if (!valid) return this.$message.error('请完善信息')
        // 判断文章封面
        if (!this.pubForm.cover_img) return this.$message.error('请添加封面')
        // 发布文章
        // console.log(this.pubForm)
        // 发送请求
        // 创建 FormData 对象
        const fd = new FormData()
        // 向 FormData 中追加数据
        Object.keys(this.pubForm).forEach(key => {
          fd.append(key, this.pubForm[key])
        })
        // 发送请求
        const { data: res } = await this.$http.post('/my/article/add', fd)
        if (res.code !== 0) return this.$message.error(res.message)
        this.$message.success(res.message)
        // 重新获取列表
        this.initArtList()
        // 关闭对话框
        this.pubDialogVisible = false
      })
    }
```

#### 关闭前询问对话框

```js
// 在dialog中添加
:before-close="handleClose"
// 定义函数，关闭前询问对话框
    handleClose (done) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(_ => {
          done();
        })
        .catch(_ => { });
    }
```

#### 关闭后重置对话框

在`dialog`中注册`closed`事件

```vue
<el-dialog
          ...
          @close="onloadClosed"
        >
 ...
 </el-dialog>
```

在`methods`中定义函数

```js
onloadClosed () {
      // 清空关键数据
      this.$refs.pubFormRef.resetFields()
      // 清空文章内容
      this.pubForm.content = ''
      // 清空封面
      this.pubForm.cover_img = null
      // 清空状态
      this.pubForm.state = ''
      // 封面恢复默认
      this.$refs.imgRef.setAttribute('src', defaultImg)
    }
```

### 渲染文章列表数据

定义初始化数据，`created`钩子函数中调用，data中添加`q`对象和`articleList`数组

```js
// 获取文章列表数据
    async initCateList () {
      const { data: res } = await this.$http.get('/my/article/list', {
        params: this.q
      })
      if (res.code === 0) {
        this.articleList = res.data
      }
    }
```

data中添加`q`对象和`articleList`数组

```js
data () {
    return {
      // 文章详情
      articleList: [],
      // 查询参数对象
      q: {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
      },
      // 控制发表文章的显示与隐藏
      pubDialogVisible: false,
      // 总数据条数
      total: 0,
    }
  }
```

`created`钩子函数中调用

```js
created() {
  // 请求文章的列表数据
  this.initArtList()
},
```

### 文章详情表格区域

> 1. 搭建表格结构以及文章详情弹框
> 2. 格式化时间格式
> 3. 实现分页功能
> 4. 根据页码值改变数据
> 5. 点击文章标题显示详情
> 6. 删除文章

#### 搭建表格结构以及文章详情弹框

```vue
<!-- 文章表格区域 -->
      <el-table :data="artList" style="width: 100%" border stripe>
        <el-table-column label="文章标题" prop="title">
          <template v-slot="{ row }">
            <el-link type="primary" @click="showDatial(row.id)">
              {{ row.title }}
            </el-link>
          </template>
        </el-table-column>
        <el-table-column label="分类" prop="cate_name"></el-table-column>
        <el-table-column label="发表时间" prop="pub_date">
          <template v-slot="{ row }">
            {{ formDate(row.pub_date) }}
          </template>
        </el-table-column>
        <el-table-column label="状态" prop="state"></el-table-column>
        <el-table-column label="操作">
          <template v-slot="{ row }">
            <el-button type="danger" size="mini" @click="deleteArt(row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
<!-- 查看文章详情的对话框0 -->
      <el-dialog
        :title="artDetail.title"
        :visible.sync="detailVisible"
        width="80%"
      >
        <div class="info">
          <span>作者：{{ artDetail.nickname || artDetail.username }}</span>
          <span>发布时间：{{ formDate(artDetail.pub_date) }}</span>
          <span>所属分类：{{ artDetail.cate_name }}</span>
          <span>状态：{{ artDetail.state }}</span>
        </div>
        <!-- 分隔线 -->
        <el-divider></el-divider>
        <img
          :src="'http://big-event-vue-api-t.itheima.net' + artDetail.cover_img"
          alt=""
        />
        <div v-html="artDetail.content"></div>
      </el-dialog>
<!-- 查看文章详情的对话框1 -->
```

#### 格式化时间格式

安装第三方包

```vue
yarn add dayjs@1.10.7 -S
```

导入并格式化时间函数

```js
import dayjs from 'dayjs'
// 格式化时间函数
formDate (time) {
    return  dayjs(time).format('YYYY-MM-DD HH:mm:ss')
}
```

在组件对应位置使用

```vue
<template v-slot="{ row }">
      {{ formDate(row.pub_date) }}
</template>
```

#### 分页功能

分页样式

```css
.el-pagination {
  margin-top: 15px;
}
```

在data函数中定义`total`并在获取文章列表数据中保存

#### 根据页码值改变数据

声明 `handleCurrentChange` 函数，监听页码值的变化,声明 `handleSizeChange` 函数，监听 pageSize 的变化。

```js
// 页面跳转时触发
handleCurrentChange(newPage) {
 // 设置q对象中pagenum页码数 
  this.q.pagenum = newPage;
  // 重新获取文章的数据
  this.initArtList();
},
 // pageSize 发生了变化
handleSizeChange(newSize) {
  // 为 pagesize 赋值
  this.q.pagesize = newSize
  // 默认展示第一页数据
  this.pagenum = 1
  // 重新发起请求
  this.initArtList()
},
```

#### 筛选功能和重置功能

动态为筛选表单中的**文章分类**下拉菜单，渲染可选项列表,点击筛选按钮重新获取数据

```vue
<el-form-item label="文章分类">
  <el-select v-model="q.cate_id" placeholder="请选择分类" size="small">
    <!-- 循环渲染可选项 -->
    <el-option v-for="item in cateList" :key="item.id" :label="item.cate_name" :value="item.id">
    </el-option>
  </el-select>
</el-form-item>
```

```vue
<el-button type="primary" size="small" @click="initArtList">筛选</el-button>
```

重置功能

注册点击事件

```vue
<el-button type="info" size="small" @click="resetList">重置</el-button>
```

声明`resetList`函数

```js
// 重置文章的列表数据
resetList() {
  // 1. 重置查询参数对象
  this.q = {
    pagenum: 1,
    pagesize: 2,
    cate_id: '',
    state: ''
  }
  // 2. 重新发起请求
  this.initArtList()
}
```

#### 点击文章标题获取详情

给文章标题绑定事件

```vue
<el-link type="primary" @click="showDetail(row.id)">{{ row.title }}</el-link>
```

声明`showDetail`函数

```js
// 点击标题显示详情
    // 发送请求获取数据
    async showDetail (id) {
      const { data: res } = await this.$http.get('/my/article/info', {
        params: { id }
      })
      if (res.code === 0) {
        // console.log(res)
        this.artDetail = res.data
        // 打开对话框
        this.detailVisible = true
      }
    }
```

在data中定义`artDetail`对象和文章详情对话框显示与隐藏

```js
data() {
  return {
    // 文章的详情信息对象
    artDetail: {},
    detialVisible: false, // 控制文章预览区的对话框的显示和隐藏
  }
}
```

文章详情对话框css样式

```css
.title {
  font-size: 24px;
  text-align: center;
  font-weight: normal;
  color: #000;
  margin: 0 0 10px 0;
}

.info {
  font-size: 12px;
  span {
    margin-right: 20px;
  }
}
```

在搭建页面结构时已经渲染文章详情对话框数据

### 删除文章

注册点击事件，询问框，发送请求，刷新列表数据

注册事件

```vue
<el-table-column label="操作">
  <template v-slot="{ row }">
    <el-button type="danger" size="mini" @click="remove(row.id)">删除</el-button>
  </template>
</el-table-column>
```

声明`remove`函数

```js
// 根据 id 删除文章
    remove (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 删除成功
        const { data: res } = await this.$http.delete('/my/article/info', {
          params: { id }
        })
        if (res.code !== 0) return this.$message.error(res.message)
        this.$message.success(res.message)
        // 如果在刷新数据之前,当前页的数据只有 1 条，
        // 而且，当前的页码值 > 1，
        // 则说明当前页已没有数据可显示，需要让页码值 -1
        if (this.articleList.length === 1 && this.q.pagenum > 1) {
          this.q.pagenum--
        }
        // 重新获取列表
        this.initCateList()
      }).catch(() => {
        // 删除失败
      })
    }
```

## 11.大事件项目完成
