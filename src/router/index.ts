import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/tickets',
      children: [
        {
          path: '',
          name: 'tickets',
          component: () => import('@/views/TicketsView.vue')
        },
        {
          path: ':id',
          name: 'ticket',
          component: () => import('@/views/TicketView.vue')
        }
      ]
    },
    {
      path: '/:catchAll(.*)',
      redirect: '/'
    }
  ]
})

export default router
