<template>
    <NavGrid :items="navItems" @select="goDeeper" />
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import NavApi from '../api/NavApi';
import NavGrid from '../components/NavGrid.vue';

const navItems = ref([
    {
        name: 'Product Catalog',
        description: 'View and manage items currently in stock',
        route: '/catalog'
    },
    {
        name: 'Product Create',
        description: 'View and manage items currently in stock',
        route: '/catalog/create'
    },
    {
        name: 'Product Lookup',
        description: 'View created products',
        route: '/productlookup'
    },
    {
        name: 'Cart',
        description: 'Cart of items to purchase',
        route: '/cart'
    },
    {
        name: 'Order',
        description: 'Purchase your cart items',
        route: '/order'
    },
    {
        name: 'Create Invoice',
        description: 'Generate a new invoice for outgoing products',
        route: '/invoices/create'
    },
    {
        name: 'Reports',
        description: 'Analyze inventory trends and system activity',
        route: 'reports'
    },
    {
        name: 'User Management',
        description: 'Manage application users and access control',
        route: 'admin/users'
    },
    {
        name: 'Asset Lookup',
        description: 'View assets in the system',
        route: '/assetlookup'
    },
    {
        name: 'Import Asset',
        description: 'Create a new asset.',
        route: '/importasset'
    }
]);
const route = useRoute();
const router = useRouter();
onMounted(() => {
    console.log('navItems:', navItems.value);
});
function goDeeper(newPath) {
    console.log(newPath)
    router.push(newPath);
}
</script>
