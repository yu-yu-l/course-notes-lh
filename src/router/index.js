import Vue from 'vue'
import VueRouter from 'vue-router'

// 导入登录注册组件
import Reg from '@/views/Reg/Reg.vue'
import Login from '@/views/Login/Login.vue'
import Main from '@/views/Main/Main.vue'
Vue.use(VueRouter)

// 声明路由规则
const routes = [
  { path: '/reg', component: Reg },
  { path: '/login', component: Login },
  { path: '/', component: Main }
]

const router = new VueRouter({
  routes
})

export default router
