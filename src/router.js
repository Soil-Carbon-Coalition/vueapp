import Vue from 'vue'
import Router from 'vue-router'
// import NProgress from 'nprogress'

import Home from './views/Home.vue'
import SiteList from './views/SiteList.vue'
import SiteDetail from './views/SiteDetail.vue'
import SiteEdit from './views/SiteEdit.vue'
import ObsList from './views/ObsList.vue'
import ObsDetail from './views/ObsDetail.vue'
import ObsEdit from './views/ObsEdit.vue'
import ProjectList from './views/ProjectList.vue'
import ProjectDetail from './views/ProjectDetail.vue'
import ProjectEdit from './views/ProjectEdit.vue'
import Search from './views/Search.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import Outbox from './views/Outbox.vue'
import Inbox from './views/Inbox.vue'
import UserProfile from './views/UserProfile.vue'
import NotFound from './views/NotFound.vue'
import NetworkIssue from './views/NetworkIssue.vue'
import BaseLmap from './components/BaseLmap.vue'
// EXPERIMENTAL
import Page from './exp/Page.vue'
import Test from './exp/Test.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history', // this will enable back button functionality
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
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
      path: '/sites/new',
      name: 'site-edit',
      component: SiteEdit,
      props: true
    },
    {
      path: '/projects/',
      name: 'project-list',
      component: ProjectList
    },
    {
      path: '/projects/:id',
      name: 'project-detail',
      component: ProjectDetail,
      props: true
    },
    {
      path: '/projects/new',
      name: 'project-edit',
      component: ProjectEdit,
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
      path: '/observations/new',
      name: 'obs-edit',
      component: ObsEdit,
      props: true
    },

    {
      path: '/page/',
      name: 'page',
      component: Page
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/outbox',
      name: 'outbox',
      component: Outbox
    },
    {
      path: '/inbox',
      name: 'inbox',
      component: Inbox
    },
    {
      path: '/Lmap',
      name: 'lmap',
      component: BaseLmap
    },
    {
      path: '/profile',
      name: 'profile',
      component: UserProfile
    },
    {
      path: '/test',
      name: 'test',
      component: Test
    },
    {
      path: '/404',
      name: '404',
      component: NotFound,
      props: true
    },
    {
      path: '/network-issue',
      name: 'network-issue',
      component: NetworkIssue
    },
    {
      path: '*',
      redirect: { name: '404', params: { resource: 'page' } }
    }
  ]
})

// // runs before navigating to component; must call next()
// router.beforeEach((routeTo, routeFrom, next) => {
  // If this isn't an initial page load.
  // if (routeTo.name) {
    // Start the route progress bar.
    // NProgress.start()
  // }
  // next()
// })
// // runs right before component is created
// router.afterEach(() => {
  // Complete the animation of the route progress bar.
  // NProgress.done()
// })

export default router
