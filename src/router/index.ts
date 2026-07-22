import { createRouter, createWebHistory } from 'vue-router'

import MainLayout from '@/layouts/MainLayout.vue'

import LoginView from '@/views/login/login.vue'
import MonitorView from '@/views/monitor/index.vue'
import DataView from '@/views/data/index.vue' 

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/',
      component: MainLayout,
      redirect: '/monitor',
      children: [
        {
          path: 'monitor',
          component: MonitorView,
          meta: {
            title: 'Monitor'
          }
        },
        {
          path: 'data',
          component: DataView,
          meta: {
            title: 'Data Center'
          }
        }
      ]
    },
  ],
})

export default router
