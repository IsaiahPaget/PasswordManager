import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/account/login',
      name: 'login',
      component: () => import('../views/Accounts/LoginView.vue')
    },
    {
      path: '/account/register',
      name: 'register',
      component: () => import('../views/Accounts/RegisterView.vue')
    },
  ]
})

export default router
