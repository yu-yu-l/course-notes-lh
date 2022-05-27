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
// 设置axios根路径
axios.defaults.baseURL = 'http://www.liulongbin.top:3008'
// 2.挂载axios
Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
