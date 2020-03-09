import Vue from 'vue'
import VueRouter from 'vue-router'
import MapList from '../views/MapList.vue'
import MapShow from '../views/MapShow.vue'
import EventCreate from '../views/EventCreate.vue'
import LeafletMap from '../components/LeafletMap.vue'
// import EventCard from '../components/EventCard.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'map-list',
    component: MapList
  },
  {
    path: '/map',
    name: 'map',
    component: LeafletMap
  },
  {
    path: '/event/create',
    name: 'event-create',
    component: EventCreate
  },
  {
    path: '/map/:id',
    name: 'map-show',
    component: MapShow,
    props: true
  }
  // {
  //   path: "/about",
  //   name: "about",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue")
  // }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
