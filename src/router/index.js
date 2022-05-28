import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入登录注册组件
import Reg from '@/views/Reg/Reg.vue'
import Login from '@/views/Login/Login.vue'
// 导入 Home组件
import Home from '@/views/Menus/Home/Home.vue'
// 导入主页组件
import Main from '@/views/Main/Main.vue'
// 导入用户信息组件
import UserInfo from '@/views/Menus/User/UserInfo.vue'
// 导入头像组件
import UserAvatar from '@/views/Menus/User/UserAvatar.vue'
Vue.use(VueRouter)
//防止路由报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
// 声明路由规则
const routes = [
  { path: '/reg', component: Reg },
  { path: '/login', component: Login },
  { path: '/', component: Main ,
  // 开启路由重定向
  redirect: '/home',
  children: [
    // home为子路由
    { path: 'home', component: Home },
    // 用户信息子路由
    { path: 'user-info', component: UserInfo },
    // 头像子路由
    { path: 'user-avatar', component: UserAvatar }

  ]
},
  
]

const router = new VueRouter({
  routes
})

export default router
