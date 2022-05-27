import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
// 2. 获取用户基本信息
// 2.1 导入axios
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    // 储存登录数据
    // token: localStorage.getItem('token') || ''
    token: '',
    // 2.2 定义用户信息对象
    userInfo: {}
  },
  getters: {
  },
  // 唯一同步更新数据的地方
  mutations: {
    // 更新token
    updateToken(state, newToken) {
      state.token = newToken
    },
    // 2.3 更新用户信息
    updateUserInfo(state, info) {
      state.userInfo = info
    }
  },
  // 异步操作数据的地方
  actions: {
    // 2.4 定义初始化用户基本信息的action函数
    async initUserInfo(context) {
      const {data:res} = await axios.get('/my/userinfo', {
        header: {
          // 需要在请求头中携带 Authorization 身份认证字段，才能正常访问成功
          Authorization: context.state.token
        }
      })
      if (res.code === 0) {
        context.commit('initUserInfo', res.data)
      }
    }
  },
  modules: {
  }
})
