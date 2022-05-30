# vue大事件项目

[项目演示地址](http://liulongbin.top:8086/login)

[接口文档](https://www.showdoc.com.cn/1425457596992351/697262026446225)

[接口根路径](http://big-event-vue-api-t.itheima.net)

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
main.js
// 1.导入axios
import axios from 'axios'
// 2.把axios挂载到Vue的原型对象中
Vue.prototype.$http = axios
// 设置axios根路径
axios.defaults.baseURL = 'http://www.liulongbin.top:300'
```

### 1.5配置element-ui

```js
main.js
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

#### 2.1Reg.vue基本样式

```vue
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

#### 2.2导入登录注册模块并声明路由规则

```js
routers/index.js
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

#### 2.3在assets文件夹下创建global.less样式文件

```less
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

#### 2.4在mian.js中引入

```js
// 3. 导入全局样式表
import '@/assets/global.less'
```

### 2.5渲染注册页面UI结构

```vue
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
<el-link type="info" @click="$router.push('/reg')">去注册</el-link>
```

在`Reg.vue`页面中

```vue
<el-link type="info" @click="$router.push('/login')">去登录</el-link>
```

### 3.3点击登录按钮发送ajax请求

```vue
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
// 把 token 记录到 vuex 中
this.$store.commit('updateToken', res.token)
```

安装第三方包

> npm install --save vuex-persistedstate

在 `src/store/index.js` 模块中，导入并配置 `vuex-persistedstate` 包：

```js
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
