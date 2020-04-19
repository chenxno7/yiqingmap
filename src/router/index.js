import Vue from 'vue'
import VueRouter from 'vue-router'
import China from '../views/China.vue'
import Nationdetail from '@/components/Nationdetail'
import List from '@/components/List.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'china',
    component: China
  },
  {
    path: '/list',
    name: 'List',
    component: List
  },
  {
    path: '/detail',
    component: Nationdetail
  },
  {
    path: '/world',
    name: 'World',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/World.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
