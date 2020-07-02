import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

import * as notification from '@/store/modules/notification.js'
// import SHService from '@/services/SHService.js'

// COULD USE STORE DIRECTORY, MODULES DIRECTORY, SEPARATE FILES WITHIN TO MODULARIZE THE STORE
Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
  modules: {
    // auth,
    notification
    // password,
    // signup
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
  state: {
    // authUser: {},
    // isAuthenticated: false,
    // jwt: localStorage.getItem('token'),
    // endpoints: {
    //   // TODO: Remove hardcoding of dev endpoints
    //   obtainJWT: 'http://127.0.0.1:8000/api/auth/obtain_token/',
    //   refreshJWT: 'http://127.0.0.1:8000/api/auth/refresh_token/',
    //   baseUrl: 'http://127.0.0.1:8000/api/'
    // },
    user: { id: 1, name: 'Peter', email: 'managingwholes.com@gmail.com' },
    // user: null,
    project: { id: 7, name: 'Missouri Basin' },
    observation: {
      // user: this.user,
      // project: this.project
      site: {
        id: null,
        sitename: ''
      },
      obsType: {
        id: null,
        name: ''
      },
      kv: {},
      inOutbox: false,
      entered: false
    },
    outbox: [1, 3, 5, 6, 7],
    inbox: [1, 2]
  },
  getters: {},
  mutations: {
    // setAuthUser(state, { authUser, isAuthenticated }) {
    //   Vue.set(state, 'authUser', authUser)
    //   Vue.set(state, 'isAuthenticated', isAuthenticated)
    // },
    // updateToken(state, newToken) {
    //   // TODO: For security purposes, take localStorage out of the project.
    //   localStorage.setItem('token', newToken)
    //   state.jwt = newToken
    // },
    // removeToken(state) {
    //   // TODO: For security purposes, take localStorage out of the project.
    //   localStorage.removeItem('token')
    //   state.jwt = null
    // }
  }, // the arg to this function involves object destructuring
  actions: {
    incrementPrice({ state, commit }, payload) {
      if (state.user) {
        commit('INCREMENT_PRICE', payload)
      }
    }
  }
})
