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
// 导入重置密码模块
import UserPwd from '@/views/Menus/User/UserPwd.vue'
// 导入文章分类模块
import ArtCate from '@/views/Menus/Article/ArtCate.vue'
// 导入文章列表模块
import ArtList from '@/views/Menus/Article/ArtList.vue'
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
    { path: 'user-avatar', component: UserAvatar },
    // 密码子路由
    { path: 'user-pwd', component: UserPwd },
    // 文章分类子路由
    { path: 'art-cate', component: ArtCate },
    // 文章列表子路由
    { path: 'art-list', component: ArtList }
  ]
},
  
]

const router = new VueRouter({
  routes
})

export default router
