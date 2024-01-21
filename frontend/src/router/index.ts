// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    
    children: [
      {
        path: '/register',
        name: 'register',
        component: () => import('@/views/Register.vue'),
      },
      {
        path: '/login',
        name: 'login',
        component: () => import('@/views/Login.vue'),
      },
      {
        path: '/success',
        name: 'success',
        component: () => import('@/views/Success.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    next({ path: '/login' })
  } else if (localStorage.getItem('token') && to.path === '/login' || to.path === '/register') {
    next({ path: '/success' })
  } else {
    next()
  }
 })

export default router
