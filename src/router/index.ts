// src/renderer/router/index.ts
import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../components/HomeView.vue'

const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeView
  }
  // 更多路由
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
