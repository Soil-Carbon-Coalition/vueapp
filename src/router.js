import Vue from 'vue'
import Router from 'vue-router'
// import NProgress from 'nprogress'

import Home from './views/Home.vue'
import SiteList from './views/SiteList.vue'
import SiteDetail from './views/SiteDetail.vue'
// import SiteEdit from './views/SiteEdit.vue'
import ObsMap from './views/ObsMap.vue'
import ObsDetail from './views/ObsDetail.vue'
import ProjectList from './views/ProjectList.vue'
import ProjectDetail from './views/ProjectDetail.vue'
import PostList from './views/PostList.vue'
import PostDetail from './views/PostDetail.vue'
import PostEdit from './views/PostEdit.vue'
import Outbox from './views/Outbox.vue'
import Inbox from './views/Inbox.vue'
import UserProfile from './views/UserProfile.vue'
import NotFound from './views/NotFound.vue'
import NetworkIssue from './views/NetworkIssue.vue'
import LayerMap from './views/LayerMap.vue'
import Locate from './views/Locate.vue'
import ObsTypeList from './views/ObsTypeList.vue'
import Photo from './obstypes/Photo.vue'
import Infiltration from './obstypes/Infiltration.vue'
import PastureMove from './obstypes/PastureMove.vue'
// EXPERIMENTAL
import Page from './exp/Page.vue'
import Test from './exp/Test.vue'
import store from './store/store.js'

// const requireAuthenticated = (to, from, next) => {
//   store.dispatch('auth/initialize').then(() => {
//     if (!store.getters['auth/isAuthenticated']) {
//       next('/login')
//     } else {
//       next()
//     }
//   })
// }

// const requireUnauthenticated = (to, from, next) => {
//   store.dispatch('auth/initialize').then(() => {
//     if (store.getters['auth/isAuthenticated']) {
//       next('/home')
//     } else {
//       next()
//     }
//   })
// }

// const redirectLogout = (to, from, next) => {
//   store.dispatch('auth/logout').then(() => next('/login'))
// }

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
      path: '/locate',
      name: 'locate',
      component: Locate
    },
    {
      path: '/observation-types/',
      name: 'obs-types',
      component: ObsTypeList
    },
    {
      path: '/sites/',
      name: 'site-list',
      component: SiteList
    },
    {
      path: '/sites/:id/',
      name: 'site-detail',
      component: SiteDetail,
      props: true
    },
    {
      path: '/projects/',
      name: 'project-list',
      component: ProjectList
    },
    {
      path: '/projects/:id/',
      name: 'project-detail',
      component: ProjectDetail,
      props: true
    },
    {
      path: '/posts/',
      name: 'post-list',
      component: PostList
    },
    {
      path: '/posts/:id/',
      name: 'post-detail',
      component: PostDetail,
      props: true
    },
    {
      path: '/posts/:id/edit/',
      name: 'post-edit',
      component: PostEdit,
      props: true
    },
    {
      path: '/observations/',
      name: 'obs-map',
      component: ObsMap
    },
    {
      path: '/observations/:id/',
      name: 'obs-detail',
      component: ObsDetail,
      props: true
    },
    {
      path: '/maps/:id/',
      name: 'layer-map',
      component: LayerMap,
      props: true
    },
    {
      path: '/page/',
      name: 'page',
      component: Page
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
      path: '/profile',
      name: 'profile',
      component: UserProfile,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/test',
      name: 'test',
      component: Test
    },
    // OBS TYPES
    {
      path: '/photo',
      name: 'photo',
      component: Photo
    },
    {
      path: '/infiltration',
      name: 'infiltration',
      component: Infiltration
    },
    {
      path: '/pasture-move',
      name: 'pasture-move',
      component: PastureMove
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

//add this meta to routes requiring auth:
// meta: {
//   requiresAuth: true
// }

//a basic route guard for auth
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.authUser) {
      next()
      return
    }
    next('accounts/login')
  } else {
    next()
  }
})
export default router
