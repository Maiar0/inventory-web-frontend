import { createRouter, createWebHistory } from 'vue-router'
import Home           from '../views/Home.vue'
import About          from '../views/About.vue'
import DashboardLayout      from '../views/DashboardLayout.vue'
import DashboardNav      from '../views/DashboardNav.vue'
import CreateInvoice from '../views/inventory/CreateInvoice.vue'

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
  { path: '/test',             component: CreateInvoice }, //for testing vues
]

export default createRouter({
  history: createWebHistory(),
  routes
})
