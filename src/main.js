import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入element-ui
import ElementUI from 'element-ui'
// 引入element-ui样式
import 'element-ui/lib/theme-chalk/index.css'
// 1.导入axios
import axios from 'axios'
// 导入全局样式表
import '@/assets/global.less'
// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
// 导入富文本编辑器的样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

// 全局注册富文本编辑器
Vue.use(VueQuillEditor)
// 设置axios根路径
axios.defaults.baseURL = 'http://big-event-vue-api-t.itheima.net'
// 2.挂载axios到Vue构造函数的原型对象上
Vue.prototype.$http = axios
Vue.config.productionTip = false
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // startsWith() 用来判断字符串是否以固定数据开头
  if(config.url.startsWith('/my')) {
    // 设置统一的headers
    config.headers.Authorization = store.state.token
    console.log(config)
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
// 全局注册组件
Vue.use(ElementUI)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
