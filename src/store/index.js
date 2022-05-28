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
    // 2.3 定义更新userInfo的函数
    updateUserInfo(state, info) {
      state.userInfo = info
      // console.log(state.userInfo)

    }
  },
  // 异步操作数据的地方
  actions: {
    // 定义发送请求, 获取用户信息
    async initUserInfo (context) {
      // context: 是store的实例对象
      const {data:res} = await axios.get('/my/userinfo')
      if(res.code === 0) {
        // 将获取到的信息保存到vuex中的res.data
        context.commit('updateUserInfo', res.data)
      }
    }
  },
  modules: {
  }
})
