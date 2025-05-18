// src/renderer/router/index.ts
import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../components/HomeView.vue'
import ForecastView from '../components/ForecastView.vue'
import AlgorithmMarketView from '../components/AlgorithmMarketView.vue'

const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/algorithm-market',
    name: 'algorithm-market',
    component: AlgorithmMarketView
  },
  {
    path: '/forecast',
    name: 'forecast',
    component: ForecastView
  }
  // 更多路由
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
