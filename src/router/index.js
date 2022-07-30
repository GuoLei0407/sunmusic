import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/discovery'
  },
  {
    path: '/discovery',
    component: () => import('../views/musicDiscovery.vue')
  },
  {
    path: '/playlist',
    component: () => import('../views/musicPlayList.vue')
  },
  {
    path: '/listDetail',
    component: () => import('../views/musicListDetail.vue')
  },
  {
    path: '/songs',
    component: () => import('../views/musicSongs/musicSongs.vue')
  },
  {
    path: '/search',
    component: () => import('../views/musicSearch.vue')
  },
  {
    path: '/mvsList',
    component: () => import('../views/musicMvsList.vue')
  },
  {
    path: '/mv',
    component: () => import('../views/musicMv.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
