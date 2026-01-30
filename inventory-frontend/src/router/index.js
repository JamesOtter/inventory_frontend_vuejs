import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Products',
      component: () => import('../components/product/Product.vue')
    },
    {
      path: '/product/create',
      name: 'CreateProduct',
      component: () => import('../components/product/CreateProduct.vue')
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
    },
    {
      path: '/auditlog',
      name: 'AuditLog',
      component: () => import('../components/audit/AuditLog.vue')
    }
  ],
})

export default router
