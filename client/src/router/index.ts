import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginDetail from '@/views/LoginDetail.vue'
import NewLogin from '@/views/NewLogin.vue'
import EditLogin from '@/views/EditLogin.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/:id',
      name: 'loginDetails',
      component: LoginDetail
    },
    {
      path: '/new',
      name: 'newLogin',
      component: NewLogin
    },
    {
      path: '/edit/:id',
      name: 'editLogin',
      component: EditLogin
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
