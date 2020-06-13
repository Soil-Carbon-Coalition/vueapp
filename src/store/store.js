import Vue from 'vue'
import Vuex from 'vuex'
import * as notification from '@/store/modules/notification.js'
// import SHService from '@/services/SHService.js'

// COULD USE STORE DIRECTORY, MODULES DIRECTORY, SEPARATE FILES WITHIN TO MODULARIZE THE STORE
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    notification
  },
  state: {
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
    inbox: [1, 2],
    products: [
      { id: 1, name: 'Banana', price: 20 },
      { id: 2, name: 'Apple', price: 10 },
      { id: 3, name: 'Boojum', price: 'unknown' },
      { id: 4, name: 'Coffee', price: 35 },
      { id: 5, name: 'Tobacco', price: 4 },
      { id: 6, name: 'Cigar', price: 14 }
    ]
  },
  getters: {
    saleProducts: state => {
      var saleProducts = state.products.map(product => {
        return {
          name: '**' + product.name + '**',
          price: (product.price * 0.67).toFixed(2)
        }
      })
      return saleProducts
    },
    cheapProducts: state => {
      var cheapProducts = state.products.filter(product => {
        return product.price < 10
      })

      return cheapProducts
    },
    getProductById: state => id => {
      return state.products.find(product => product.id === id)
    }
  },
  mutations: {
    INCREMENT_PRICE: (state, payload) => {
      state.products.forEach(product => {
        product.price += payload
      })
    }
  },
  // the arg to this function involves object destructuring
  actions: {
    incrementPrice({ state, commit }, payload) {
      if (state.user) {
        commit('INCREMENT_PRICE', payload)
      }
    }
  }
})
