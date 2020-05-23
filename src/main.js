import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
import {
  BootstrapVue,
  IconsPlugin,
  BIconHouse,
  BIconDownload,
  BIconUpload
} from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.component('BIconHouse', BIconHouse) //the house icon
Vue.component('BIconDownload', BIconDownload) //the house icon
Vue.component('BIconUpload', BIconUpload) //the house icon

// SLIM THESE DOWN DEPENDING ON USE!
import { LayoutPlugin, FormPlugin } from 'bootstrap-vue'
Vue.use(LayoutPlugin, FormPlugin)

// This imports <b-modal> as well as the v-b-modal directive as a plugin:
// This imports <b-card> along with all the <b-card-*> sub-components as a plugin:
import { CardPlugin, ModalPlugin } from 'bootstrap-vue'
Vue.use(CardPlugin, ModalPlugin)

Vue.config.productionTip = false

// the following does automatic global registration of components whose name begins with 'base'
const requireComponent = require.context(
  './components',
  false,
  /Base[A-Z]\w+\.(vue|js)$/
)

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)

  const componentName = upperFirst(
    camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, '$1'))
  )

  Vue.component(componentName, componentConfig.default || componentConfig)
})
// this is to correct an issue where default icons are not shown
// eslint-disable-next-line
delete L.Icon.Default.prototype._getIconUrl
// eslint-disable-next-line
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
