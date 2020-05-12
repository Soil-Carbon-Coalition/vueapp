import Vue from 'vue'
import Router from 'vue-router'
// import NProgress from 'nprogress'

import SiteList from './views/SiteList.vue'
import SiteDetail from './views/SiteDetail.vue'
import ObsList from './views/ObsList.vue'
import ObsDetail from './views/ObsDetail.vue'
import ObsCreate from './views/ObsCreate.vue'
import Login from './views/Login.vue'
import Outbox from './views/Outbox.vue'
import Test from './views/Test.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history', // this will enable back button functionality
  routes: [
    {
      path: '/sites/',
      name: 'site-list',
      component: SiteList
    },
    {
      path: '/sites/:id',
      name: 'site-detail',
      component: SiteDetail,
      props: true
    },
    {
      path: '/observations/',
      name: 'obs-list',
      component: ObsList
    },
    {
      path: '/observations/:id',
      name: 'obs-detail',
      component: ObsDetail,
      props: true
    },
    {
      path: '/observations/create',
      name: 'obs-create',
      component: ObsCreate
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/observations/outbox',
      name: 'outbox',
      component: Outbox
    },
    {
      path: '/test',
      name: 'test',
      component: Test
    }
  ]
})

// // runs before navigating to component; must call next()
// router.beforeEach((routeTo, routeFrom, next) => {
//   // If this isn't an initial page load.
//   if (routeTo.name) {
//     // Start the route progress bar.
//     NProgress.start()
//   }
//   next()
// })
// // runs right before component is created
// router.afterEach((routeTo, routeFrom) => {
//   // Complete the animation of the route progress bar.
//   NProgress.done()
// })

export default router
