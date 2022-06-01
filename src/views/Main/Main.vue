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
            <img
              :src="userInfo.user_pic"
              alt=""
              class="avatar"
              v-if="userInfo.user_pic"
            />
            <img src="../../assets/logo.png" alt="" class="avatar" v-else />
            <span>个人中心</span>
          </template>
          <el-menu-item index="1-1"
            ><i class="el-icon-s-operation"></i>基本资料</el-menu-item
          >
          <el-menu-item index="1-2"
            ><i class="el-icon-camera"></i>更换头像</el-menu-item
          >
          <el-menu-item index="1-3"
            ><i class="el-icon-key"></i>重置密码</el-menu-item
          >
        </el-submenu>
        <el-menu-item index="2" @click="logout"
          ><i class="el-icon-switch-button"></i>退出</el-menu-item
        >
      </el-menu>
    </el-header>
    <el-container>
      <!-- 左侧边栏区域 -->
      <el-aside width="200px">
        <div class="user-box">
          <img :src="userInfo.user_pic" alt="" v-if="userInfo.user_pic" />
          <img src="../../assets/logo.png" alt="" v-else />
          <span>欢迎 {{ userInfo.nickname || userInfo.username }}</span>
        </div>
        <!-- $route当前组件的路由对象 -->
        <!-- default-active设置默认激活，router属性开启路由模式 -->
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
                ><i :class="childItem.icon"></i
                >{{ childItem.title }}</el-menu-item
              >
            </el-submenu>
          </template>
        </el-menu>
      </el-aside>
      <el-container>
        <!-- 页面主体区域 -->
        <el-main>
          <router-view></router-view>
        </el-main>
        <!-- 底部 footer 区域 -->
        <el-footer>© www.itheima.com - 黑马程序员</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
// 基于mapState辅助函数，把 Vuex 中的userInfo数据映射到当前组件中使用：
import { mapState } from 'vuex'
export default {
  name: 'Main',
  data () {
    return {
      // 保存菜单列表
      menusList: []
    }
  },
  methods: {
    logout () {
      // 退出登录
      this.$confirm('您确定退出登录吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          // 成功之后的提示
          type: 'success',
          message: '退出登录成功!'
        })
        // 清空token
        this.$store.commit('updateToken', '')
        // 清空userInfo
        this.$store.commit('updateUserInfo', {})
        // 跳转登录页
        this.$router.push('/login')
      }).catch(() => {
        // 取消则不提示消息
      })
    },
    // 初始化菜单数据
    async initMenus () {
      // 发送请求
      const { data: res } = await this.$http.get('/my/menus')
      console.log(res)
      if(res.code === 0) {
        this.menusList = res.data
      }
    }
  },
  created () {
    // 判断是否有token
    if (this.token) {
      // 如果有token, 可以请求数据
      // 获取用户的基本信息
      // 1. 调用actions中的函数
      // this.$store.dispatch('actions中的函数名)
      this.$store.dispatch('initUserInfo')
      this.initMenus()
    }else {
      // 如果没有token就跳转到登录页
      this.$router.push('/login')
    }
  },
  computed: {
    // 通过计算属性获取token的值
    ...mapState(['userInfo', 'token'])
  }
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
    background-color: #f2f2f2;
  }
  .el-footer {
    background-color: #eee;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

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

  // 侧边栏菜单的样式
  .el-aside {
    .el-submenu,
    .el-menu-item {
      width: 200px;
      user-select: none;
    }
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
