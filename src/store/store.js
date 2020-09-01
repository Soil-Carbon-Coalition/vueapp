import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

import * as notification from '@/store/modules/notification.js'
// import SHService from '@/services/SHService.js'

// COULD USE STORE DIRECTORY, MODULES DIRECTORY, SEPARATE FILES WITHIN TO MODULARIZE THE STORE
Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production' //DON'T USE STRICT MODE IN PRODUCTION
export default new Vuex.Store({
  modules: {
    notification
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
  state: {
    // USER
    authUser: {
      id: 1,
      email: 'managingwholes.com@gmail.com',
      full_name: 'Peter Donovan',
      user_location: 'northeast Oregon',
      default_project: 11,
      user_projects: [
        {
          id: 14,
          user: 1,
          user_name: 'Peter Donovan',
          user_status: 'OB',
          project: 20,
          project_name: 'Junkproject 7'
        },
        {
          id: 4,
          user: 1,
          user_name: 'Peter Donovan',
          user_status: 'OB',
          project: 7,
          project_name: 'Missouri basin'
        },
        {
          id: 2,
          user: 1,
          user_name: 'Peter Donovan',
          user_status: 'CO',
          project: 11,
          project_name: 'SoilCarbonChallenge'
        }
      ]
    },
    isAuthenticated: true,
    // CURRENT PROJECT
    project: { id: 3, name: 'RMG-Montana' },

    site: {},
    observation: {
      obsType: {
        id: null,
        name: ''
      },
      kv: {},
      inOutbox: false,
      entered: false
    },
    outbox: [1, 3, 5],
    inbox: [1, 2]
  },
  getters: {
    authUser: state => {
      return state.authUser
    },
    currentProject: state => {
      return state.project
    },
    currentSite: state => {
      return state.site
    },
    currentObservation: state => {
      return state.observation
    }
  },
  mutations: {
    SET_AUTH_USER(state, { authUser, isAuthenticated }) {
      Vue.set(state, 'authUser', authUser)
      Vue.set(state, 'isAuthenticated', isAuthenticated)
    },
    SET_PROJECT(state, project) {
      Vue.set(state, 'project', project)
    },
    SET_DEFAULT_PROJECT(state, project) {
      Vue.set(state, 'project', project)
    },
    SET_SITE(state, site) {
      Vue.set(state, 'site', site)
    },
    SET_OBSERVATION(state, observation) {
      Vue.set(state, 'observation', observation)
    },
    LOGOUT(state) {
      Vue.set(state, 'authUser', null)
      Vue.set(state, 'project', null)
    }
  },
  actions: {
    setAuthUser({ commit }, user) {
      commit('SET_AUTH_USER', user)
    },
    setProject({ commit }, project) {
      commit('SET_PROJECT', project)
    },
    setSite({ commit }, site) {
      commit('SET_SITE', site)
    },
    setObservation({ commit }, obj) {
      commit('SET_OBSERVATION ', obj)
    },
    logout({ commit }) {
      return new Promise(resolve => {
        commit('LOGOUT')
        // MAY NEED THIS
        // delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    }
  }
})
