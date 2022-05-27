import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    // 储存登录数据
    // token: localStorage.getItem('token') || ''
    token: ''
  },
  getters: {
  },
  // 唯一同步更新数据的地方
  mutations: {
    // 更新token
    updateToken(state, newToken) {
      state.token = newToken
    }
  },
  // 异步操作数据的地方
  actions: {
  },
  modules: {
  }
})
