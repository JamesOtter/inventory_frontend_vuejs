import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/products',
      name: 'Products',
      component: () => import('../components/Product.vue')
    },
    {
      path: '/',
      name: 'Products',
      component: () => import('../components/Product.vue')
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('../components/auth/Register.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../components/auth/Login.vue')
    }
  ],
})

export default router
