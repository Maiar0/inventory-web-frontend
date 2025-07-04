import { createRouter, createWebHistory } from 'vue-router'
import Home           from '../views/Home.vue'
import About          from '../views/About.vue'
import DashboardLayout      from '../views/DashboardLayout.vue'
import DashboardNav from '../views/DashboardNav.vue'
import CreateInvoice from '../views/stock/CreateInvoice.vue'
import CreateProduct from '../views/product/CreateProduct.vue'
import Catalog from '../views/product/Catalog.vue'
import Cart from '../views/orders/Cart.vue'

const routes = [
  { path: '/dashboard',                   component: DashboardLayout },
  { path: '/home',                        component: Home },
  { path: '/',                            component: Home },
  { path: '/about',                       component: About },
  { path: '/test',                        component: About }, //for testing vues
  { path: '/invoices/create',             component: CreateInvoice,       meta: {requiredPermission: {action: 'create', resource: 'stock'}} }, 
  { path: '/catalog/create',              component: CreateProduct,       meta: {requiredPermission: {action: 'create', resource: 'product'}} }, 
  { path: '/catalog',                     component: Catalog,       meta: {requiredPermission: {action: 'view', resource: 'product'}} }, 
  { path: '/cart',                        component: Cart,       meta: {requiredPermission: {action: 'create', resource: 'order'}} }, 
]

export default createRouter({
  history: createWebHistory(),
  routes
})
