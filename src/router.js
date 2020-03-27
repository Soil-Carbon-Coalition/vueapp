import Vue from 'vue'
import Router from 'vue-router'
import SiteList from './views/SiteList.vue'
import SiteDetail from './views/SiteDetail.vue'
import ObsList from './views/ObsList.vue'
import ObsDetail from './views/ObsDetail.vue'
import ObsCreate from './views/ObsCreate.vue'
// import SiteCreate from '../views/SiteCreate.vue'
// import LeafletMap from '../components/LeafletMap.vue'
// import SiteCard from '../components/SiteCard.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
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
    }

    // {
    //   path: 'site/create',
    //   name: 'site-create',
    //   component: SiteCreate
    // }
  ]
})

// router.beforeResolve((to, from, next) => {
//   // If this isn't an initial page load.
//   if (to.name) {
//     // Start the route progress bar.
//     NProgress.start()
//   }
//   next()
// })

// router.afterEach((to, from) => {
//   // Complete the animation of the route progress bar.
//   NProgress.done()
// })

export default router
