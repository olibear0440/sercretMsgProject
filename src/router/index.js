import { createRouter, createWebHashHistory } from 'vue-router'
import registerPage from '../views/register-page.vue'
import mdpUpdate from '../views/mdp-update.vue'
import homePage from '../views/home-page.vue'

const routes = [
  {
    path: '/',
    name: 'RegisterPage',
    component: registerPage
  },
  {
    path: '/mdp-update',
    name: 'MdpUpdate',
    component: mdpUpdate
  },
  {
    path: '/home-page',
    name: 'HomePage',
    component: homePage
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
