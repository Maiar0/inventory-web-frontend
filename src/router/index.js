import { createRouter, createWebHistory } from 'vue-router'
import Home           from '../views/Home.vue'
import About          from '../views/About.vue'
import Dashboard      from '../views/Dashboard.vue'

const routes = [
  { path: '/',                  component: Home  },
  { path: '/about',             component: About },
  { path: '/dashboard',         component: Dashboard }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
