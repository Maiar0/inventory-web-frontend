import { createRouter, createWebHistory } from 'vue-router'
import Home           from '../views/Home.vue'
import About          from '../views/About.vue'
import Dashboard      from '../views/Dashboard.vue'
import DashboardLayout      from '../views/DashboardLayout.vue'
import DashboardNav      from '../views/DashboardNav.vue'

const routes = [
  {
  path: '/dashboard',
  component: DashboardLayout,
  children: [
    {
      path: '', // catch everything nested
      component: DashboardNav
    },
    {
      path: ':catchAll(.*)', // catch everything nested
      component: DashboardNav
    },
    {
      path: 'inventory/catalog/create',
      component: About // placeholder so we dont get error
    }
  ]
  },
  { path: '/home',              component: Home },
  { path: '/about',             component: About },
  //{ path: '/dashboard',         component: Dashboard }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
