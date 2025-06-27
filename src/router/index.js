import { createRouter, createWebHistory } from 'vue-router'
import Home           from '../views/Home.vue'
import About          from '../views/About.vue'
import DashboardLayout      from '../views/DashboardLayout.vue'
import DashboardNav from '../views/DashboardNav.vue'
import CreateInvoice from '../views/stock/CreateInvoice.vue'
import CreateProduct from '../views/product/CreateProduct.vue'

const routes = [
  { path: '/dashboard',                   component: DashboardLayout },
  { path: '/home',                        component: Home },
  { path: '/',                            component: Home },
  { path: '/about',                       component: About },
  { path: '/test',                        component: About }, //for testing vues
  { path: '/invoices/create',             component: CreateInvoice,       meta: {requiredPermission: {action: 'create', resource: 'stock'}} }, 
  { path: '/catalog/create',              component: CreateProduct,       meta: {requiredPermission: {action: 'create', resource: 'product'}} }, 
]

export default createRouter({
  history: createWebHistory(),
  routes
})
